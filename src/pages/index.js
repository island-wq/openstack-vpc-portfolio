import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const highlights = [
  ['4 Cases', 'VPC·HCI·PoC·기능 테스트'],
  ['OpenStack', 'OVN·Geneve·Ceph 기반 기술 설계'],
  ['End-to-End', '요구사항부터 검증·로드맵·PoC까지'],
  ['Migration', 'VMware to KVM 마이그레이션'],
];

const projects = [
  {
    number: '01',
    title: 'OpenStack Native VPC',
    description: 'Private Cloud를 위한 VPC를 ML2/OVN, Geneve, DVR 기반 구조로 재설계하고 성능과 가용성을 검증.',
    tags: ['VPC', 'OVN', 'DVR', 'HA'],
    link: '/docs/vpc/intro',
  },
  {
    number: '02',
    title: 'Small HCI Product Design',
    description: '대형 랙 상품을 보 완하기 위한 소용량 가상화 제품 HCI 상품 설계',
    tags: ['HCI', 'Ceph', 'PXE', '10GbE'],
    link: '/docs/hci/intro',
  },
  {
    number: '03',
    title: 'Private Cloud PoC',
    description: '서로 다른 고객 요구를 이관형과 플랫폼 검증형으로 구분하고, 아키텍처·시험 시나리오·판정 기준을 설계.',
    tags: ['PoC', 'Migration', 'DVR', 'Cinder'],
    link: '/docs/poc/intro',
  },
  {
    number: '04',
    title: 'OpenStack Test Cases',
    description: 'OpenStack 기능 단위 설치·동작·제약사항을 검증하고 운영 적용 조건을 정리.',
    tags: ['Octavia', 'OVN', 'L4', 'Load Balancer'],
    link: '/docs/test-cases/intro',
  },
];

function Home() {
  return (
    <Layout
      title="Private Cloud Architecture Portfolio"
      description="OpenStack 기반 VPC 아키텍처와 HCI 상품 설계 포트폴리오"
    >
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>PRIVATE CLOUD ARCHITECTURE PORTFOLIO</p>
          <Heading as="h1" className={styles.heroTitle}>
            프라이빗 클라우드에 VPC
            <br />
            구성이 가능하다고?
          </Heading>
          <p className={styles.heroSubtitle}>
            OpenStack 기반 VPC 설계부터 소규모 HCI 상품화까지,
            문제 정의·설계 결정·트래픽 흐름·검증 과정을 기록한 포트폴리오입니다.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/vpc/intro">
              VPC 아키텍처 설계 및 구현
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/hci/intro">
              HCI 설계 및 구현
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/poc/intro">
              PoC 설계 및 검증
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/test-cases/intro">
              테스트 케이스
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

        <section className={styles.projectsSection}>
          <div className="container">
            <p className={styles.sectionLabel}>SELECTED WORK</p>
            <Heading as="h2" className={styles.sectionTitle}>설계 및 구현 사례</Heading>
            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <Link className={styles.projectCard} to={project.link} key={project.number}>
                  <span className={styles.projectNumber}>{project.number}</span>
                  <Heading as="h3">{project.title}</Heading>
                  <p>{project.description}</p>
                  <div className={styles.tagList}>
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={clsx('container', styles.storyGrid)}>
            <div>
              <p className={styles.sectionLabel}>HOW I WORK</p>
              <Heading as="h2">고객 요구사항을 만족하기 위한 설계 세우고 PoC를 통해 검증했습니다</Heading>
            </div>
            <div className={styles.storyCopy}>
              <p>
               프라이빗 클라우드 IaaS 환경에 VPC 요구사항을 대응하기 위한 아키텍처 설계
              </p>
              <p>
                패킷 플로우, SG Rule, 네트워크 처리 과정을 시뮬레이션하여 다양한 환경에서 PoC 진행
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
