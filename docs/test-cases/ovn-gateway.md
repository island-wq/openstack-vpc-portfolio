---
title: 3. OVN-Gateway 가이드
description: OVN Gateway Chassis 식별·우선순위·Router·NAT 추적 가이드
---

# 3. OVN-Gateway 가이드

## 목적

- OVN Gateway 역할을 수행하는 Chassis 식별
- Logical Router Port별 Gateway 우선순위 확인
- OpenStack Router와 OVN Northbound DB Object 간 연결관계 추적
- SNAT·DNAT 동작 Router와 Gateway Chassis 확인

## Gateway Node 식별

- OVN Southbound DB의 Chassis·Encapsulation·Port Binding 정보 확인
- `cr-lrp-*` Port Binding 보유 Chassis의 Gateway 역할 확인
- Chassis UUID·Hostname·Geneve Tunnel IP 간 연결관계 확인

```bash title="Gateway Chassis 및 Port Binding 확인"
ovn-sbctl show
```

```text title="출력 확인 항목"
Chassis "<chassis-uuid>"
    hostname: <gateway-hostname>
    Encap geneve
        ip: "<tunnel-ip>"
    Port_Binding cr-lrp-<logical-router-port-uuid>
```

- `Chassis`의 OVN 내부 식별자 확인
- `hostname`의 실제 Gateway Node 확인
- `Encap geneve`의 Tunnel Endpoint 확인
- `cr-lrp-*`의 Gateway Router Port Binding 확인

## Gateway Chassis 우선순위

- External Network별 전체 Gateway Chassis 등록 적용
- Logical Router Port별 Chassis Priority 개별 적용
- 높은 Priority Chassis의 Active Gateway 선출 적용
- Active Chassis 장애 시 차순위 Chassis 전환 적용
- Network별 Priority 순서의 상이 가능

```bash title="Gateway Chassis 우선순위 확인"
ovn-nbctl list Gateway_Chassis
```

```text title="출력 확인 항목"
_uuid        : <gateway-chassis-record-uuid>
chassis_name : "<chassis-uuid>"
name         : lrp-<port-uuid>_<chassis-uuid>
priority     : 3
```

- 동일 `lrp-*` 기준 Chassis별 Priority 비교 필요
- Priority 값이 가장 높은 Chassis의 우선 사용 적용
- Gateway 분산 상태 확인 시 Network 단위 비교 필요

## DVR 적용 확인

- Compute Node의 `ovn-controller`·`ovn-metadata-agent` 구동 여부 확인
- ML2/OVN 환경의 Distributed Floating IP 설정 확인
- Legacy OVS DVR 환경의 Compute Node `L3 Agent` 존재 여부 확인

```yaml title="OpenStack-Ansible DVR 설정 예시"
neutron_neutron_conf_overrides:
  DEFAULT:
    router_distributed: true
    enable_dvr: true
    global_physnet_mtu: 9000

neutron_ml2_conf_ini_overrides:
  ml2:
    physical_network_mtus: "provider:1500,nas:9000"
    path_mtu: 1500
  ovn:
    enable_distributed_floating_ip: true
```

- `router_distributed`와 `enable_dvr` 활성화 적용
- OVN Distributed Floating IP 활성화 적용
- Physical Network별 MTU와 Tunnel `path_mtu` 정합성 확인 필요

## VXLAN·Geneve Packet 구조

![VXLAN과 Geneve Packet Header 및 MTU 비교](/img/test-cases/ovn-gateway/vxlan-geneve-packet-structure.png)

*VXLAN·Geneve Encapsulation Header와 MTU 비교*

![VXLAN 고정 Header와 Geneve 가변 Header 비교](/img/test-cases/ovn-gateway/vxlan-geneve-header-comparison.png)

*VXLAN 고정 구조와 Geneve 가변 Option 구조 비교*

- VXLAN 기본 Header 8 Bytes 적용
- Geneve 기본 Header와 Option 영역을 포함한 가변 구조 적용
- Outer MTU 1,500 Bytes 기준 Inner MTU 감소 발생
- Geneve Option 사용량을 고려한 MTU 설계 필요
- Overlay 구간 Fragmentation 방지를 위한 End-to-End MTU 정합성 필요

## OpenStack Router 추적

### 1. OpenStack Router UUID 확인

```bash
openstack router list
```

- 대상 Router의 OpenStack UUID·상태·Project 확인

### 2. OVN Logical Router 연결

```bash
ovn-nbctl lr-list
```

```text title="UUID 연결 형식"
<ovn-logical-router-uuid> (neutron-<openstack-router-uuid>)
```

- `neutron-<router-uuid>` 이름 기반 OpenStack·OVN Object 연결

### 3. Logical Router Port 확인

```bash title="Logical Router Port 목록"
ovn-nbctl lrp-list <ovn-logical-router-uuid>
```

```text title="출력 형식"
<port-record-uuid> (lrp-<neutron-port-uuid>)
```

- Internal Network Port와 External Gateway Port 식별
- `lrp-*` 기준 Gateway Chassis Record 연결 가능

### 4. 전체 Topology 확인

```bash
ovn-nbctl show
```

- `switch`의 OpenStack Network 연결정보 확인
- `router`의 OpenStack Router 연결정보 확인
- `port`·`router-port`·`gateway chassis` 관계 확인
- `nat`의 SNAT·DNAT_AND_SNAT 정책 확인
- 실시간 변경 추적 시 `ovn-nbctl --monitor show` 적용

## NAT 동작 확인

```bash title="전체 NAT Record 조회"
ovn-nbctl find NAT
```

```text title="주요 출력 항목"
external_ip : "<floating-or-snat-ip>"
logical_ip  : "<tenant-cidr-or-fixed-ip>"
logical_port: "<neutron-port-uuid>"
type        : snat | dnat_and_snat
```

- Tenant CIDR의 외부 통신용 `snat` Record 확인
- Floating IP 연결용 `dnat_and_snat` Record 확인
- `external_ids`의 Neutron Router·Floating IP·Port 연결정보 확인
- NAT Record와 Logical Router 간 직접 연결 확인 필요

```bash title="Router별 NAT Record 확인"
ovn-nbctl lr-nat-list <ovn-logical-router-uuid>
```

## 점검 절차

1. `openstack router list` 기반 대상 Router UUID 확인
2. `ovn-nbctl lr-list` 기반 OVN Logical Router UUID 확인
3. `ovn-nbctl lrp-list` 기반 Logical Router Port 확인
4. `ovn-nbctl show` 기반 External Gateway와 NAT 정책 확인
5. `ovn-nbctl list Gateway_Chassis` 기반 Gateway Priority 확인
6. `ovn-sbctl show` 기반 Active Chassis의 `cr-lrp-*` Binding 확인
7. Gateway 장애 전·후 Chassis Binding과 통신 연속성 비교 필요

## 확인 결과

- Southbound DB의 `cr-lrp-*` Binding 기반 Active Gateway 식별 가능
- Logical Router Port별 복수 Gateway Chassis 등록 적용
- Chassis Priority 기반 Active·Standby 선출 적용
- OpenStack Router UUID와 OVN Logical Router의 연결관계 확인 가능
- NAT Record 기반 SNAT·Floating IP 동작 경로 추적 가능
- DVR·Distributed Floating IP 적용 여부의 설정 확인 필요
- Network별 Gateway Priority와 장애 전환 결과의 정기 검증 필요
- Overlay Header 증가를 고려한 MTU 설계 필요

