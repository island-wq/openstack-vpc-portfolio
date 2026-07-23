import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const highlights = [
  ['2 Cases', 'VPC 아키텍처와 HCI 상품 설계'],
  ['OpenStack', 'OVN·Geneve·Ceph 기반 기술 설계'],
  ['End-to-End', '요구사항부터 검증·로드맵까지'],
  ['Mermaid', '수정 가능한 아키텍처 다이어그램'],
];

const projects = [
  {
    number: '01',
    title: 'OpenStack Native VPC',
    description: '전용 장비 중심 VPC를 ML2/OVN, Geneve, DVR 기반 구조로 재설계하고 성능과 가용성을 검증했습니다.',
    tags: ['VPC', 'OVN', 'DVR', 'HA'],
    link: '/docs/intro',
  },
  {
    number: '02',
    title: 'Small HCI Product Design',
    description: '대형 랙 상품과 소형 가상화 제품 사이의 공백을 4노드 OpenStack HCI 상품으로 설계했습니다.',
    tags: ['HCI', 'Ceph', 'PXE', '10GbE'],
    link: '/docs/hci/intro',
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
            복잡한 인프라 요구사항을
            <br />
            실행 가능한 아키텍처로 설계하다
          </Heading>
          <p className={styles.heroSubtitle}>
            OpenStack 기반 VPC 설계부터 소규모 HCI 상품화까지,
            문제 정의·설계 결정·트래픽 흐름·검증 과정을 기록한 포트폴리오입니다.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              VPC 사례 보기
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/hci/intro">
              HCI 사례 보기
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
            <Heading as="h2" className={styles.sectionTitle}>설계 의도와 판단 근거를 함께 보여주는 사례</Heading>
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
              <Heading as="h2">구성도보다 먼저 문제와 트레이드오프를 설명합니다.</Heading>
            </div>
            <div className={styles.storyCopy}>
              <p>
                각 사례는 사업·운영 요구사항을 기술 요구사항으로 바꾸고, 가능한 대안을 비교한 뒤
                선택한 구조와 포기한 조건을 함께 기록합니다.
              </p>
              <p>
                시스템 컨텍스트, 배포 구조, 데이터 흐름을 Mermaid로 표현해 설계 변경 이력을 관리하고,
                검증 결과와 미검증 항목을 분리해 아키텍처의 신뢰도를 높였습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
