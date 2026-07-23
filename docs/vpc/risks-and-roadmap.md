---
title: 위험과 로드맵
description: 남은 위험, 기술 부채, 단계별 발전 계획
---

# 위험과 로드맵

## 주요 위험

| 위험 | 영향 | 대응 방향 |
| --- | --- | --- |
| OVN ACL 직접 제어 | 벤더 지원·업그레이드 호환성 저하 | 표준 API 또는 지원 가능한 제어 계층 설계 |
| Gateway SNAT 집중 | 테넌트 증가 시 병목 | AZ별 Gateway Pool과 용량 모델 운영 |
| Failback 패킷 손실 | 세션 영향 | 자동 Failback 정책, 타이머, 애플리케이션 재시도 검토 |
| Geneve MTU | 단편화·성능 저하 | Underlay Jumbo MTU와 Path MTU 검증 |
| Router NAT 공인 IP 제약 | CSP형 사용자 경험 차이 | VNF 또는 NAT 서비스 계층 검토 |
| 포털 의존 기능 | OpenStack 외부 상태 불일치 | 계정·VPC·CIDR 데이터의 Source of Truth 정의 |
| 구버전 기준 PoC | 최신 릴리스와 차이 | 최신 OpenStack/RHOSP에서 회귀 검증 |

## 단계별 로드맵

### Phase 1. 기본 VPC

- Project 기반 VPC
- Public/Private Subnet
- Route Table과 Internet Gateway
- Floating IP와 Router 기반 NAT
- Security Group

### Phase 2. 운영 자동화

- 1계정 다중 VPC 포털
- VPC/Subnet CIDR 정책
- Gateway AZ 자동 배치
- 용량과 장애 상태 모니터링
- 과금·미터링 체계

### Phase 3. 고급 네트워크

- 지원 가능한 Stateless Network ACL
- NAT Gateway 고정 공인 IP
- Managed L4/L7
- VPC Peering, Private Endpoint, Direct Connect, VPN

### Phase 4. Multi-AZ와 내부 서비스망

- 데이터센터 간 Overlay Underlay
- AZ별 External Gateway
- GSLB와 서비스 진입점 장애 전환
- Storage·Object Service 전용 내부망
- 리전·AZ 간 IP 충돌 방지 체계

## 추가 검증 과제

- Security Group 규칙 수와 동시 연결 수에 따른 성능
- Gateway 장애·복구 시 세션 유지와 실제 전환 시간
- Gateway 1대 장애 후 잔여 노드의 포화 상태
- Control Plane 장애가 기존 Data Plane Flow에 미치는 영향
- 대규모 Project, Network, Port 생성·삭제 시간
- 업그레이드 중 OVN DB와 Flow 일관성
