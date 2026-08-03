---
slug: omv-home-assistant-2
title: OMV에 Home Assistant 결합하기 2
description: 홈랩에 Cloudflare와 AI 에이전트를 연결해 본 기록
date: 2026-07-28
authors:
  - Assist@IS
tags:
  - Home Assistant
  - OpenMediaVault
  - OpenClaw
  - Cloudflare
---

# 집에서 구축하는 Home Lab 삽질기 2

OMV와 Home Assistant 홈랩에 외부 연결과 AI 에이전트를 더해 본 과정

<!-- truncate -->

## Cloudflare

![Cloudflare 구성 화면](./_assets/omv-home-assistant-2/Pasted%20image%2020260727181815.png)
- 외부에서도 HA 상태를 조회/운영 하기 위해 도메인을 Cloudflare의 터널링으로 구성했다
- 장점
  - 공인IP 노출없이 사설대역의 IP를 통해 DNS쿼리 가능
  - Cloudflare 무료서비스
  - 1개의 도메인에 여러 서브 도메인을 연결할 수 있음


## OpenClaw

![](_assets/Pasted%20image%2020260730233217.png)
- OMV가 동작 중인 NUC 호스트에 HomeAssistant 와 연동하기 위해 OpenClaw 적용

![697](_assets/Pasted%20image%2020260730235028.png)
