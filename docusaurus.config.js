const {themes: prismThemes} = require('prism-react-renderer');

const repository =
  process.env.GITHUB_REPOSITORY || 'island-wq/openstack-vpc-portfolio';
const [organizationName, projectName] = repository.split('/');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Assist@IS',
  tagline: 'OpenStack, 홈랩, AI 자동화를 기록하는 개인 기술 블로그',
  favicon: 'img/favicon.svg',
  url: 'https://portfolio.my-assistant.co.kr',
  baseUrl: '/',
  organizationName,
  projectName,
  onBrokenLinks: 'throw',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Architecture Notes',
          blogDescription: '설계 과정에서 얻은 기술적 판단과 교훈',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content: 'OpenStack, VPC, HCI, PoC, OVN, Ceph, private cloud architecture',
      },
    ],
    navbar: {
      title: 'Assist@IS',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: '포트폴리오',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: `https://github.com/${repository}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Field Notes',
          items: [
            {label: 'VPC 아키텍처 설계', to: '/docs/vpc/intro'},
            {label: 'HCI 아키텍처 기록', to: '/docs/hci/intro'},
            {label: 'HCI 최종 아키텍처', to: '/docs/hci/architecture-overview'},
            {label: 'Private Cloud PoC', to: '/docs/poc/intro'},
            {label: 'OpenStack Lab Notes', to: '/docs/test-cases/intro'},
            {label: 'AI Assistant', to: '/docs/ai-assistant/intro'},
            {label: 'PrivateCloud VPC 서비스 시나리오', to: '/docs/private-cloud-vpc-service/intro'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Assist@IS. 기록하고, 실험하고, 다시 고치는 중.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

module.exports = config;
