'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { focusRing } from '../../utils/styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 로딩 중이면 스피너를 표시하고 클릭을 막습니다. */
  loading?: boolean;
  /** 부모 너비를 가득 채웁니다. */
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-fg-inverse enabled:hover:bg-primary-hover',
  secondary: 'bg-primary-soft text-primary enabled:hover:bg-primary-soft-hover',
  outline: 'border-border-strong bg-surface text-fg enabled:hover:bg-surface-subtle',
  ghost: 'bg-transparent text-fg enabled:hover:bg-surface-muted',
  danger: 'bg-danger text-fg-inverse enabled:hover:bg-danger-hover',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-md',
  lg: 'h-12 px-5 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-semibold leading-none transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        focusRing,
        variantClass[variant],
        sizeClass[size],
        fullWidth && 'w-full',
        loading && 'disabled:opacity-80',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="size-[1em] animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  );
}
