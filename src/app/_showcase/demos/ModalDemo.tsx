'use client';

import { useState } from 'react';
import { Button, Modal, type ModalSize } from '@shared';

export function ModalDemo({ size = 'md', danger = false }: { size?: ModalSize; danger?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button variant={danger ? 'danger' : 'primary'} onClick={() => setOpen(true)}>
        {danger ? '삭제 확인 열기' : `${size.toUpperCase()} 모달 열기`}
      </Button>
      <Modal
        open={open}
        onClose={close}
        size={size}
        title={danger ? '정말 삭제할까요?' : '모달 제목'}
        footer={
          <>
            <Button variant="outline" onClick={close}>
              취소
            </Button>
            <Button variant={danger ? 'danger' : 'primary'} onClick={close}>
              {danger ? '삭제' : '확인'}
            </Button>
          </>
        }
      >
        {danger
          ? '삭제한 항목은 복구할 수 없습니다.'
          : 'ESC 키나 바깥 영역을 클릭하면 닫힙니다. 모달이 열린 동안 배경 스크롤은 잠깁니다.'}
      </Modal>
    </>
  );
}
