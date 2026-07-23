---
title: 프로젝트 개요
description: 소규모 OpenStack HCI 상품 설계 프로젝트 소개
---

# Small OpenStack HCI Product Design

대형 랙 단위 프라이빗 클라우드와 소형 가상화 제품 사이의 공백을 해결하기 위해, **관리 노드 1대와 HCI 노드 3대로 시작하는 소규모 OpenStack 상품**을 설계한 프로젝트

:::

## 프로젝트 요약

| 항목    | 내용                                       |
| ----- | ---------------------------------------- |
| 목표    | 소규모 고객 환경에 적합한 4노드 HCI 참조 상품 정의          |
| 플랫폼   | OpenStack, ML2/OVN, Open vSwitch, Ceph   |
| 핵심 기술 | HCI, 10GbE, LACP, Geneve, DVR, PXE, IPMI |
| 설계 범위 | 상품 포지셔닝, 하드웨어 기준, 네트워크, 배포, 운영 검증 항목     |
| 주요 제약 | 제한된 노드와 대역폭에서 제어·컴퓨트·스토리지 역할 통합          |

## 성과

> 대형 랙 상품의 비용과 소형 제품의 확장성 한계 사이를 메우기 위해, 3노드 OpenStack HCI 클러스터와 표준 배포 절차를 결합한 소규모 프라이빗 클라우드 참조 모델을 정의했습니다.

## 담당 역할

- 기존 상품 라인업과 목표 고객 규모 비교
- HCI 노드의 서버·스토리지·네트워크 기준 정의
- OpenStack Controller·Compute·Ceph 통합 구조 설계 
- OpenStack Antelope 버전을 기반으로하는 OpenStack 배포
- OVN 기반 논리 네트워크와 North-South 트래픽 흐름 설계
- IPMI와 PXE를 활용한 반복 배포 절차 설계
- 기능·성능·장애 검증 항목과 확장 로드맵 정의

## 문서 읽는 순서

1. [문제와 목표](./problem-and-goals.md)
2. [상품 라인업](./product-lineup.md)
3. [최종 아키텍처](./architecture-overview.md)
4. [네트워크 설계](./network-design.md)
5. [배포 흐름](./deployment-flow.md)
6. [핵심 설계 결정](./design-decisions.md)
7. [검증 계획](./validation.md)
8. [성과와 로드맵](./results-and-roadmap.md)

