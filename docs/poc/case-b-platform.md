---
title: Case B · 플랫폼 검증
description: OpenStack 플랫폼 기능과 운영성 검증 PoC
---

# Case B · 플랫폼 검증

## 목적

- OpenStack 기반 Private Cloud의 핵심 기능 확인
- Project 단위 자원 격리와 네트워크 정책 확인
- 외부 스토리지 연동과 가상자원 운영 기능 확인
- VMware 이미지의 KVM 기반 플랫폼 이전 절차 확인

## 검증 범위

- 시스템 구성과 OpenStack 서비스 상태
- Domain·Project·User·Group·Role 관리
- Network·Subnet·Port·Router 관리
- Flavor·Image·Instance 생명주기
- Security Group 생성·수정·적용
- Cinder Volume 연결·확장·해제
- Live/Cold Migration·Host Evacuation
- Snapshot·Backup·Restore
- VMDK→QCOW2 변환과 이미지 등록

## 구성 특징

- Controller·Compute 분리형 구성
- 외부 블록 스토리지 연동
- 서비스·관리·스토리지 트래픽 분리
- iSCSI Multipath 적용
- Tenant Overlay와 Provider Network 병행
- DVR 기반 분산 라우팅 적용

## 용량 검토

- Controller 배치 방식별 가용 vCPU·메모리 차이 확인
- 2노드 축소 구성의 수용 VM 수 비교
- 제어 기능 집중에 따른 장애 도메인 확대
- PoC 축소 구성과 상용 참조 구성의 분리 필요
