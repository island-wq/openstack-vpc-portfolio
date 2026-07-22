# OpenStack Native VPC Architecture

OpenStack 기반 프라이빗 클라우드에서 VPC 서비스를 설계하고 검증한 과정을 정리한 아키텍처 포트폴리오입니다.

## 주요 내용

- ML2/OVN, Geneve Overlay, DVR 기반 데이터 플레인 설계
- East-West, SNAT, Floating IP 트래픽 흐름 분석
- Gateway HA와 장애 전환 검증
- 설계 대안, 제약조건, 위험요소와 단계적 적용 전략

## 문서 사이트

GitHub Pages: https://island-wq.github.io/openstack-vpc-portfolio/

## 로컬 실행

```bash
pnpm install
pnpm start
```

## 프로덕션 빌드

```bash
pnpm build
```

내부 시스템 식별자, 실제 IP 주소, 고객 정보, 원본 문서와 정량 비용 자료는 공개 범위에서 제외했습니다.
