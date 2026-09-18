import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'solid';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'square' | 'pill';

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** square: 각진 라벨(기본) / pill: 알약 모양 */
  shape?: BadgeShape;
  /** 텍스트 앞에 상태 점을 표시합니다. */
  dot?: boolean;
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: 'border-border bg-surface-subtle text-fg-subtle',
  accent: 'border-accent/20 bg-accent-soft text-accent',
  success: 'border-success/20 bg-success-soft text-success',
  warning: 'border-warning/20 bg-warning-soft text-warning',
  danger: 'border-danger/20 bg-danger-soft text-danger',
  solid: 'border-primary bg-primary text-fg-inverse',
};

const sizeClass: Record<BadgeSize, string> = {
  sm: 'h-5 gap-1 px-1.5 text-2xs',
  md: 'h-6 gap-1.5 px-2 text-xs',
  lg: 'h-7 gap-1.5 px-2.5 text-sm',
};

export function Badge({
  variant = 'neutral',
  size = 'md',
  shape = 'square',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border font-medium whitespace-nowrap',
        shape === 'pill' ? 'rounded-full' : 'rounded-xs',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...rest}
    >
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
