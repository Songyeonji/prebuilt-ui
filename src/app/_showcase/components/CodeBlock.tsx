'use client';

import { useState } from 'react';
import { cn } from '@shared';

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard 권한이 없으면 무시 */
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={copy}
        className="absolute top-2 right-2 cursor-pointer rounded-sm border border-code-border bg-code px-2 py-1 text-xs text-code-fg hover:text-fg-inverse"
      >
        {copied ? '복사됨' : '복사'}
      </button>
      <pre
        className={cn(
          'overflow-x-auto rounded-md bg-code px-5 py-4 font-mono text-[13px] leading-relaxed text-code-fg',
          className,
        )}
      >
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
