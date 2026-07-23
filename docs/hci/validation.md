---
title: 검증 계획
description: HCI 상품의 기능, 성능, 가용성 검증 항목과 공개 상태
---

# 검증 계획

## 근거 상태

| 항목 | 설계서 근거 | 공개 포트폴리오 상태 |
| --- | --- | --- |
| 3노드 Control Plane | 구성도와 역할 정의 | 설계 확인 |
| OVN·Geneve·DVR | 아키텍처와 트래픽 흐름 | 설계 확인 |
| PXE·IPMI 설치 | 절차와 구성 요소 | 절차 확인 |
| 처리량·IOPS | 정량 결과 없음 | 추가 결과 자료 필요 |
| 노드 장애 복구 | 상세 결과 없음 | 추가 결과 자료 필요 |
| 장기 안정성 | 결과 없음 | 추가 검증 필요 |

## 기능 검증

- OpenStack API, Horizon, 인증, 이미지, VM 생성
- Block Volume 생성·연결·삭제와 Ceph 상태 확인
- 동일·다른 Tenant Network 간 통신
- SNAT, Floating IP, Security Group 동작
- 노드 추가와 HCI 역할 배포
- PXE 재설치와 인벤토리 재등록

## 성능 검증

| 대상 | 주요 지표 | 부하 조건 |
| --- | --- | --- |
| Compute | CPU Ready, Memory Pressure | 정상 및 노드 1대 장애 |
| Storage | IOPS, Throughput, Latency | 정상, Recovery, Degraded |
| Network | East-West, SNAT, FIP 처리량 | VM 수와 동시 세션 증가 |
| Control Plane | API 응답 시간, DB·MQ 부하 | 병렬 Provisioning |

## 가용성 검증

```mermaid
flowchart TB
  baseline["정상 상태 기준 측정"]
  node["HCI Node 1대 중단"]
  nic["NIC / LACP Member 장애"]
  switch["Switch 1대 장애"]
  ceph["Ceph OSD 장애 및 Recovery"]
  gateway["OVN Gateway Chassis 전환"]
  recover["복구 후 데이터·서비스 확인"]

  baseline --> node --> recover
  baseline --> nic --> recover
  baseline --> switch --> recover
  baseline --> ceph --> recover
  baseline --> gateway --> recover
```



