---
title: 프로젝트 개요
description: Private Cloud PoC 설계 및 검증 사례
---

# 고객사 요구사항을 반영한 PoC 진행

- 서로 다른 고객 요구의 **이관 가능성 검증**과 **플랫폼 기능 검증** 구분 확인을 위한 PoC
- 고객 요구사항, 아키텍처, 시험 시나리오, 판정 기준의 연결 구조 수립
- 기능 PoC , 성능 PoC를 통해 고객 요구사항 충족 조건 확인 

## 프로젝트 요약

| 항목     | 내용                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| Case A | - 퍼블릭 클라우드 VM·DB의 Private Cloud 이전 가능성 확인<br />- 고객 IDC 네트워크·보안·운영 도구 연동 가능성 확인<br />- Kubernetes 기반 서비스 재배치 가능성 확인    |
| Case B | - OpenStack 기반 Private Cloud의 핵심 기능 확인<br />- VMware 이미지의 KVM 기반 플랫폼 이전 절차 확인                                        |
| Case C | - Private Cloud 핵심 컴포넌트의 기능 완성도 확인<br />- Tenant·Provider Network의 처리 성능 확인<br />- iSCSI·NFS Storage의 IOPS·대역폭·응답시간 확인 |


## 담당 역할

- 고객 요구사항의 시험 가능한 항목 산정 및 시나리오 설계
- 서버·스토리지·네트워크 연결 구조 설계
- Project·Network·Router·Security Group 논리 구조 설계
- 이관·운영·장애·백업 시나리오 정의
- 미결정 조건과 외부 의존사항 식별

## 핵심 성과

> 기능 나열 중심 PoC에서 요구사항·시험 절차·판정 기준 중심 PoC로 전환

## 문서 읽는 순서

1. [문제와 목표](./problem-and-goals.md)
2. [Case A · 워크로드 이관](case-a-워크로드%20이관.md)
3. [Case B · 플랫폼 검증](case-b-vmware%20to%20KVM.md)
4. [Case C · 성능 및 고가용성 검증](./case-c-performance.md)
5. [PoC 아키텍처](./architecture-overview.md)
6. [시험 시나리오](./test-scenarios.md)
7. [핵심 설계 결정](./design-decisions.md)
8. [검증 범위와 판정](./validation.md)
9. [성과와 로드맵](./results-and-roadmap.md)
