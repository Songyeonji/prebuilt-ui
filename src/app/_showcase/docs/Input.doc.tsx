import { Button, Input } from '@shared';
import type { ComponentDoc } from '../types';

const doc: ComponentDoc = {
  name: 'Input',
  slug: 'input',
  status: 'stable',
  summary: '라벨·도움말·에러 메시지를 포함한 텍스트 입력 필드입니다.',
  whenToUse: [
    '한 줄 텍스트(이름, 이메일, 검색어 등)를 입력받을 때',
    '여러 줄 입력이 필요하면 Textarea 를 사용하세요. (추가 예정)',
  ],
  guidelines: {
    do: ['placeholder 대신 label 로 무엇을 입력하는지 알려주세요.', '에러 메시지는 해결 방법까지 알려주세요.'],
    dont: ['label 없이 placeholder 만으로 입력 목적을 설명하지 마세요.'],
  },
  usage: `
import { Input } from '@shared';

<Input
  label="이메일"
  type="email"
  placeholder="name@example.com"
  error={errors.email}
  required
/>`,
  props: [
    { name: 'label', type: 'ReactNode', description: '입력 필드 위 라벨 (input 과 자동 연결)' },
    { name: 'helperText', type: 'ReactNode', description: '입력 아래 도움말' },
    { name: 'error', type: 'ReactNode', description: '에러 메시지. 있으면 에러 스타일 + aria-invalid 적용' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: '높이 28 / 32 / 36 / 40 / 48px — Button 과 같은 높이 체계' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: '부모 너비를 가득 채움' },
    { name: 'leftSection', type: 'ReactNode', description: '입력창 안 왼쪽 영역 (아이콘 등)' },
    { name: 'rightSection', type: 'ReactNode', description: '입력창 안 오른쪽 영역 (단위, 단축키 등)' },
    { name: 'required', type: 'boolean', default: 'false', description: '라벨 옆에 * 표시' },
    { name: '...rest', type: 'InputHTMLAttributes', description: 'value, onChange, type 등 기본 input 속성' },
  ],
  examples: [
    {
      title: 'Default',
      render: () => <Input label="이름" placeholder="홍길동" helperText="실명을 입력해주세요." />,
      code: `<Input label="이름" placeholder="홍길동" helperText="실명을 입력해주세요." />`,
    },
    {
      title: 'Error & Required',
      render: () => (
        <Input label="이메일" defaultValue="wrong-email" error="올바른 이메일 형식이 아닙니다." required />
      ),
      code: `<Input label="이메일" defaultValue="wrong-email" error="올바른 이메일 형식이 아닙니다." required />`,
    },
    {
      title: 'Sizes',
      render: () => (
        <>
          <Input size="xs" placeholder="XSmall" />
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
          <Input size="xl" placeholder="XLarge" />
        </>
      ),
      code: `
<Input size="xs" placeholder="XSmall" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="XLarge" />`,
    },
    {
      title: 'Button 과 나란히',
      description: '같은 size 를 주면 높이가 정확히 맞습니다.',
      render: () => (
        <div className="flex w-full max-w-modal-sm items-end gap-2">
          <Input size="md" label="이메일" placeholder="name@example.com" className="flex-1" />
          <Button size="md">구독하기</Button>
        </div>
      ),
      code: `
<div className="flex w-full max-w-modal-sm items-end gap-2">
  <Input size="md" label="이메일" placeholder="name@example.com" className="flex-1" />
  <Button size="md">구독하기</Button>
</div>`,
    },
    {
      title: 'Left / Right Section',
      description: '아이콘, 단위, 단축키 등을 입력창 안쪽에 붙일 수 있습니다.',
      render: () => (
        <>
          <Input
            placeholder="검색"
            leftSection={
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <circle cx="7" cy="7" r="4.25" />
                <path d="M10.25 10.25L13.5 13.5" strokeLinecap="round" />
              </svg>
            }
          />
          <Input label="가격" placeholder="0" inputMode="numeric" rightSection={<span className="text-sm">원</span>} />
        </>
      ),
      code: `
<Input placeholder="검색" leftSection={<SearchIcon />} />
<Input label="가격" placeholder="0" rightSection={<span>원</span>} />`,
    },
    {
      title: 'Disabled',
      render: () => <Input label="아이디" value="prebuilt-ui" disabled readOnly />,
      code: `<Input label="아이디" value="prebuilt-ui" disabled />`,
    },
  ],
  tokens: ['--color-border-strong', '--color-accent', '--color-danger', '--color-surface-muted', '--radius-sm', '--shadow-xs'],
};

export default doc;
