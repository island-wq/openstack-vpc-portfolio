---
title: 핵심 설계 결정
description: 주요 아키텍처 결정과 트레이드오프
---

# 핵심 설계 결정

## ADR-01. Project를 VPC 경계로 사용

**문제:** OpenStack에는 CSP 상품으로서의 VPC 객체와 VPC CIDR 정책이 없습니다.

**결정:** 기존 격리 단위인 Project를 VPC로 매핑합니다.

**근거:** Compute, Network, Storage 자원의 소유권과 Quota를 Project 경계에서 일관되게 관리할 수 있습니다.

**부작용:** 계정과 여러 Project를 연결하고 VPC CIDR 정책을 검증하는 포털 기능이 필요합니다.

## ADR-02. Single Domain에서 다중 VPC 제공

**대안:** 계정 또는 기업마다 Keystone Domain을 생성하는 Multi Domain.

**결정:** 기존 Single Domain을 유지하고 한 사용자가 여러 Project를 사용할 수 있도록 변경합니다.

**근거:** 기존 인증 구조와 공용 네트워크를 유지하면서 포털 변경 범위를 줄일 수 있습니다.

**부작용:** OpenStack 내부에 계정별 Project를 묶는 상위 객체가 없으므로 포털 데이터 모델이 이를 담당해야 합니다.

## ADR-03. ML2/OVN과 Geneve 선택

**문제:** VLAN 기반 네트워크는 장기적인 테넌트 확장에 한계가 있고, 기존 OVS/iptables Security Group 구조에서 운영 이슈가 관찰됐습니다.

**결정:** ML2/OVN의 기본 Self-service Network인 Geneve를 사용합니다.

**근거:** VNI 기반 확장성, OVN 분산 제어, OVS Flow 기반 라우팅·보안 처리를 활용할 수 있습니다.

**부작용:** Encapsulation 오버헤드, MTU 설계, OVN Flow 분석 역량이 필요합니다.

## ADR-04. 전용 Gateway Node 분리

**문제:** 기본 구성에서는 Controller Node가 Gateway Chassis 역할을 수행해 SNAT 트래픽이 제어 노드로 집중될 수 있습니다.

**결정:** Gateway 역할을 전용 Baremetal Node로 분리합니다.

**근거:** Control Plane과 North-South Data Plane의 장애·용량 도메인을 분리할 수 있습니다.

**부작용:** Gateway Node를 최소 2대 이상 구성하고 AZ별 처리량을 별도로 산정해야 합니다.

## ADR-05. Router 기반 NAT Gateway 우선 적용

**대안 1:** NAT 전용 VNF를 Public Subnet에 배치해 사용자가 지정한 공인 IP를 사용.

**대안 2:** OpenStack Router의 SNAT을 활용.

**결정:** 초기 단계에서는 개발 공수가 작은 Router 기반 방식을 우선합니다.

**부작용:** NAT Gateway의 공인 IP를 사용자가 지정하거나 고정하는 경험에 제약이 생길 수 있습니다.

## ADR-06. OVN ACL로 Network ACL 검토

**문제:** 기본 Security Group은 Stateful Port 수준 정책이며, CSP형 Stateless Subnet ACL과 차이가 있습니다.

**결정:** OVN Logical Switch ACL의 `allow-stateless`를 활용하는 방안을 검토합니다.

**근거:** L2-L4 규칙, Ingress/Egress, 우선순위 기반 Stateless 정책을 표현할 수 있습니다.

**부작용:** OpenStack 표준 API 외부에서 OVN을 직접 제어하면 벤더 지원과 업그레이드 호환성 위험이 생깁니다. 따라서 상용화 전 지원 가능한 제어 계층이 필요합니다.
