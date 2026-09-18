'use client';

import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  label?: ReactNode;
  /** 입력 아래에 표시되는 도움말 */
  helperText?: ReactNode;
  /** 에러 메시지. 값이 있으면 에러 스타일이 적용되고 helperText 대신 표시됩니다. */
  error?: ReactNode;
  size?: InputSize;
  fullWidth?: boolean;
}

const sizeClass: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-md',
  lg: 'h-12 px-4 text-lg',
};

export function Input({
  label,
  helperText,
  error,
  size = 'md',
  fullWidth = false,
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
    <div className={cn('inline-flex w-field max-w-full flex-col gap-1', fullWidth && 'flex w-full', className)}>
      {label && (
        <label className="text-md font-semibold text-fg" htmlFor={inputId}>
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-md border border-border-strong bg-surface text-fg transition',
          'placeholder:text-fg-muted enabled:hover:border-fg-muted',
          'focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/35',
          'disabled:cursor-not-allowed disabled:bg-surface-muted',
          sizeClass[size],
          error && 'border-danger enabled:hover:border-danger focus:border-danger focus:ring-danger/25',
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        required={required}
        {...rest}
      />
      {message && (
        <p id={messageId} className={cn('text-xs text-fg-muted', error && 'text-danger')}>
          {message}
        </p>
      )}
    </div>
  );
}
