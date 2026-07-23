---
title: 1. OVN 기반 L4 Octavia
description: OVN Provider 기반 Octavia L4 Load Balancer 설치 및 기능 검증
---

# 1. OVN 기반 L4 Octavia

## 목적

- Amphora VM 없이 OVN Provider 기반 L4 Load Balancer 구성
- Octavia API와 OVN Northbound DB 연동 확인
- TCP·UDP Listener, Pool, Member, Health Monitor 기능 검증
- OpenStack-Ansible 환경의 OVN 전용 배포 조건 정립

## 구성 방식

- `ovn-octavia-provider` 기반 Octavia·OVN 연동 적용
- Load Balancer 정책의 OVN Northbound DB 반영
- Compute·Network Node의 OVS Flow 기반 분산 처리 적용
- 전용 Amphora VM과 관리 Network 부재
- Load Balancer별 추가 CPU·Memory 자원 소비 최소화

## 설치 검증

- Octavia 기본 Provider의 OVN 고정 적용
- OVN Provider Agent 활성화 적용
- Amphora Image Upload 및 관련 Resource Setup 비활성화 적용
- Amphora 전용 관리 Network·Security Group·iptables Rule 생성 차단 적용
- 불필요한 Health Manager Peer 계산과 관리 Network 조회 우회 적용
- Octavia API·Provider Agent 구동 확인

## 배포 설정 및 해결 내역

### 1. 설정 파일 변경

- 설정 파일 위치 `/etc/openstack_deploy/user_variables.yml`
- 사설 인증서 사용을 위한 SSL 인증 검증 우회 적용
- Amphora 전용 Network·Security Group·iptables Rule 생성 방지 적용
- OVN 모드에서 불필요한 Health Manager 계산 로직 우회 적용
- 설정 Template 렌더링을 위한 Dummy Network UUID 적용

```yaml title="/etc/openstack_deploy/user_variables.yml"
# [1] SSL 인증서 검증 무시
keystone_service_adminuri_insecure: true
openstack_service_adminuri_insecure: true

# [2] OVN 모드용 리소스 생성 방지
octavia_networks: []
octavia_security_groups: []
octavia_host_client_iptables_rules: []

# [3] Health Manager 로직 우회
octavia_health_manager_bind_ip: "{{ ansible_host }}"
octavia_health_manager_peers: []
octavia_health_manager_heartbeat_key: "insecure_key_for_ovn_mode"

# [4] 설정 파일 생성을 위한 Dummy Network UUID
octavia_neutron_management_network_uuid: "00000000-0000-0000-0000-000000000000"
```

### 2. Ansible Role 소스 코드 수정

- 변수 재정의만으로 차단되지 않는 Amphora 기본 Task의 강제 비활성화 적용
- OVN Provider 전용 배포와 Amphora Resource 생성 절차의 분리 필요

#### 2.1. Network Resource 생성 차단

- 수정 파일 `/etc/ansible/roles/os_octavia/tasks/octavia_resources.yml`
- `openstack_resources` Role 호출 Task에 `when: false` 적용

```yaml title="/etc/ansible/roles/os_octavia/tasks/octavia_resources.yml"
- name: Add network resources
  when: false
  include_role:
    name: openstack.osa.openstack_resources
  vars:
    # 기존 변수 설정 유지
```

#### 2.2. iptables 및 Network UUID 조회 차단

- 수정 파일 `/etc/ansible/roles/os_octavia/tasks/octavia_post_install.yml`
- Amphora Health Manager용 iptables Rule 적용 Task 비활성화
- 생성하지 않은 Octavia Management Network의 UUID 조회 Task 비활성화

```yaml title="/etc/ansible/roles/os_octavia/tasks/octavia_post_install.yml"
- name: IPtables rules
  when: false
  include_role:
    name: systemd_service
    tasks_from: iptables

- name: Set Octavia management network UUID fact
  when: false
  set_fact:
    octavia_management_net_uuid: "00000000-0000-0000-0000-000000000000"
```

#### 2.3. Health Manager Template 로직 단순화

- 수정 파일 `/etc/ansible/roles/os_octavia/templates/octavia.conf.j2`
- Network 조회 Loop 제거
- OVN 모드에서 사용하지 않는 Health Manager 값의 고정 적용

