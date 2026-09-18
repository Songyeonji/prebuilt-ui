'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { focusRing } from '../../utils/styles';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

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
  xl: 'max-w-modal-xl',
  full: 'h-full max-w-none',
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
          'flex max-h-full w-full animate-pop-in flex-col overflow-hidden rounded-lg bg-surface text-fg shadow-lg outline-none',
          sizeClass[size],
          className,
        )}
      >
        <div className="flex items-center gap-4 py-4 pr-4 pl-6">
          {title && (
            <h2 id={titleId} className="text-xl font-semibold tracking-tight">
              {title}
            </h2>
          )}
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className={cn(
              '-my-1 ml-auto grid size-8 cursor-pointer place-items-center rounded-sm text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg',
              focusRing,
            )}
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6 text-md leading-relaxed text-fg-subtle">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-border bg-surface-subtle px-6 py-3">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
