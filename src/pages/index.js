import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const interests = [
  ['Private Cloud', 'OpenStack·OVN·Ceph를 중심으로 한 설계와 운영'],
  ['Architecture', '요구사항과 제약을 실제 구성으로 옮긴 과정'],
  ['Validation', '기능·성능·가용성을 직접 확인하며 남긴 기록'],
  ['Automation', 'AI Assistant와 Home Assistant를 활용한 일상의 자동화'],
];

const projects = [
  {
    number: '01',
    title: 'OpenStack Native VPC',
    description: 'Private Cloud IaaS 서비스를 위해 VPC를 ML2/OVN, Geneve, DVR 기반으로 설계하고 성능과 가용성을 검증한 경험.',
    tags: ['VPC', 'OVN', 'DVR', 'HA'],
    link: '/docs/vpc/intro',
  },
  {
    number: '02',
    title: 'Small HCI Architecture',
    description: '소규모 환경에서 OpenStack과 Ceph를 함께 운영하기 위해 고민한 HCI 구조와 설계 기록.',
    tags: ['HCI', 'Ceph', 'PXE', '10GbE'],
    link: '/docs/hci/intro',
  },
  {
    number: '03',
    title: 'Private Cloud PoC',
    description: '서로 다른 요구를 이관형과 플랫폼 검증형으로 나누고 직접 설계한 시험과 판단의 과정.',
    tags: ['PoC', 'Migration', 'DVR', 'Cinder'],
    link: '/docs/poc/intro',
  },
  {
    number: '04',
    title: 'OpenStack Lab Notes',
    description: 'OpenStack 기능을 직접 설치하고 동작과 제약을 확인하며 쌓아 온 기술 노트.',
    tags: ['Octavia', 'OVN', 'L4', 'Load Balancer'],
    link: '/docs/test-cases/intro',
  },
  {
    number: '05',
    title: 'Home Assistant',
    description: '홈서버에서 시작해 AI 비서, 가전 제어, 생활 데이터 수집을 하나씩 연결한 개인 프로젝트.',
    tags: ['Home Assistant', 'AI Assistant', 'Podman', 'Automation'],
    link: '/docs/home-ai/intro',
  },
  {
    number: '06',
    title: 'AI Assistant',
    description: '업무와 홈랩에서 AI를 동료처럼 활용하며 배포·운영·문서화 방식을 바꿔 본 경험.',
    tags: ['Claude', 'Codex', 'OpenClaw', 'Operations'],
    link: '/docs/ai-assistant/intro',
  },
];

function Home() {
  return (
    <Layout
      title="Assist@IS"
      description="OpenStack, 홈랩, AI 자동화를 직접 설계하고 운영하며 남긴 개인 기술 기록"
    >
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>ASSIST@IS · PERSONAL TECH NOTES</p>
          <Heading as="h1" className={styles.heroTitle}>
            안녕하세요,
            <br />
            Assist@IS입니다.
          </Heading>
          <p className={styles.heroSubtitle}>
            OpenStack 기반 Private Cloud를 설계하고 검증합니다.
            취미로 구성한 홈랩에서 AI 에이전트를 사용한 Home Assistant와 OMV를
            운영하며 놀고 있는 기록을 보관합니다.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/vpc/intro">
              기록 둘러보기
            </Link>
            <Link className="button button--secondary button--lg" to="/blog">
              Notes
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.metricsSection}>
          <div className={clsx('container', styles.metricsGrid)}>
            {interests.map(([value, label]) => (
              <article className={styles.metric} key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.projectsSection}>
          <div className="container">
            <p className={styles.sectionLabel}>FIELD NOTES</p>
            <Heading as="h2" className={styles.sectionTitle}>세상에 의미 없는 삽질은 없다..</Heading>
            <p className={styles.sectionIntro}>
              완성된 결과만 보여주기보다, 어떤 문제를 만났고 무엇을 판단했는지 함께 담았습니다.
            </p>
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
              <p className={styles.sectionLabel}>WHAT EXPERIENCE TAUGHT ME</p>
              <Heading as="h2">
                모든 삽질의 이력에
                <br />
                기록이라는 의미를 새깁니다
              </Heading>
              <p className={styles.storyIntro}>
                정답을 먼저 제시하기보다 현장을 관찰하고, 작은 검증을 반복하며,
                다음 사람이 이어갈 수 있는 기록을 남기려 합니다.
              </p>
            </div>
            <ol className={styles.storyCopy}>
              <li>
                <div>
                  <strong>현장의 제약에서 시작하기</strong>
                  <p>좋아 보이는 기술보다 지금의 인프라·운영 방식·사람이 감당할 수 있는 구성을 먼저 살핍니다.</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>직접 만들고 확인하기</strong>
                  <p>문서의 설명에 머무르지 않고 설치, 장애, 성능 시험을 거치며 제 판단을 계속 수정합니다.</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>과정을 다음 경험으로 남기기</strong>
                  <p>성공과 실패의 이유, 아직 확인하지 못한 부분까지 기록해 다음 작업의 출발점으로 만듭니다.</p>
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
