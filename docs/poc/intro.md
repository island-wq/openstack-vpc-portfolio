---
title: 프로젝트 개요
description: Private Cloud PoC 설계 및 검증 사례
---

# Private Cloud PoC Design & Validation

- 서로 다른 고객 요구의 **이관 가능성 검증**과 **플랫폼 기능 검증** 구분
- 요구사항, 아키텍처, 시험 시나리오, 판정 기준의 연결 구조 수립
- 공개 포트폴리오 기준 고객명·주소·내부 IP·시스템명 익명화

## 프로젝트 요약

| 항목 | 내용 |
|---|---|
| 목표 | Private Cloud 도입 전 기술·운영 적합성 검증 |
| 플랫폼 | OpenStack, OVN, KVM/QEMU, Cinder, 외부 스토리지 |
| 사례 | Case A 이관형 PoC, Case B 플랫폼 검증형 PoC |
| 핵심 기술 | VM·DB 이관, DVR, Security Group, Live Migration, Backup |
| 설계 범위 | 물리·논리 아키텍처, 네트워크, 시험 항목, 판정 기준 |
| 주요 제약 | 제한된 일정, 고객망 연동, 기존 운영정책, 외부 스토리지 의존 |

## 담당 역할

- 고객 요구사항의 시험 가능한 항목 변환
- 서버·스토리지·네트워크 연결 구조 설계
- Project·Network·Router·Security Group 논리 구조 설계
- 이관·운영·장애·백업 시나리오 정의
- 필수 항목과 정량 평가 항목 분리
- 미결정 조건과 외부 의존사항 식별

## 핵심 성과

> 기능 나열 중심 PoC에서 요구사항·시험 절차·판정 기준 중심 PoC로 전환

## 문서 읽는 순서

1. [문제와 목표](./problem-and-goals.md)
2. [Case A · 워크로드 이관](./case-a-migration.md)
3. [Case B · 플랫폼 검증](./case-b-platform.md)
4. [PoC 아키텍처](./architecture-overview.md)
5. [시험 시나리오](./test-scenarios.md)
6. [핵심 설계 결정](./design-decisions.md)
7. [검증 범위와 판정](./validation.md)
8. [성과와 로드맵](./results-and-roadmap.md)
