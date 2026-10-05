---
title: 9. Parallel LiveMigration on OpenStack Gazpacho
description: OpenStack Gazpacho의 다중 VM 동시 이관과 QEMU 멀티채널 메모리 전송에 대한 시험 설계·PoC 결과·운영 적용 기준
---

# 9. Parallel LiveMigration on OpenStack Gazpacho

- OpenStack Gazpacho 기반 라이브 마이그레이션 성능 검증
- 다중 VM 동시 이관과 단일 VM 멀티채널 전송의 분리 시험 적용
- 10G 단일 링크와 LACP 20G 구성의 완료시간·대역폭 비교
- 32GB·64GB 단일 VM, 32GB VM 2대, 소형 VM 3대·6대의 조건별 분석
- 시험표와 PoC 결과 보고서의 실측 기록 기반 정리
- 내부 주소·호스트명·기관명·계정정보의 공개용 익명화 적용

## 상세 포트폴리오

| 문서 | 분석 자료 | 주요 내용 |
|---|---|---|
| [1. 시험·검증 매뉴얼](./test-validation-manual.md) | Gazpacho TestCase, 2026-10-02, v1.1 Excel 시험표 | 환경·설정·시험 순서·유효 데이터 집계·조건별 결과·판정 기준 |
| [2. PoC 결과 분석](./poc-results-manual.md) | 라이브 마이그레이션 PoC 결과 보고, 자료명 기준 2026-09-30 PowerPoint | 1차 10G·2차 LACP 20G 비교·병목 분석·운영 적용 후보·보고 수치 대조 |

## PoC 요약 발표자료

- [PoC 요약 발표자료 다운로드](/files/gazpacho-poc-summary.pptx): 핵심 결과·조건·검증 한계를 정리한 8장 PowerPoint 제공
- 원시 소요시간 대조 기반 수치 정정 및 편집 가능한 표·차트 적용
- 내부 주소·호스트명·기관명·외부 업무 시스템 연결의 공개 자료 제외 적용

## 원본 수치 정정 이력

- 2026-10-05 기준 별도 Excel·PowerPoint 정정본 작성 및 첨부 원본 보존
- 10G 8·16채널 최대시간 `99초·93초`, 평균 `78.4·84.8·73.4·70.8초` 반영
- 32GB 128채널 평균 `32.0초` 및 Gazpacho 일반 부하 동시성 1 평균 `198.8초` 반영
- 1VM·2VM 비교의 1VM 기준을 LACP 20G 결과로 통일하고 작업량·순차 수행 해석 반영
- 내부 정보 포함 정정본의 로컬 보관 및 GitHub 게시 제외 적용
- 2VM 8채널 시각 역전 기록 1건의 원본 유지 및 재확인 필요

## 병렬화 옵션의 역할

| 옵션 | 적용 단위 | 검증 목적 |
|---|---|---|
| `[DEFAULT] max_concurrent_live_migrations` | 소스 Compute의 outbound 이관 작업 수 | 여러 VM으로 구성한 작업 묶음의 처리시간 확인 |
| `[libvirt] live_migration_parallel_connections` | 개별 VM의 QEMU 메모리 전송 연결 수 | 단일 이관 작업의 멀티채널 전송 효과 확인 |

- Gazpacho의 `live_migration_parallel_connections` 신규 지원 확인: [Nova 2026.1 릴리스 노트](https://docs.openstack.org/releasenotes/nova/2026.1.html)
- 두 옵션의 기본값 `1`과 적용 범위 확인: [Nova 2026.1 설정 문서](https://docs.openstack.org/nova/2026.1/configuration/config.html#max_concurrent_live_migrations), [QEMU 연결 수 설정](https://docs.openstack.org/nova/2026.1/configuration/config.html#libvirt.live_migration_parallel_connections)
- VM 수·실제 동시 실행 수·VM별 채널 수의 별도 기록 필요

```mermaid
flowchart LR
  REQUEST["이관 요청 묶음"] --> POOL["소스 Compute<br/>max_concurrent_live_migrations"]
  POOL --> VM["개별 VM 이관 작업"]
  VM --> CHANNEL["QEMU 메모리 전송<br/>parallel_connections"]
  CHANNEL --> LINK["10G 단일 링크<br/>또는 LACP 20G"]
  LINK --> DEST["대상 Compute"]
  DEST --> CHECK["완료시간 · 대역폭<br/>서비스 상태 검증"]
```

## 핵심 결과

| 시험 조건 | 관측 결과 | 적용 판단 |
|---|---|---|
| 10G 단일 링크 | 채널 2~16에서 NIC Peak 약 9.4~9.6Gbps 기록 | 링크 포화 상태의 채널 증설 효과 제한 확인 |
| LACP 20G, 32GB VM 1대 | 16채널 평균 27.1초, 범위 23~31초 기록 | 8~16채널의 후속 검증 후보 선정 |
| LACP 20G, 64GB VM 1대 | 16채널 평균 80.1초, 범위 25~222초 기록 | 평균값과 반복 변동성의 동시 검토 필요 |
| LACP 20G, 소형 VM 6대 | 1채널 167.7초, 8채널 160.1초 기록 | 약 4.5% 단축과 다른 병목의 추가 분석 필요 |
| LACP 20G, 32GB VM 2대 | 16채널 A+B 합산 평균 59.7초 기록 | 순차 수행 기록과 총 경과시간의 구분 필요 |

## 결과 해석 기준

- 첨부 원본의 과거 시험 기록 기반 결과이며 신규 실환경 재시험 부재
- 32GB 16채널의 10G 기준 70.8초 대비 20G 27.1초, 약 61.7% 단축 확인
- 네트워크 구성·호스트 메모리·반복 횟수 변경을 포함한 전후 비교로, 채널 수 단독 효과의 분리 검증 필요
- 2대 VM의 A+B 합산시간과 실제 작업 묶음 경과시간의 구분 필요
- 다운타임 설정값과 실측 서비스 중단시간의 구분 필요
- 미수행·0초·미입력 데이터의 평균 집계 제외 적용
- 채널 수 증가만으로 성능·안정성 개선을 보장하는 근거 부재
