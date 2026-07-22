---
slug: why-ovn-geneve
title: VLAN 중심 VPC에서 OVN/Geneve로 전환한 이유
authors: [portfolio]
tags: [openstack, ovn, geneve, architecture]
---

VPC 아키텍처를 바꾼 가장 큰 이유는 새로운 기술을 사용하기 위해서가 아니라 **테넌트 증가에 따라 비용과 네트워크 식별자가 함께 소진되는 구조**를 바꾸기 위해서였습니다.

<!-- truncate -->

## VLAN만으로는 충분하지 않았습니다

기존 VLAN 기반 사용자 네트워크는 단순하고 운영 경험이 풍부했습니다. 하지만 VLAN ID는 유한하며, 한 고객이 여러 네트워크를 사용하는 구조에서는 수용 가능한 Project 수가 빠르게 줄어듭니다.

Overlay Network는 이 문제를 VNI 공간으로 확장합니다. 물리 네트워크는 IP 도달성을 제공하고, 테넌트 분리는 Geneve 터널이 담당합니다.

## OVN은 라우팅과 보안 경로도 바꿨습니다

ML2/OVN에서는 논리 라우터와 Security Group이 OVS Flow로 구현됩니다. East-West 라우팅은 Compute Node에서 처리되고, Floating IP도 VM이 실행되는 Compute에서 분산 처리할 수 있습니다.

이 구조는 중앙 Network Node의 병목을 줄이지만 새로운 운영 과제를 만듭니다.

- Geneve 캡슐화에 맞춘 MTU 설계
- OVN Northbound/Southbound DB 이해
- `br-int` Flow 기반 트러블슈팅
- 일반 SNAT을 담당하는 Gateway의 별도 용량 산정

## 중요한 것은 선택보다 조건입니다

PoC에서 Geneve East-West와 SNAT은 10Gbps 물리 환경에서 약 9Gbps 수준을 기록했습니다. 그러나 이 수치만으로 상용화를 결정하지 않았습니다. Gateway 장애 전환, 벤더 지원 형상, 기존 존 변경 위험을 함께 검토한 결과 신규 존 우선 적용이 적합하다고 판단했습니다.

아키텍처 결정은 기술의 장점뿐 아니라 **적용 가능한 조건과 남는 위험을 명시할 때** 완성됩니다.
