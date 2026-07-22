const {themes: prismThemes} = require('prism-react-renderer');

const repository =
  process.env.GITHUB_REPOSITORY || 'island-wq/openstack-vpc-portfolio';
const [organizationName, projectName] = repository.split('/');
const isUserPage = projectName.endsWith('.github.io');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenStack Native VPC Architecture',
  tagline: '프라이빗 클라우드 VPC를 설계하고 검증한 아키텍처 사례',
  favicon: 'img/favicon.svg',
  url: `https://${organizationName}.github.io`,
  baseUrl: isUserPage ? '/' : `/${projectName}/`,
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
        content: 'OpenStack, VPC, OVN, Geneve, DVR, cloud architecture',
      },
    ],
    navbar: {
      title: 'OpenStack VPC Portfolio',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: 'Architecture',
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
          title: 'Case Study',
          items: [
            {label: '프로젝트 개요', to: '/docs/intro'},
            {label: '최종 아키텍처', to: '/docs/architecture-overview'},
            {label: '검증 결과', to: '/docs/validation'},
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
      copyright: `Copyright © ${new Date().getFullYear()} OpenStack VPC Portfolio.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

module.exports = config;
