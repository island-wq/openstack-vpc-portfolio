---
title: 최종 아키텍처
description: 소규모 OpenStack HCI의 시스템 컨텍스트와 배포 구조
---

# 최종 아키텍처

최종 구조는 **관리·배포 노드 1대와 HCI 노드 3대**로 시작합니다. HCI 노드는 OpenStack Controller, Compute, Ceph 역할을 함께 수행하고, 관리 노드는 설치와 운영 기능을 분리합니다.

## 시스템 컨텍스트

```mermaid
flowchart LR
  operator["Cloud Operator"] --> portal["Portal / OpenStack API"]
  portal --> control["OpenStack Control Plane"]
  deployer["Management & Deployer<br/>IPMI · PXE · Repository"] --> control

  subgraph cluster["Small HCI Cluster"]
    control --> compute["Nova Compute"]
    control --> network["Neutron ML2/OVN"]
    control --> storage["Ceph Storage"]
    compute --> vm["Customer Workloads"]
    storage --> vm
    network --> vm
  end

  network --> provider["Provider / External Network"]
  operator --> deployer
```

## 물리 배포 구조

```mermaid
flowchart TB
  mgmt["Management / Deployer Node<br/>PXE · Repository · Operations"]
  switchA["10GbE Switch A"]
  switchB["10GbE Switch B"]

  subgraph hci["HCI Cluster"]
    node1["HCI Node 1<br/>Controller · Compute · Ceph"]
    node2["HCI Node 2<br/>Controller · Compute · Ceph"]
    node3["HCI Node 3<br/>Controller · Compute · Ceph"]
  end

  mgmt --> switchA
  mgmt --> switchB
  switchA === node1
  switchA === node2
  switchA === node3
  switchB === node1
  switchB === node2
  switchB === node3
```

## HCI 노드 내부 역할

```mermaid
flowchart TB
  subgraph node["HCI Node"]
    control["Control Services<br/>API · DB · MQ · OVN DB"]
    compute["Compute Services<br/>Nova · Libvirt · OVS"]
    storage["Storage Services<br/>Ceph OSD"]
    nic["Bonded 10GbE Interfaces"]

    control --> nic
    compute --> nic
    storage --> nic
  end
```

## 역할 통합의 의미

### 얻는 것

- 4대 규모로 상용 OpenStack과 분산 스토리지 구성
- 동일 노드 증설로 컴퓨트와 스토리지 용량을 함께 확장
- 표준 랙 구성 대비 공간과 초기 장비 수 절감

### 감수하는 것

- VM, Control Plane, Ceph가 CPU·메모리·NIC를 공유
- 노드 장애 시 컴퓨트와 스토리지 용량이 동시에 감소
- Ceph Recovery가 API와 VM 트래픽에 영향을 줄 가능성
- 대규모 확장 시 역할 분리형 상품으로 전환 필요

