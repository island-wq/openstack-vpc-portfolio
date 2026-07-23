---
title: Private Cloud에 VPC 구성하기?!
description: OpenStack Native VPC 아키텍처 설계와 검증 프로젝트 소개
---

# OpenStack Native VPC Architecture

전용 네트워크 장비와 라이선스에 의존하던 프라이빗 클라우드 VPC를 **OpenStack Neutron ML2/OVN 기반 구조로 재설계**하고, 기능·성능·가용성을 검증한 프로젝트.

:::info 공개용 초안
원본 자료의 회사명, 고객명, 데이터센터명, 내부 주소, 장비 견적과 구성 정보는 일반화했습니다. 공개 전에는 본인의 정확한 역할과 공개 가능한 수치만 남겨야 합니다.
:::

## 프로젝트 요약

| 항목    | 내용                                                     |
| ----- | ------------------------------------------------------ |
| 목표    | 전용 장비 기능을 OpenStack 기반으로 대체할 수 있는 VPC 참조 아키텍처 도출       |
| 플랫폼   | Red Hat OpenStack Platform 16.2                        |
| 핵심 기술 | Neutron, ML2/OVN, Open vSwitch, Geneve, DVR, Router AZ |
| 검증 범위 | 기능, East-West/North-South 성능, Gateway 고가용성             |
| 적용 결론 | 기존 리전 보다는 신규 구성 리존 적용이 적합                              |

## 성과

> OpenStack Private Cloud 환경에서의 Project(테넌트) 구조의 Multi-VPC, Geneve Overlay, 분산 라우팅과 전용 Gateway Node를 결합해 VPC 핵심 기능을 재설계하고, 약 **9Gbps급 Overlay 처리량과 Gateway 장애 전환 가능성을 확인.
> 
> **10G 네트워크 환경 기준

## 담당 역할

공개 전 실제 수행 범위에 맞춰 수정합니다.

- 타 CSP VPC 기능과 사용자 경험 비교
- OpenStack 기능을 활용한 VPC 논리·물리 아키텍처 설계
- Public/Private Subnet, Route Table, NAT, Floating IP, 보안 모델 설계
- 기능·성능·가용성 테스트 시나리오 정의와 결과 분석
- 적용 제약, 비용 효과, 단계별 로드맵 정리

## 문서 읽는 순서

1. [문제와 목표](./problem-and-goals.md)
2. [제약조건](./constraints.md)
3. [최종 아키텍처](./architecture-overview.md)
4. [핵심 설계 결정](./design-decisions.md)
5. [트래픽 흐름](./traffic-flows.md)
6. [검증 결과](./validation.md)
7. [성과와 영향](./results-and-impact.md)
8. [위험과 로드맵](./risks-and-roadmap.md)
