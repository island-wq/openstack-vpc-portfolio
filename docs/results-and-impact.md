---
title: 성과와 영향
description: 기술, 운영, 사업 관점의 프로젝트 결과
---

# 성과와 영향

## 기술적 성과

- OpenStack Project를 VPC로 사용하는 격리 모델을 구체화했습니다.
- VLAN 중심 구조를 Geneve Overlay로 전환할 수 있는 확장 경로를 제시했습니다.
- East-West와 Floating IP를 분산하고 SNAT을 전용 Gateway에 분리했습니다.
- Public/Private Subnet, Route Table, Internet/NAT Gateway를 OpenStack 자원으로 매핑했습니다.
- 기능, 성능, Gateway 장애 전환을 PoC에서 검증했습니다.

## 운영적 성과

### 역할 분리

| 노드 | 역할 |
| --- | --- |
| Controller | API, DB, Scheduler, OVN Northbound/Southbound DB |
| Compute | VM 실행, East-West 라우팅, Distributed Floating IP |
| Gateway | SNAT, External Gateway, Router HA |
| Director | 배포와 Lifecycle 관리 |

Control Plane과 North-South Data Plane을 분리해 장애와 용량을 독립적으로 관리할 수 있는 구조를 만들었습니다.

## 사업적 효과

내부 비용 모델에서는 일정 수의 프로젝트와 VM 수용량을 가정했을 때 기존 전용 장비·라이선스 구조보다 인프라 비용을 낮출 가능성을 확인했습니다.

정확한 금액과 수용량은 시점별 견적과 내부 사용량 가정에 영향을 받으므로 공개본에서는 제외하고, 비용 증가 구조를 완화한 설계 효과만 설명합니다.

## 적용 결론

기술적으로는 OpenStack Native VPC 제공 가능성을 확인했지만, 기존 존에 Overlay와 Gateway 역할을 추가하는 작업은 배포 형상과 지원 범위를 크게 변경합니다. 따라서 **기존 존의 즉시 전환이 아니라 신규 존에서 표준 구조로 적용**하는 전략을 제안했습니다.

## 포트폴리오에서 강조할 역량

- 사업 문제를 기술 요구사항으로 전환
- 경쟁 서비스의 사용자 경험을 내부 플랫폼 기능으로 매핑
- 논리 설계와 물리 네트워크 설계를 함께 검토
- 처리량뿐 아니라 병목 위치와 확장 단위를 분석
- 성공 결과와 함께 지원 범위, 기술 부채, 미검증 항목을 명시
