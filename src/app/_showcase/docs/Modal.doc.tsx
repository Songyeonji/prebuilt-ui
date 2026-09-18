import { ModalDemo } from '../demos/ModalDemo';
import type { ComponentDoc } from '../types';

const doc: ComponentDoc = {
  name: 'Modal',
  slug: 'modal',
  status: 'beta',
  summary: '현재 화면 위에 띄워 사용자의 확인이나 입력을 받는 다이얼로그입니다.',
  whenToUse: [
    '삭제 확인처럼 사용자의 명시적인 결정이 필요할 때',
    '현재 흐름을 벗어나지 않고 짧은 입력을 받을 때',
  ],
  guidelines: {
    do: ['제목만 읽어도 무슨 결정인지 알 수 있게 작성하세요.', '버튼은 [취소] [주요 액션] 순서로 배치하세요.'],
    dont: ['모달 위에 모달을 중첩해서 띄우지 마세요.', '긴 폼이나 복잡한 내용은 별도 페이지로 분리하세요.'],
  },
  usage: `
import { useState } from 'react';
import { Button, Modal } from '@shared';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>열기</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="모달 제목"
  footer={<Button onClick={() => setOpen(false)}>확인</Button>}
>
  내용
</Modal>`,
  props: [
    { name: 'open', type: 'boolean', required: true, description: '열림 여부' },
    { name: 'onClose', type: '() => void', required: true, description: '닫기 요청 (X, ESC, 바깥 클릭)' },
    { name: 'title', type: 'ReactNode', description: '상단 제목 (aria-labelledby 로 연결)' },
    { name: 'footer', type: 'ReactNode', description: '하단 버튼 영역' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: '최대 너비 400 / 560 / 800 / 1040px, full 은 화면 가득' },
    { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: '바깥 클릭 시 닫기' },
    { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'ESC 키로 닫기' },
  ],
  examples: [
    {
      title: 'Sizes',
      description: '버튼을 눌러 실제 모달을 확인해보세요.',
      render: () => (
        <>
          <ModalDemo size="sm" />
          <ModalDemo size="md" />
          <ModalDemo size="lg" />
          <ModalDemo size="xl" />
          <ModalDemo size="full" />
        </>
      ),
      code: `<Modal open={open} onClose={close} size="sm" title="모달 제목">...</Modal>`,
    },
    {
      title: '삭제 확인',
      render: () => <ModalDemo size="sm" danger />,
      code: `
<Modal
  open={open}
  onClose={close}
  size="sm"
  title="정말 삭제할까요?"
  footer={
    <>
      <Button variant="outline" onClick={close}>취소</Button>
      <Button variant="danger" onClick={handleDelete}>삭제</Button>
    </>
  }
>
  삭제한 항목은 복구할 수 없습니다.
</Modal>`,
    },
  ],
  tokens: ['--color-overlay', '--color-surface', '--color-surface-subtle', '--radius-lg', '--shadow-lg', '--animate-pop-in'],
};

export default doc;
