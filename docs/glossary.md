---
title: 용어집
description: 프로젝트에서 사용하는 OpenStack 네트워크 용어
---

# 용어집

| 용어              | 설명                                                             |
| --------------- | -------------------------------------------------------------- |
| VPC             | 사용자 자원을 논리적으로 격리한 가상 네트워크 환경. 본 설계에서는 OpenStack Project와 매핑    |
| Project         | OpenStack 자원의 소유권, Quota, 권한을 나누는 격리 단위                        |
| Neutron         | OpenStack 네트워킹 서비스                                             |
| ML2/OVN         | Neutron과 OVN을 연결해 논리 네트워크·라우터·보안을 구현하는 메커니즘 드라이버               |
| OVS             | Open vSwitch. 호스트의 가상 스위치와 Flow 처리를 담당                         |
| OVN             | Open Virtual Network. OVS 기반 논리 네트워크 제어 계층                     |
| Geneve          | 테넌트 트래픽을 Underlay 위에서 전달하는 Overlay 캡슐화 방식                      |
| DVR             | Distributed Virtual Routing. 라우팅 기능을 Compute와 Gateway에 분산하는 방식 |
| East-West       | VM·서비스 간 내부 트래픽                                                |
| North-South     | 외부 네트워크와 VPC 사이의 트래픽                                           |
| SNAT            | 송신지 주소를 변환해 Private 주소가 외부로 통신하도록 하는 기능                        |
| DNAT            | 목적지 주소를 변환해 공인 주소 트래픽을 VM으로 전달하는 기능                            |
| Floating IP     | VM의 Fixed IP와 연결되는 외부 접근용 주소                                   |
| Gateway Chassis | OVN Logical Router의 외부 연결을 담당할 수 있는 노드                         |
| Router AZ       | 특정 Router를 배치할 Gateway Chassis 그룹                              |
| BFD             | 노드·경로 장애를 빠르게 감지하기 위한 프로토콜                                     |
| Security Group  | VM Port에 적용되는 Stateful Ingress/Egress 정책                       |
| Network ACL     | Subnet 또는 Logical Switch 수준의 Stateless 정책을 의미하는 상품 개념          |
