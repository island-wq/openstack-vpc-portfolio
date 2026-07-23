---
title: 핵심 설계 결정
description: PoC 아키텍처와 시험 범위의 핵심 판단
---

# 핵심 설계 결정

## 이관형·플랫폼형 PoC 분리

- 배경: 고객별 검증 목적의 상이
- 결정: Case A 이관 적합성, Case B 플랫폼 기능 중심 분리
- 효과: 범위·증적·판정 기준의 명확화

## 네트워크 역할 분리

- 배경: 제한된 NIC와 다수 트래픽 유형
- 결정: VLAN 기반 관리·Tenant·Provider·Storage 분리
- 효과: 장애 분석과 보안정책 적용 용이
- 제약: 상단 스위치·방화벽 사전 협의 필요

## DVR 적용

- 배경: 중앙 Network Node 경유 병목 가능성
- 결정: Compute Node 기반 분산 라우팅 적용
- 효과: East-West·Floating IP 처리 경로 단축
- 제약: Compute별 Network Agent와 외부 연결 검증 필요

## 외부 스토리지와 Multipath 적용

- 배경: Cinder Block Storage의 가용성 요구
- 결정: 전용 Storage Network와 이중 iSCSI 경로 적용
- 효과: 단일 경로 장애 대응
- 제약: MTU·VLAN·스토리지 정책 정합성 필요

## 시험 결과 등급화

- 배경: 단순 성공·실패만으로 운영 적합성 판단 곤란
- 결정: 성공·조건부 성공·실패·미검증 분류
- 효과: 잔여 위험과 후속 조치의 명시
