'use client';

import { useState, type ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

interface ExampleCardProps {
  title: string;
  description?: string;
  code: string;
  /** 미리보기 (서버에서 렌더된 결과) */
  children: ReactNode;
}

export function ExampleCard({ title, description, code, children }: ExampleCardProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="overflow-hidden rounded-lg border border-border">
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          {description && <p className="mt-1 text-md text-fg-muted">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => setShowCode((v) => !v)}
          className="shrink-0 cursor-pointer text-md font-semibold text-primary hover:underline"
        >
          {showCode ? '코드 숨기기' : '코드 보기'}
        </button>
      </header>
      <div className="flex flex-wrap items-start gap-3 bg-surface bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[16px_16px] px-5 py-8">
        {children}
      </div>
      {showCode && <CodeBlock code={code} className="rounded-none" />}
    </section>
  );
}
