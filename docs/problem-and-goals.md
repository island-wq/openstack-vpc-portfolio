---
title: 문제와 목표
description: 기존 VPC 구조의 한계와 프로젝트 목표
---
ㅇㅇㅇㅇ
# 문제와 목표

## 배경

기존 프라이빗 클라우드 VPC는 전용 방화벽 중심의 논리 인스턴스를 테넌트 경계로 사용. 
이 방식은 명확한 격리와 레거시 환경에 기반한 운영 모델을 제공했지만, 고객과 VPC가 증가할수록 장비·라이선스 비용도 함께 증가

### 비용 구조

- VPC별 네트워크 장비 라이선스가 필요
- 신규 고객에게 고정 네트워크 기본 비용이 발생
- 랙과 테넌트 규모가 커질수록 장비 중심 비용이 누적 증가

### 확장성의 필요

- 1계정 1VPC 구조로 여러 워크로드를 분리하기 어려움
- VLAN 기반 사용자 네트워크는 식별자 수에 구조적 한계 발생
- 기존 제어 노드가 North-South 트래픽까지 담당할 경우 확장 시 병목 위험 요소 

### 상품 경쟁력

-  경쟁사 기준,  VPC는 기본 격리 단위로 제공하면서 Public/Private Subnet, Route Table, Internet/NAT Gateway, Security Group과 Multi-AZ를 일관된 사용자 경험으로 제공
- 기존 구조에서도 유사한 기능은 가능하나 OpenStack 자원과 장비 설정이 분리되어 상품 확장과 자동화 구현이 어려움.

## 프로젝트 목표

### 1. OpenStack 중심 VPC 모델

- OpenStack Project를 VPC 격리 경계로 사용
- 한 계정에서 여러 Project/VPC 사용
- Geneve Overlay를 통한 테넌트 확장성 확보

### 2. VPC 핵심 기능 재구성

- Public/Private Subnet
- Route Table과 Internet Gateway
- NAT Gateway와 Floating IP
- Security Group과 Network ACL
- Router Availability Zone

### 3. 실제 투입 가능성 검증

- 기능이 설계대로 동작하는가?
- Overlay와 분산 라우팅의 처리량은 충분한가?
- Router 수와 VM 수가 증가해도 성능이 유지되는가?
- Gateway Node 장애 시 자동 전환되는가?
- 기존 운영 환경과 벤더 지원 정책 안에서 적용 가능한가?

## 성공 기준

| 관점 | 성공 기준 |
| --- | --- |
| 기능 | VPC 핵심 네트워크 기능의 정상 동작 |
| 성능 | 10Gbps 물리 환경에서 실효 대역폭에 근접 |
| 가용성 | Gateway 장애 시 자동 Failover와 복구 확인 |
| 확장성 | VLAN 수 제한을 벗어난 Overlay 기반 모델 확보 |
| 운영성 | 제어 노드와 데이터 트래픽 역할 분리 |
| 사업성 | 장비·라이선스 의존도를 낮출 수 있는 비용 모델 제시 |
