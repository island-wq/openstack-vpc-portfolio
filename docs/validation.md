---
title: 검증 결과
description: 기능, 성능, 가용성 검증 시나리오와 결과
---

# 검증 결과

검증은 기능, 성능, 가용성 세 축으로 진행했습니다. 수치는 2023년 PoC 환경에서 측정된 값이며 최신 릴리스 또는 다른 하드웨어의 성능을 보장하지 않습니다.

## 기능 검증

다음 범주의 필수 기능이 정상 동작하는지 확인했습니다.

- Tenant Network 생성과 동일·다른 Subnet 통신
- Router와 다중 Tenant Network 연결
- External Network 연결과 Floating IP
- Security Group Ingress/Egress 정책
- Router AZ와 Gateway Chassis 배치
- SNAT, DNAT, East-West 분산 라우팅

**결과:** 정의한 필수 기능 항목은 모두 통과했습니다.

## 성능 검증 환경

- 도구: `iperf3`
- 물리 네트워크: 10Gbps NIC, LACP
- 비교 축: East-West L2/L3, SNAT, Floating IP
- 부하 변화: VM 1대와 50대
- 확장 변화: Router 10개와 70개

## 성능 결과

| 시나리오 | 조건 | 측정 결과 |
| --- | --- | --- |
| East-West L2 | 같은 Geneve Network, VM 1대 | 약 9.00Gbps |
| East-West L2 | VM 50대 합산 | 약 8.95Gbps |
| East-West L3 | 다른 Geneve Network, VM 1대 | 약 9.01Gbps |
| East-West L3 | Router 70개, VM 50대 합산 | 약 8.95Gbps |
| North-South SNAT | VM 1대 | 약 8.99Gbps |
| North-South SNAT | VM 50대 합산 | 약 8.95Gbps |
| Distributed Floating IP | VM 1대 | 약 9.35Gbps |
| Distributed Floating IP | VM 50대 합산 | 약 18.60Gbps |

### 결과 해석

- Geneve 경로는 단일 10Gbps 물리 경로의 실효 대역폭에 근접했습니다.
- Router를 10개에서 70개로 늘려도 측정 처리량 차이는 크지 않았습니다.
- Floating IP는 Compute Node의 분산 경로와 LACP를 활용해 다중 VM 합산 처리량이 증가했습니다.
- VM 수가 증가하면 호스트 물리 NIC 대역폭을 VM들이 나눠 사용했습니다.

:::warning Security Group 검증 범위
대규모 Security Group 규칙에 대한 독립적인 장시간 부하 시험은 충분하지 않았습니다. 기본 기능과 일반 트래픽 경로는 확인했지만, 대규모 규칙 성능은 추가 검증 과제로 남겨야 합니다.
:::

## 가용성 검증

### Gateway 1대 장애

- Active Gateway를 종료
- 약 4회의 Ping 손실 후 다음 Gateway로 Failover 확인
- 원 Gateway 복구 후 Failback 확인
- Failback 과정에서 시험 회차별 약 8-18회의 Ping 손실 관찰

### Gateway 2대 장애

- 우선순위 상위 Gateway 2대를 순차 종료
- 약 3회의 Ping 손실 후 세 번째 Gateway로 Failover 확인
- Gateway 복구 순서에 따라 1차·2차 Failback 확인
- Failback 과정에서 시험 회차별 약 8-17회의 Ping 손실 관찰

### 결론

Gateway Chassis 우선순위에 따른 Failover와 Failback은 정상 동작했습니다. 다만 전환 과정에서 패킷 손실이 있었으므로 결과를 `무중단`으로 표현하지 않고, 서비스 요구사항에 맞춘 전환 시간과 Failback 정책 개선이 필요합니다.
