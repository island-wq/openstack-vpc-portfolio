---
title: PoC 아키텍처
description: 두 PoC 사례의 공통 물리·논리 아키텍처
---

# PoC 아키텍처

## 공통 물리 구조

```mermaid
flowchart TB
  operator["운영자"] --> portal["관리 포털·OpenStack API"]
  deploy["배포·Repository 노드"] --> control["Controller 노드"]
  control --> compute["Compute 노드"]
  control --> storage["외부 블록 스토리지"]
  compute --> storage

  subgraph networks["분리 네트워크"]
    mgmt["관리·External API"]
    internal["Internal API"]
    tenant["Tenant Overlay"]
    provider["Provider Service"]
    storageNet["Storage·iSCSI Multipath"]
  end

  portal --> mgmt
  control --> internal
  compute --> tenant
  compute --> provider
  control --> storageNet
  compute --> storageNet
```

## 논리 자원 구조

```mermaid
flowchart LR
  admin["Admin"] --> prod["운영 Project"]
  admin --> dev["개발 Project"]
  admin --> shared["공용 Provider Network"]

  prod --> prodNet["운영 Private Network"]
  dev --> devNet["개발 Private Network"]
  prodNet --> router["Virtual Router·DVR"]
  devNet --> router
  router --> shared
  shared --> external["IDC·외부 서비스망"]
```

## 서비스 흐름

```mermaid
flowchart LR
  user["사용자"] --> external["외부망"]
  external --> fip["Floating IP·NAT"]
  fip --> lb["Load Balancer·Ingress"]
  lb --> app["WEB·WAS·Kubernetes"]
  app --> db["DB 서비스"]
  app --> shared["DNS·Registry·NFS·검색"]
```

## 설계 원칙

- 관리·Tenant·Provider·Storage 트래픽 분리
- Project 단위 운영·개발 자원 격리
- 외부 연결의 Provider Network 집중
- East-West 트래픽의 DVR 분산 처리
- 스토리지 경로의 Multipath 구성
- 실제 주소 대신 논리 역할 중심 공개
