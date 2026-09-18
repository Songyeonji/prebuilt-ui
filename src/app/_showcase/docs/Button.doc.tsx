import { Button } from '@shared';
import type { ComponentDoc } from '../types';

const doc: ComponentDoc = {
  name: 'Button',
  slug: 'button',
  status: 'stable',
  summary: '사용자의 행동(제출, 저장, 이동 등)을 실행하는 기본 버튼입니다.',
  whenToUse: [
    '폼 제출, 저장, 삭제 등 명확한 행동을 실행할 때',
    '모달/다이얼로그의 확인·취소 액션',
    '페이지 이동이 목적이라면 버튼 대신 링크(<a>)를 사용하세요.',
  ],
  guidelines: {
    do: ['한 화면에 primary 버튼은 하나만 두세요.', '라벨은 "저장하기"처럼 동사로 명확하게 작성하세요.'],
    dont: ['아이콘만 있는 버튼에 aria-label 을 빼먹지 마세요.', 'danger 버튼을 일반 액션에 사용하지 마세요.'],
  },
  usage: `
import { Button } from '@shared';

<Button variant="primary" onClick={handleSave}>
  저장하기
</Button>`,
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", default: "'primary'", description: '버튼 스타일' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '버튼 높이 (32 / 40 / 48px)' },
    { name: 'loading', type: 'boolean', default: 'false', description: '스피너를 표시하고 클릭을 비활성화' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: '부모 너비를 가득 채움' },
    { name: 'leftIcon', type: 'ReactNode', description: '라벨 왼쪽 아이콘' },
    { name: 'rightIcon', type: 'ReactNode', description: '라벨 오른쪽 아이콘' },
    { name: '...rest', type: 'ButtonHTMLAttributes', description: 'onClick, disabled, type 등 기본 button 속성' },
  ],
  examples: [
    {
      title: 'Variants',
      description: '중요도에 따라 5가지 스타일을 제공합니다.',
      render: () => (
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </>
      ),
      code: `
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
    },
    {
      title: 'Sizes',
      render: () => (
        <>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </>
      ),
      code: `
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    },
    {
      title: 'States',
      description: '로딩 중에는 자동으로 disabled 처리됩니다.',
      render: () => (
        <>
          <Button loading>저장 중</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" leftIcon={<span aria-hidden>＋</span>}>
            아이콘
          </Button>
        </>
      ),
      code: `
<Button loading>저장 중</Button>
<Button disabled>Disabled</Button>
<Button variant="outline" leftIcon={<PlusIcon />}>아이콘</Button>`,
    },
  ],
  tokens: ['--color-primary', '--color-primary-hover', '--color-primary-soft', '--color-danger', '--color-danger-hover', '--radius-md'],
};

export default doc;
