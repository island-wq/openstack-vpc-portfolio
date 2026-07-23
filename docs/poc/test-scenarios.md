---
title: 시험 시나리오
description: Private Cloud PoC의 단계별 시험 흐름
---

# 시험 시나리오

## 전체 흐름

```mermaid
flowchart LR
  s1["1. 기반 구성"] --> s2["2. 논리 자원"]
  s2 --> s3["3. 가상자원 생성"]
  s3 --> s4["4. 연결·정책"]
  s4 --> s5["5. 운영·장애"]
  s5 --> s6["6. 백업·이관"]
  s6 --> s7["7. 결과 판정"]
```

## 1. 기반 구성

- Controller·Compute·Storage 상태 확인
- OpenStack 핵심 서비스 상태 확인
- Network Agent와 DVR 상태 확인
- MTU·VLAN·Bond·Multipath 설정 확인

## 2. 논리 자원

- Domain·Project·User·Group·Role 생성
- 운영·개발 Project 분리
- Provider·Private Network 할당
- Router와 외부 연결 구성

## 3. 가상자원 생성

- Flavor 정의
- Linux·Windows Image 등록
- Image 기반 Instance 생성
- Console·Log·Action History 확인

## 4. 연결·정책

- 다중 NIC 연결
- Security Group 생성·수정·적용
- Cinder Volume 연결·확장·해제
- Project 간 통신 허용·차단 확인

## 5. 운영·장애

- Instance Resize·Reboot·Delete
- Live Migration
- Cold Migration
- Compute 장애와 Host Evacuation

## 6. 백업·이관

- Volume Snapshot 생성·복원
- Volume Backup 생성·복구
- VMDK→QCOW2 변환
- 변환 Image 등록과 부팅
- VirtIO Driver 적용

## 7. 결과 판정

- 시험 전제조건 기록
- 실행 로그·화면·명령 결과 증적
- 예상 결과와 실제 결과 비교
- 성공·조건부 성공·실패 판정
- 운영 전환 전 후속 조치 정의
