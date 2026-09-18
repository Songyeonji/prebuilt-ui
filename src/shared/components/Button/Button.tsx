'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { controlHeight, focusRing, type ControlSize } from '../../utils/styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = ControlSize;

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
  primary: 'bg-primary text-fg-inverse shadow-xs enabled:hover:bg-primary-hover',
  secondary: 'bg-primary-soft text-fg enabled:hover:bg-primary-soft-hover',
  outline: 'border-border-strong bg-surface text-fg shadow-xs enabled:hover:bg-surface-subtle',
  ghost: 'bg-transparent text-fg-subtle enabled:hover:bg-surface-muted enabled:hover:text-fg',
  danger: 'bg-danger text-fg-inverse shadow-xs enabled:hover:bg-danger-hover',
};

const sizeClass: Record<ButtonSize, string> = {
  xs: 'gap-1 rounded-xs px-2 text-xs',
  sm: 'gap-1.5 rounded-sm px-2.5 text-sm',
  md: 'gap-2 rounded-sm px-3.5 text-md',
  lg: 'gap-2 rounded-md px-4 text-md',
  xl: 'gap-2.5 rounded-md px-5 text-lg',
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
        'inline-flex cursor-pointer items-center justify-center border border-transparent font-medium whitespace-nowrap transition-colors duration-100',
        'disabled:cursor-not-allowed disabled:opacity-50',
        focusRing,
        variantClass[variant],
        controlHeight[size],
        sizeClass[size],
        fullWidth && 'w-full',
        loading && 'disabled:opacity-70',
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
