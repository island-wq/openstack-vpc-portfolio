---
title: 2. PowerStore LUN 관리 가이드
description: OpenStack Cinder와 Dell PowerStore 연동 환경의 LUN 번호 관리 및 운영 기준
---

# 2. PowerStore LUN 관리 가이드

## 목적

- OpenStack Cinder·PowerStore 연동 환경의 LUN 번호 증가 원인 확인
- Cinder·Storage Driver·Linux Host의 LUN 제어 범위 구분
- LUN 255 초과 환경의 운영 설정과 검증 절차 정립

## LUN 번호 증가 원인

- PowerStore의 Volume Mapping 시 LUN ID 자동 할당 적용
- 삭제된 LUN ID의 즉시 재사용 보장 부재
- Linux Host의 지정 범위 기반 SCSI LUN 탐색 적용
- Multipath의 다중 경로 기반 동일 LUN 인식 적용
- 실제 Block Device 수와 LUN 번호 간 일치 관계 부재

## 구성요소별 제어 범위

| 구성요소 | 역할 | LUN 번호 제한 |
|---|---|---|
| Cinder | Volume 생명주기와 Storage Driver 호출 | 직접 설정 부재 |
| PowerStore | Volume Mapping과 LUN ID 할당 | Storage API·Driver 기반 제어 필요 |
| Multipath | 다중 경로 통합과 장애 경로 전환 | 번호 상한 제어 기능 부재 |
| Linux SCSI | Host의 LUN 탐색 범위 결정 | `scsi_mod.max_luns` 적용 |

## PowerStore Driver 제어

- Cinder 설정 파일의 LUN 번호 제한 Option 부재
- PowerStore Driver의 Mapping 단계에서 미사용 LUN ID 조회 필요
- `0~254` 범위의 가용 LUN ID 우선 할당 로직 적용 가능
- 동시 Mapping 요청의 중복 할당 방지를 위한 Lock 처리 필요
- Driver Upgrade 시 Custom Patch 재적용과 회귀시험 필요

### 관련 파일

- Cinder Entry Point `cinder/volume/drivers/dell_emc/powerstore/driver.py`
- PowerStore REST API 호출 Module `client.py`
- Volume Attach·Detach 관리 Module `adapter.py`

### LUN ID 제한 예시

```python
def _allocate_lun_id(self, host_id):
    used_luns = self.client.get_used_luns(host_id)
    for lun_id in range(0, 255):
        if lun_id not in used_luns:
            return lun_id
    raise Exception("No free LUN IDs in range 0-254")


def map_volume(self, volume, connector):
    host_id = self._get_or_create_host(connector)
    lun_id = self._allocate_lun_id(host_id)
    self.client.attach_volume(
        volume.id,
        host_id,
        lun_id=lun_id,
    )
```

- 실제 적용 전 사용 중인 Cinder·PowerStore Driver의 Method와 API 지원 여부 확인 필요

## Multipath 설정

- LUN 번호 상한 제어가 아닌 경로 통합·Failover 최적화 목적
- PowerStore의 ALUA 우선순위와 Path Checker 적용
- 경로 장애 시 Queue·Retry·Failback 정책 적용

```text title="/etc/multipath.conf"
defaults {
    user_friendly_names yes
    find_multipaths yes
}

devices {
    device {
        vendor "DELL"
        product "PowerStore"
        path_grouping_policy group_by_prio
        path_checker tur
        features "1 queue_if_no_path"
        hardware_handler "1 alua"
        prio alua
        no_path_retry 30
        failback immediate
    }
}
```

## LUN 255 초과 지원

### 현재 설정 확인

```bash
cat /sys/module/scsi_mod/parameters/max_luns
```

### 탐색 범위 확대

```bash title="/etc/default/grub"
GRUB_CMDLINE_LINUX="scsi_mod.max_luns=1024"
```

```bash
sudo update-grub
sudo reboot
```

### 적용 확인 및 재탐색

```bash
cat /sys/module/scsi_mod/parameters/max_luns

for host in /sys/class/scsi_host/host*; do
    echo "- - -" | sudo tee "$host/scan"
done
```

- Kernel Parameter 변경에 따른 Host 재부팅 필요
- 운영 적용 전 OS·Kernel별 지원 범위 확인 필요

## 운영 검증

- Cinder Volume 생성·연결·해제·삭제 정상 여부 확인
- PowerStore Host Mapping과 LUN ID 일치 여부 확인
- 동일 Volume의 Multipath Device 통합 여부 확인
- Compute Node 재부팅 후 LUN 재인식 여부 확인
- 단일 Path 장애 시 I/O 연속성과 Failover 여부 확인
- LUN 255 초과 Volume의 탐색·연결·해제 여부 확인

## 확인 결과

- LUN 번호 증가와 실제 연결 Volume 수의 직접 연관성 부재
- Cinder `cinder.conf`의 LUN 번호 제한 Option 부재
- LUN 번호 고정 필요 시 PowerStore Driver·API 계층의 제어 필요
- Multipath 설정을 통한 LUN 번호 제한 기능 부재
- LUN 255 초과 사용 시 Linux SCSI 탐색 범위 확대 필요
- Driver Customizing보다 Host 탐색 범위 확대 우선 검토 필요
- Custom Driver 적용 시 동시성·Upgrade·회귀시험 기준 수립 필요

