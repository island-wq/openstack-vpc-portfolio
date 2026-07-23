/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  architectureSidebar: [
    {
      type: 'category',
      label: '1. VPC 아키텍처 설계',
      link: {type: 'doc', id: 'intro'},
      items: [
        'problem-and-goals',
        'constraints',
        'architecture-overview',
        'design-decisions',
        'traffic-flows',
        'validation',
        'results-and-impact',
        'risks-and-roadmap',
        'glossary',
      ],
    },
    {
      type: 'category',
      label: '2. HCI 상품 설계',
      link: {type: 'doc', id: 'hci/intro'},
      items: [
        'hci/problem-and-goals',
        'hci/product-lineup',
        'hci/architecture-overview',
        'hci/network-design',
        'hci/deployment-flow',
        'hci/design-decisions',
        'hci/validation',
        'hci/results-and-roadmap',
        'hci/glossary',
      ],
    },
  ],
};

module.exports = sidebars;
