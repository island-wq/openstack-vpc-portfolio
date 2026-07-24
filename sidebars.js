/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  architectureSidebar: [
    {
      type: 'category',
      label: '1. VPC 아키텍처 설계',
      link: {type: 'doc', id: 'vpc/intro'},
      items: [
        'vpc/problem-and-goals',
        'vpc/constraints',
        'vpc/architecture-overview',
        'vpc/design-decisions',
        'vpc/traffic-flows',
        'vpc/validation',
        'vpc/results-and-impact',
        'vpc/risks-and-roadmap',
        'vpc/glossary',
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
    {
      type: 'category',
      label: '3. Private Cloud PoC',
      link: {type: 'doc', id: 'poc/intro'},
      items: [
        'poc/problem-and-goals',
        'poc/case-a-워크로드 이관',
        'poc/case-b-vmware to KVM',
        'poc/case-c-performance',
        'poc/architecture-overview',
        'poc/test-scenarios',
        'poc/design-decisions',
        'poc/validation',
        'poc/results-and-roadmap',
        'poc/glossary',
      ],
    },
    {
      type: 'category',
      label: '4. 테스트 케이스 항목',
      link: {type: 'doc', id: 'test-cases/intro'},
      items: [
        'test-cases/ovn-octavia',
        'test-cases/powerstore-lun-management',
        'test-cases/ovn-gateway',
        'test-cases/ceph-cluster',
        'test-cases/security-group-logging',
        'test-cases/cinder-multibackend-weighting',
        'test-cases/lvm-iscsi-cinder-backend',
      ],
    },
  ],
};

module.exports = sidebars;