```ini title="/etc/ansible/roles/os_octavia/templates/octavia.conf.j2"
[health_manager]
bind_ip = 127.0.0.1
bind_port = 5555
heartbeat_key = insecure_key_for_ovn_mode
controller_ip_port_list = 127.0.0.1:5555
```

### 3. 배포 노드 환경 구성

- 배포 노드의 OpenStack-Ansible Utility Python 경로 부재 해결
- `openstacksdk` 설치를 통한 OpenStack Resource Module 실행환경 구성
- Keystone Service 등록을 위한 관리자 접속 설정 적용

```bash title="Utility Python 경로 구성"
mkdir -p /openstack/venvs/utility-29.2.0/bin/
ln -sf /usr/bin/python3 /openstack/venvs/utility-29.2.0/bin/python
```

```bash title="필수 Python Package 설치"
apt-get install -y python3-pip
pip3 install openstacksdk
```

- 관리자 접속정보 파일 `/etc/openstack/clouds.yaml` 생성
- 공개 문서의 인증정보·비밀번호 제외 적용

## 기능 검증

### Load Balancer·Listener

- Load Balancer 생성 및 VIP 할당 확인
- TCP Listener 생성 확인
- UDP Listener 생성 확인
- HTTP·HTTPS·TLS 기반 L7 기능 미지원

![Load Balancer Network 및 Subnet 선택 화면](/img/test-cases/ovn-octavia/load-balancer.png)

*Load Balancer Network 및 Subnet 선택 화면*

![Listener 상세 설정 화면](/img/test-cases/ovn-octavia/listener.png)

*Listener 상세 설정 화면*

![Listener Protocol 선택 화면](/img/test-cases/ovn-octavia/listener-protocols.png)

*UI 선택 항목과 OVN Provider 실제 지원 범위의 차이 확인*

### Pool·Member

- Pool 생성 및 Listener 연결 확인
- 동작 중인 Instance의 Pool Member 등록 확인
- OVN Provider의 `SOURCE_IP_PORT` 알고리즘 적용
- `ROUND_ROBIN`·`LEAST_CONNECTIONS` 알고리즘 미지원

![Pool Algorithm 선택 화면](/img/test-cases/ovn-octavia/pool-algorithms.png)

*UI 기본 Algorithm과 OVN Provider 지원 Algorithm의 차이 확인*

![SOURCE_IP_PORT Pool 생성 결과](/img/test-cases/ovn-octavia/pool-result.png)

*`SOURCE_IP_PORT` 적용 후 Pool 생성 결과*

![Pool Member 등록 화면](/img/test-cases/ovn-octavia/pool-members.png)

*동작 중인 Instance의 Pool Member 등록 화면*

### Health Monitor

- Pool Member 상태 확인을 위한 Health Monitor 생성 확인
- TCP 기반 상태 확인 적용
- HTTP·HTTPS 기반 세부 상태 확인 제약

![Health Monitor 설정 화면](/img/test-cases/ovn-octavia/health-monitor.png)

*Health Monitor 설정 화면*

![Health Monitor 적용 결과](/img/test-cases/ovn-octavia/health-monitor-result.png)

*Health Monitor 적용 결과*

## Amphora 대비 특성

| 항목 | Amphora Provider | OVN Provider |
|---|---|---|
| 처리 구조 | 전용 Load Balancer VM | OVN·OVS 분산 처리 |
| 생성 시간 | VM 부팅 시간 필요 | 정책 즉시 반영 |
| 추가 자원 | VM별 CPU·Memory 필요 | 전용 VM 자원 부재 |
| 지원 범위 | L4·L7 | L4 중심 |
| 알고리즘 | 다중 알고리즘 지원 | `SOURCE_IP_PORT` 중심 |

## 확인 결과

- OVN Provider 기반 L4 Load Balancer 생성 및 동작 확인
- TCP·UDP Listener와 Pool Member 연결 확인
- Amphora VM 없는 분산형 처리 구조 적용
- Load Balancer 생성 대기시간과 전용 자원 사용 감소
- L7 기능과 다중 Pool 알고리즘 부재
- 운영 적용 전 지원 Protocol·알고리즘·Health Monitor 범위 확인 필요
- 배포 자동화의 Amphora 의존 Task 분리 및 Role 개선 필요
