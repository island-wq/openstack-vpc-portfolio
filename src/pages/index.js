import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const highlights = [
  ['4 Case Studies', 'VPC·HCI·PoC·기능 검증'],
  ['Architecture', 'OVN·Geneve·Ceph 기반 설계'],
  ['Validation', '기능·성능·가용성 검증'],
  ['Migration', 'VMware에서 KVM으로 전환'],
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
    description: '대형 랙 상품과 소형 가상화 제품 사이의 공백을 보완하는 OpenStack HCI 상품 설계.',
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
      description="OpenStack 기반 VPC·HCI·PoC·마이그레이션 아키텍처 포트폴리오"
    >
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>PRIVATE CLOUD ARCHITECTURE PORTFOLIO</p>
          <Heading as="h1" className={styles.heroTitle}>
            OpenStack으로 설계하고,
            <br />
            PoC로 검증한 프라이빗 클라우드
          </Heading>
          <p className={styles.heroSubtitle}>
            VPC와 HCI 상품 설계부터 VMware 마이그레이션, 기능·성능·고가용성 검증까지
            문제를 정의하고 기술적 판단을 증명한 과정을 기록했습니다.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/vpc/intro">
              VPC 아키텍처
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/hci/intro">
              HCI 상품 설계
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/poc/intro">
              PoC 설계·검증
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
              <Heading as="h2">
                요구사항을 설계로 바꾸고,
                <br />
                검증 결과로 완성도를 높입니다
              </Heading>
            </div>
            <ol className={styles.storyCopy}>
              <li>
                <div>
                  <strong>요구사항 구조화</strong>
                  <p>고객의 기능·성능·운영 요구를 설계 조건과 검증 항목으로 구체화</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>아키텍처 설계</strong>
                  <p>패킷 흐름, 보안 정책, 장애 경로를 고려한 Private Cloud 구조 정의</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>PoC 기반 검증</strong>
                  <p>기능·네트워크·스토리지·고가용성 시험을 통한 설계 적합성 확인</p>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
