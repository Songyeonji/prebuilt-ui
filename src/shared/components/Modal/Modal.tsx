'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { focusRing } from '../../utils/styles';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  /** 하단 버튼 영역 */
  footer?: ReactNode;
  size?: ModalSize;
  /** 배경(오버레이) 클릭 시 닫기 (기본 true) */
  closeOnOverlayClick?: boolean;
  /** ESC 키로 닫기 (기본 true) */
  closeOnEsc?: boolean;
  className?: string;
}

const sizeClass: Record<ModalSize, string> = {
  sm: 'max-w-modal-sm',
  md: 'max-w-modal-md',
  lg: 'max-w-modal-lg',
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  // onClose 가 매 렌더마다 새 함수여도 effect 가 재실행되지 않도록 ref 로 보관
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      prevFocus?.focus();
    };
  }, [open, closeOnEsc]);

  // SSR 에서는 document 가 없으므로 렌더하지 않음
  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-overlay p-4"
      onMouseDown={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn(
          'flex max-h-[calc(100vh-2rem)] w-full animate-pop-in flex-col rounded-lg bg-surface text-fg shadow-lg outline-none',
          sizeClass[size],
          className,
        )}
      >
        <div className="flex items-center gap-4 px-6 pt-5">
          {title && (
            <h2 id={titleId} className="text-2xl font-bold">
              {title}
            </h2>
          )}
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className={cn(
              'ml-auto grid size-8 cursor-pointer place-items-center rounded-sm text-3xl leading-none text-fg-muted hover:bg-surface-muted hover:text-fg',
              focusRing,
            )}
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4 text-md leading-relaxed">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 pb-5">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
