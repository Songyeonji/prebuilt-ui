'use client';

import { useState } from 'react';
import { cn } from '@shared/utils';

const iconProps = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'size-3.5',
  'aria-hidden': true,
};

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard 권한이 없으면 무시 */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? '복사됨' : '코드 복사'}
      className={cn(
        'flex h-6 cursor-pointer items-center gap-1.5 rounded-xs px-1.5 text-xs text-fg-muted transition-colors',
        'hover:bg-surface-muted hover:text-fg',
        'focus-visible:outline-2 focus-visible:outline-accent',
        copied && 'text-success hover:text-success',
        className,
      )}
    >
      {copied ? (
        <svg {...iconProps}>
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      ) : (
        <svg {...iconProps}>
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V4a1.5 1.5 0 00-1.5-1.5H4A1.5 1.5 0 002.5 4v5A1.5 1.5 0 004 10.5h1.5" />
        </svg>
      )}
      {copied ? '복사됨' : '복사'}
    </button>
  );
}
