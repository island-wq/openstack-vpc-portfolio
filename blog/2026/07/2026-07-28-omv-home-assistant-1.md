---
slug: omv-home-assistant-1
title: OMV에 Home Assistant 결합하기 1
description: 제한된 홈서버에 OMV와 Home Assistant를 함께 구성한 과정
date: 2026-07-28
authors:
  - portfolio
tags:
  - Home Assistant
  - OpenMediaVault
  - Podman
  - HomeLab
---

# 집에서 구축하는 Home Lab 삽질기 1

제한된 홈서버에서 OMV와 Home Assistant를 함께 운영하게 된 배경과 구성 과정

<!-- truncate -->

## 1. 오픈소스 NAS

![OpenMediaVault 화면 1](./_assets/omv-home-assistant-1/Pasted%20image%2020260727181030.png)
![OpenMediaVault 화면 2](./_assets/omv-home-assistant-1/Pasted%20image%2020260727181115.png)

## 2. Home Assistant

- *때로는 나태한 게으름이 무엇인가를 만들어 내는 적절한 동기가 되기도 한다..(1)*

### 1) podman in OpenMediaVault /with Home Assistant

- 미니PC(NUC)내에서 혹사 당하고 있는 podman

![OpenMediaVault Podman 화면](./_assets/omv-home-assistant-1/Pasted%20image%2020260727182127.png)

자원은 한정되어 있고, 한정된 자원에 실현 가능한(x) 해보고 싶은 것(O)들을 몽땅 때려넣고 싶었다.
그 중의 하나가 Home Assistant.

여기저기 최저가로 구매한 가정 내 디바이스 들*(세탁기.. 냉장고.. 에어컨.. 커튼, 청소기 등등등)을 매번 다른 제조사 '앱'으로 제어하는 데 아주 매우 많이 심각한 귀찮음에 '모든 기기들을 통합 관리' 할 수 있는 방법을 찾다보니 [Open Home Foundation](https://www.home-assistant.io)에서 제공하는 오픈소스를 찾을 수 있었다.

### Home Assistant

![Home Assistant 화면 1](./_assets/omv-home-assistant-1/Pasted%20image%2020260727181640.png)

![Home Assistant 화면 2](./_assets/omv-home-assistant-1/Pasted%20image%2020260727181546.png)

- 사실 예전부터 알고 있던 오픈소스이긴 했으나 반드시 전용 OS(HAOS)를 통해서 배포해야 하는 줄 알았지만, Container 구성도 지원하고 있었음은 최근에야 알게 되었다.

## 3. 그리고 OpenClaw

- 때로는 나태한 게으름이 무엇인가를 만들어 내는 적절한 동기가 되기도 한다..(2)
