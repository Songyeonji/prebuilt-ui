'use client';

import { useId, useState, type ReactNode } from 'react';

interface ExampleCardProps {
  title: string;
  description?: string;
  /** 서버에서 하이라이팅까지 끝난 코드 블록 */
  codeBlock: ReactNode;
  /** 미리보기 (서버에서 렌더된 결과) */
  children: ReactNode;
}

export function ExampleCard({ title, description, codeBlock, children }: ExampleCardProps) {
  const [showCode, setShowCode] = useState(false);
  const codeId = useId();

  return (
    <section className="overflow-hidden rounded-md border border-border">
      <header className="flex items-start justify-between gap-4 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-md font-semibold">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-fg-muted">{description}</p>}
        </div>
        <button
          type="button"
          aria-expanded={showCode}
          aria-controls={codeId}
          onClick={() => setShowCode((v) => !v)}
          className="shrink-0 cursor-pointer rounded-xs text-sm font-medium text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {showCode ? '코드 숨기기' : '코드 보기'}
        </button>
      </header>
      <div className="flex flex-wrap items-center gap-3 bg-surface px-4 py-8 sm:px-6 sm:py-10">{children}</div>
      <div id={codeId} hidden={!showCode}>
        {codeBlock}
      </div>
    </section>
  );
}
