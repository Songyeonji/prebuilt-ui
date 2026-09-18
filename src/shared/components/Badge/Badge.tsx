import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** 텍스트 앞에 상태 점을 표시합니다. */
  dot?: boolean;
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-muted text-fg-subtle',
  primary: 'bg-primary-soft text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
};

const sizeClass: Record<BadgeSize, string> = {
  sm: 'h-5 px-2 text-2xs',
  md: 'h-6 px-2.5 text-xs',
};

export function Badge({ variant = 'neutral', size = 'md', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full font-semibold leading-none',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...rest}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
