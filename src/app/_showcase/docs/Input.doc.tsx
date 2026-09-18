import { Input } from '@shared';
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
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '입력 필드 높이' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: '부모 너비를 가득 채움' },
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
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </>
      ),
      code: `
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`,
    },
    {
      title: 'Disabled',
      render: () => <Input label="아이디" value="prebuilt-ui" disabled readOnly />,
      code: `<Input label="아이디" value="prebuilt-ui" disabled />`,
    },
  ],
  tokens: ['--color-border-strong', '--color-primary', '--color-danger', '--color-surface-muted', '--radius-md'],
};

export default doc;
