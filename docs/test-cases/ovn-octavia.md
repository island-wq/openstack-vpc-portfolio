---
title: 1. OVN 기반 L4 Octavia
description: OVN Provider 기반 Octavia L4 Load Balancer 설치 및 기능 검증
---

# 1. OVN 기반 L4 Octavia

## 목적

- Amphora VM 없이 OVN Provider 기반 L4 Load Balancer 구성
- Octavia API와 OVN Northbound DB 연동 확인
- TCP·UDP Listener, Pool, Member, Health Monitor 기능 검증
- OpenStack-Ansible 환경의 OVN 전용 배포 조건 정립

## 구성 방식

- `ovn-octavia-provider` 기반 Octavia·OVN 연동 적용
- Load Balancer 정책의 OVN Northbound DB 반영
- Compute·Network Node의 OVS Flow 기반 분산 처리 적용
- 전용 Amphora VM과 관리 Network 부재
- Load Balancer별 추가 CPU·Memory 자원 소비 최소화

## 설치 검증

- Octavia 기본 Provider의 OVN 고정 적용
- OVN Provider Agent 활성화 적용
- Amphora Image Upload 및 관련 Resource Setup 비활성화 적용
- Amphora 전용 관리 Network·Security Group·iptables Rule 생성 차단 적용
- 불필요한 Health Manager Peer 계산과 관리 Network 조회 우회 적용
- Octavia API·Provider Agent 구동 확인

## 기능 검증

### Load Balancer·Listener

- Load Balancer 생성 및 VIP 할당 확인
- TCP Listener 생성 확인
- UDP Listener 생성 확인
- HTTP·HTTPS·TLS 기반 L7 기능 미지원

### Pool·Member

- Pool 생성 및 Listener 연결 확인
- 동작 중인 Instance의 Pool Member 등록 확인
- OVN Provider의 `SOURCE_IP_PORT` 알고리즘 적용
- `ROUND_ROBIN`·`LEAST_CONNECTIONS` 알고리즘 미지원

### Health Monitor

- Pool Member 상태 확인을 위한 Health Monitor 생성 확인
- TCP 기반 상태 확인 적용
- HTTP·HTTPS 기반 세부 상태 확인 제약

## Amphora 대비 특성

| 항목 | Amphora Provider | OVN Provider |
|---|---|---|
| 처리 구조 | 전용 Load Balancer VM | OVN·OVS 분산 처리 |
| 생성 시간 | VM 부팅 시간 필요 | 정책 즉시 반영 |
| 추가 자원 | VM별 CPU·Memory 필요 | 전용 VM 자원 부재 |
| 지원 범위 | L4·L7 | L4 중심 |
| 알고리즘 | 다중 알고리즘 지원 | `SOURCE_IP_PORT` 중심 |

## 확인 결과

- OVN Provider 기반 L4 Load Balancer 생성 및 동작 확인
- TCP·UDP Listener와 Pool Member 연결 확인
- Amphora VM 없는 분산형 처리 구조 적용
- Load Balancer 생성 대기시간과 전용 자원 사용 감소
- L7 기능과 다중 Pool 알고리즘 부재
- 운영 적용 전 지원 Protocol·알고리즘·Health Monitor 범위 확인 필요
- 배포 자동화의 Amphora 의존 Task 분리 및 Role 개선 필요

