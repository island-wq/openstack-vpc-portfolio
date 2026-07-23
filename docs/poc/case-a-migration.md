---
title: Case A · 워크로드 이관
description: 퍼블릭 클라우드 워크로드의 Private Cloud 이관 PoC
---

# Case A · 워크로드 이관

## 목적

- 퍼블릭 클라우드 VM·DB의 Private Cloud 이전 가능성 확인
- Kubernetes 기반 서비스 재배치 가능성 확인
- 고객 IDC 네트워크·보안·운영 도구 연동 가능성 확인

## 대상

- WEB/WAS 워크로드
- 관계형 데이터베이스
- Kubernetes 서비스
- 공용·업무·DB 네트워크
- 모니터링·CI/CD·보안 운영 기능

## 핵심 검증 항목

- DB Dump 또는 복제 기반 데이터 이관
- 이관 전후 데이터 정합성 비교
- 애플리케이션 기능 호환성 확인
- Scale Up/Down 및 Scale In/Out 확인
- CPU·메모리·디스크 I/O 비교
- 모니터링·로그·알림·승인 기능 확인
- 취약점 점검과 배포 통제 확인

## 주요 설계 쟁점

- IPMI 원격관리망 확보 필요
- Internal API·Tenant·External API·Provider·Storage 망 분리 필요
- VM 라우팅의 Virtual Router 또는 상단망 처리 결정 필요
- Public IP·Floating IP 정책 확정 필요
- Kubernetes Load Balancer 구현 방식 결정 필요
- 추가 Provider Network 수용 방식 결정 필요

## 산출 결과

- 물리·논리 네트워크 초안
- 서비스 흐름 초안
- 이관 대상 목록
- 필수·정량 평가표
- 고객 협의 필요 항목 목록
