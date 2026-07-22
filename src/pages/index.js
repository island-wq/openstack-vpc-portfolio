import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const highlights = [
  ['9 Gbps', 'Geneve East-West 및 SNAT 처리량'],
  ['18.6 Gbps', '다중 VM Distributed Floating IP 합산'],
  ['70 Routers', '확장 시나리오에서 처리량 유지'],
  ['HA Verified', 'Gateway Failover와 Failback 확인'],
];

function Home() {
  return (
    <Layout
      title="OpenStack Native VPC Architecture"
      description="OpenStack ML2/OVN 기반 프라이빗 클라우드 VPC 설계 및 검증 사례"
    >
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>PRIVATE CLOUD ARCHITECTURE CASE STUDY</p>
          <Heading as="h1" className={styles.heroTitle}>
            전용 장비 중심 VPC를
            <br />
            OpenStack Native 구조로 재설계하다
          </Heading>
          <p className={styles.heroSubtitle}>
            ML2/OVN, Geneve Overlay, DVR, 전용 Gateway Node를 조합해
            확장성·성능·가용성을 검증한 아키텍처 프로젝트입니다.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              사례 살펴보기
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/architecture-overview">
              아키텍처 보기
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.metricsSection}>
          <div className={clsx('container', styles.metricsGrid)}>
            {highlights.map(([value, label]) => (
              <article className={styles.metric} key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={clsx('container', styles.storyGrid)}>
            <div>
              <p className={styles.sectionLabel}>THE CHALLENGE</p>
              <Heading as="h2">비용과 확장성의 한계를 아키텍처로 해결했습니다.</Heading>
            </div>
            <div className={styles.storyCopy}>
              <p>
                기존 구조는 테넌트 증가에 따라 전용 네트워크 장비와 라이선스 비용이 함께 증가했고,
                1계정 1VPC 및 VLAN 기반 네트워크는 장기적인 확장에 제약이 있었습니다.
              </p>
              <p>
                Public/Private Subnet, Route Table, NAT, Floating IP, Security Group과
                Gateway HA를 OpenStack 기능으로 재구성하고 실제 PoC에서 기능·성능·장애 전환을 검증했습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
