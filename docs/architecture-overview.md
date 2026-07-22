---
title: 최종 아키텍처
description: OpenStack Native VPC의 논리 및 배포 구조
---

# 최종 아키텍처

최종 구조는 **OpenStack Project를 VPC로 사용**하고, 사용자 네트워크는 **ML2/OVN 기반 Geneve Overlay**로 제공합니다. East-West와 Floating IP는 Compute Node에서 분산 처리하고, 일반 SNAT은 전용 Gateway Node로 분리합니다.

## 시스템 컨텍스트

```mermaid
flowchart LR
  user["Cloud User"] --> portal["Cloud Portal / API"]
  portal --> identity["Keystone<br/>Account - Project Mapping"]
  portal --> neutron["Neutron ML2/OVN"]
  neutron --> vpc["Project = VPC"]
  vpc --> public["Public Subnet"]
  vpc --> private["Private Subnet"]
  vpc --> router["Route Table<br/>OpenStack Router"]
  public --> internet["Internet / External Network"]
  private --> nat["NAT Gateway"]
  nat --> internet
  vpc --> services["Internal Services<br/>Storage / Peering"]
```

## 배포 구조

```mermaid
flowchart TB
  subgraph control["Control Plane"]
    director["Director / Undercloud"]
    controllers["Controller Nodes x3<br/>API, DB, OVN DB"]
  end

  subgraph data["Data Plane"]
    gateways["Gateway Nodes x2+<br/>SNAT, External Gateway"]
    computes["Compute Nodes xN<br/>VM, E-W Routing, Distributed FIP"]
  end

  subgraph networks["Physical Networks"]
    management["Management / API"]
    overlay["Overlay Network<br/>Geneve"]
    service["Provider / External"]
    storage["Storage"]
  end

  director --> controllers
  controllers --> gateways
  controllers --> computes
  overlay --- gateways
  overlay --- computes
  service --- gateways
  service --- computes
  storage --- controllers
  storage --- computes
  management --- director
  management --- controllers
```

## VPC 내부 구조

```mermaid
flowchart TB
  external["Provider External Network"] --> igw["Internet Gateway<br/>Router External Gateway"]

  subgraph project["OpenStack Project = VPC"]
    routerNet["Router Network<br/>사용자 비노출"]
    routePublic["Route Table A"]
    routePrivateA["Route Table B"]
    routePrivateB["Route Table C"]
    publicSubnet["Public Subnet"]
    privateSubnetA["Private Subnet - App"]
    privateSubnetB["Private Subnet - DB"]
    nat["NAT Gateway"]

    routePublic --- routerNet
    routePrivateA --- routerNet
    routePrivateB --- routerNet
    routePublic --> publicSubnet
    routePrivateA --> privateSubnetA
    routePrivateB --> privateSubnetB
    publicSubnet --> nat
    privateSubnetA --> nat
    privateSubnetB --> nat
  end

  igw --> routePublic
```

## 설계 특성

### 분산되는 기능

- 동일·다른 Subnet 간 East-West 라우팅
- Floating IP가 연결된 VM의 DNAT/SNAT
- Security Group Flow 적용

### 집중되는 기능

- Private Subnet의 일반 SNAT
- External Gateway와 Provider Network 연결
- Gateway Chassis 우선순위와 HA

### 포털이 추상화해야 하는 기능

- 계정과 다수 Project/VPC 매핑
- VPC CIDR와 Subnet 중복 검증
- Router를 Route Table로 표현
- External Gateway를 Internet Gateway로 표현
- 관리자 전용 Router Network와 NAT 자원 숨김
