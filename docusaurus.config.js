const {themes: prismThemes} = require('prism-react-renderer');

const repository =
  process.env.GITHUB_REPOSITORY || 'island-wq/openstack-vpc-portfolio';
const [organizationName, projectName] = repository.split('/');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Private Cloud Architecture Portfolio',
  tagline: '프라이빗 클라우드 아키텍처 설계부터 상품화까지',
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
      title: 'Private Cloud Portfolio',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: 'Portfolio',
        },
        {to: '/blog', label: 'Notes', position: 'left'},
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
          title: 'Case Studies',
          items: [
            {label: 'VPC 아키텍처 설계', to: '/docs/vpc/intro'},
            {label: 'HCI 상품 설계', to: '/docs/hci/intro'},
            {label: 'HCI 최종 아키텍처', to: '/docs/hci/architecture-overview'},
            {label: 'Private Cloud PoC', to: '/docs/poc/intro'},
            {label: '테스트 케이스', to: '/docs/test-cases/intro'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'OpenStack', href: 'https://www.openstack.org/'},
            {label: 'C4 Model', href: 'https://c4model.com/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Private Cloud Architecture Portfolio.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

module.exports = config;
