import { Badge } from '@shared';
import type { ComponentDoc } from '../types';

const doc: ComponentDoc = {
  name: 'Badge',
  slug: 'badge',
  status: 'stable',
  summary: '상태나 분류를 짧은 텍스트로 표시하는 라벨입니다.',
  whenToUse: ['주문 상태, 게시글 카테고리 등 짧은 메타 정보를 강조할 때', '목록에서 항목의 상태를 한눈에 구분할 때'],
  guidelines: {
    do: ['한두 단어로 짧게 작성하세요.', '상태 의미에 맞는 색을 사용하세요. (성공=success, 실패=danger)'],
    dont: ['클릭 가능한 요소로 사용하지 마세요. 필요하면 Button 을 사용하세요.'],
  },
  usage: `
import { Badge } from '@shared';

<Badge variant="success" dot>결제 완료</Badge>`,
  props: [
    { name: 'variant', type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger'", default: "'neutral'", description: '색상' },
    { name: 'size', type: "'sm' | 'md'", default: "'md'", description: '크기 (20 / 24px)' },
    { name: 'dot', type: 'boolean', default: 'false', description: '텍스트 앞 상태 점 표시' },
    { name: '...rest', type: 'HTMLAttributes<HTMLSpanElement>', description: '기본 span 속성' },
  ],
  examples: [
    {
      title: 'Variants',
      render: () => (
        <>
          <Badge>Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </>
      ),
      code: `
<Badge>Neutral</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>`,
    },
    {
      title: 'With dot',
      render: () => (
        <>
          <Badge variant="success" dot>
            운영 중
          </Badge>
          <Badge variant="warning" dot>
            점검 예정
          </Badge>
          <Badge variant="danger" dot>
            장애
          </Badge>
        </>
      ),
      code: `
<Badge variant="success" dot>운영 중</Badge>
<Badge variant="warning" dot>점검 예정</Badge>
<Badge variant="danger" dot>장애</Badge>`,
    },
    {
      title: 'Sizes',
      render: () => (
        <>
          <Badge size="sm" variant="primary">
            Small
          </Badge>
          <Badge size="md" variant="primary">
            Medium
          </Badge>
        </>
      ),
      code: `
<Badge size="sm" variant="primary">Small</Badge>
<Badge size="md" variant="primary">Medium</Badge>`,
    },
  ],
  tokens: ['--color-surface-muted', '--color-primary-soft', '--color-success', '--color-success-soft', '--color-warning', '--color-warning-soft', '--color-danger', '--color-danger-soft'],
};

export default doc;
