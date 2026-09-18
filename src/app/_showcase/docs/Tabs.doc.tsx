import { Tabs } from '@shared';
import type { ComponentDoc } from '../types';

const sampleItems = [
  { key: 'profile', label: '프로필', content: <p>프로필 탭 내용입니다.</p> },
  { key: 'settings', label: '설정', content: <p>설정 탭 내용입니다.</p> },
  { key: 'billing', label: '결제', content: <p>결제 탭 내용입니다.</p> },
  { key: 'admin', label: '관리자', content: null, disabled: true },
];

const doc: ComponentDoc = {
  name: 'Tabs',
  slug: 'tabs',
  status: 'beta',
  summary: '같은 맥락의 콘텐츠를 여러 패널로 나눠 전환하는 컴포넌트입니다. 이 문서 페이지의 탭도 이 컴포넌트입니다.',
  whenToUse: [
    '한 화면에서 관련된 여러 콘텐츠를 전환해 보여줄 때',
    '←/→, Home/End 키보드 이동과 ARIA 속성이 기본 적용됩니다.',
  ],
  guidelines: {
    do: ['탭 라벨은 짧고 명확하게 작성하세요.', '탭은 2~6개 정도로 유지하세요.'],
    dont: ['단계가 있는 흐름(1→2→3)에는 Tabs 대신 Stepper 를 사용하세요.'],
  },
  usage: `
import { Tabs } from '@shared';

<Tabs
  items={[
    { key: 'profile', label: '프로필', content: <Profile /> },
    { key: 'settings', label: '설정', content: <Settings /> },
  ]}
  onChange={(key) => console.log(key)}
/>`,
  props: [
    { name: 'items', type: 'TabItem[]', required: true, description: '{ key, label, content, disabled? } 배열' },
    { name: 'activeKey', type: 'string', description: '제어 모드 — 현재 활성 탭' },
    { name: 'defaultActiveKey', type: 'string', default: '첫 번째 탭', description: '비제어 모드 초기 탭' },
    { name: 'onChange', type: '(key: string) => void', description: '탭 변경 콜백' },
    { name: 'variant', type: "'line' | 'pill'", default: "'line'", description: '탭 스타일' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '탭 크기' },
  ],
  examples: [
    {
      title: 'Line (기본)',
      render: () => (
        <div className="w-full">
          <Tabs items={sampleItems} />
        </div>
      ),
      code: `<Tabs items={items} />`,
    },
    {
      title: 'Pill',
      render: () => (
        <div className="w-full">
          <Tabs items={sampleItems} variant="pill" />
        </div>
      ),
      code: `<Tabs items={items} variant="pill" />`,
    },
    {
      title: 'Sizes',
      render: () => (
        <div className="flex w-full flex-col gap-6">
          <Tabs items={sampleItems} size="sm" />
          <Tabs items={sampleItems} size="md" />
          <Tabs items={sampleItems} size="lg" />
          <div className="flex flex-wrap items-start gap-3">
            <Tabs items={sampleItems.slice(0, 3)} variant="pill" size="sm" />
            <Tabs items={sampleItems.slice(0, 3)} variant="pill" size="md" />
            <Tabs items={sampleItems.slice(0, 3)} variant="pill" size="lg" />
          </div>
        </div>
      ),
      code: `
<Tabs items={items} size="sm" />
<Tabs items={items} size="md" />
<Tabs items={items} size="lg" />
<Tabs items={items} variant="pill" size="sm" />`,
    },
  ],
  tokens: ['--color-primary', '--color-fg-muted', '--color-surface-muted', '--color-border', '--radius-sm', '--shadow-sm'],
};

export default doc;
