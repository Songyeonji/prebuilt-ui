'use client';

import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { controlHeight, type ControlSize } from '../../utils/styles';

export type InputSize = ControlSize;

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  label?: ReactNode;
  /** 입력 아래에 표시되는 도움말 */
  helperText?: ReactNode;
  /** 에러 메시지. 값이 있으면 에러 스타일이 적용되고 helperText 대신 표시됩니다. */
  error?: ReactNode;
  size?: InputSize;
  fullWidth?: boolean;
  /** 입력 왼쪽 영역 (아이콘 등) */
  leftSection?: ReactNode;
  /** 입력 오른쪽 영역 (단위, 단축키, 버튼 등) */
  rightSection?: ReactNode;
}

const sizeClass: Record<InputSize, string> = {
  xs: 'gap-1.5 rounded-xs px-2 text-xs',
  sm: 'gap-2 rounded-sm px-2.5 text-sm',
  md: 'gap-2 rounded-sm px-3 text-md',
  lg: 'gap-2.5 rounded-md px-3 text-md',
  xl: 'gap-2.5 rounded-md px-4 text-lg',
};

const labelSizeClass: Record<InputSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-md',
  xl: 'text-lg',
};

export function Input({
  label,
  helperText,
  error,
  size = 'md',
  fullWidth = false,
  leftSection,
  rightSection,
  id,
  className,
  required,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error || helperText;

  return (
    <div className={cn('inline-flex w-field max-w-full flex-col gap-1.5', fullWidth && 'flex w-full', className)}>
      {label && (
        <label className={cn('font-medium text-fg', labelSizeClass[size])} htmlFor={inputId}>
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      {/* 테두리/포커스는 바깥 박스가 담당 → 좌우 섹션이 있어도 하나의 입력창처럼 보임 */}
      <div
        className={cn(
          'flex w-full items-center border border-border-strong bg-surface text-fg shadow-xs transition-colors duration-100',
          'not-focus-within:hover:border-fg-muted',
          'focus-within:border-accent focus-within:ring-1 focus-within:ring-accent',
          'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-surface-muted has-[input:disabled]:text-fg-muted',
          controlHeight[size],
          sizeClass[size],
          error &&
            'border-danger not-focus-within:hover:border-danger focus-within:border-danger focus-within:ring-danger',
        )}
      >
        {leftSection && <span className="flex shrink-0 items-center text-fg-muted">{leftSection}</span>}
        <input
          id={inputId}
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-muted disabled:cursor-not-allowed"
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          required={required}
          {...rest}
        />
        {rightSection && <span className="flex shrink-0 items-center text-fg-muted">{rightSection}</span>}
      </div>
      {message && (
        <p id={messageId} className={cn('text-xs text-fg-muted', error && 'text-danger')}>
          {message}
        </p>
      )}
    </div>
  );
}
