---
title: 성과와 영향
description: 기술, 운영, 사업 관점의 프로젝트 결과
---

# 성과와 영향

## 기술적 성과

- OpenStack Project를 VPC로 사용하는 격리 모델을 구체화
- VLAN 중심 구조를 Geneve Overlay로 전환할 수 있는 확장 경로를 제시
- East-West와 Floating IP를 분산하고 SNAT을 전용 Gateway에 분리
- Public/Private Subnet, Route Table, Internet/NAT Gateway를 OpenStack 자원으로 매핑
- 기능, 성능, Gateway 장애 전환을 PoC에서 검증

## 운영적 성과

### 역할 분리

| 노드 | 역할 |
| --- | --- |
| Controller | API, DB, Scheduler, OVN Northbound/Southbound DB |
| Compute | VM 실행, East-West 라우팅, Distributed Floating IP |
| Gateway | SNAT, External Gateway, Router HA |
| Director | 배포와 Lifecycle 관리 |

Control Plane과 North-South Data Plane을 분리해 장애와 용량을 독립적으로 관리할 수 있는 구조를 개선

## 사업적 효과

내부 비용 모델에서는 일정 수의 프로젝트와 VM 수용량을 가정했을 때 기존 전용 장비·라이선스 구조보다 인프라 비용을 낮출 가능성을 확인

정확한 금액과 수용량은 시점별 견적과 내부 사용량 가정에 영향이 있을 수 있음
