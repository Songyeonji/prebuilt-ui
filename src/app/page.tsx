import Link from 'next/link';
import { Badge } from '@shared';
import { CodeBlock } from './_showcase/components/CodeBlock';
import { componentDocs } from './_showcase/registry';

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-8 sm:gap-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Prebuilt UI</h1>
        <p className="mt-2 text-md leading-relaxed text-fg-muted sm:text-lg">
          직접 만들어 쓰는 React 공통 컴포넌트 모음입니다. 모든 스타일은 Tailwind 유틸리티와{' '}
          <Link href="/tokens" className="font-medium text-accent underline-offset-2 hover:underline">
            디자인 토큰
          </Link>
          으로만 작성합니다.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">사용법</h2>
        <CodeBlock
          code={`
import { Button, Input } from '@shared';

export default function Page() {
  return <Button variant="primary">저장하기</Button>;
}`}
        />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">컴포넌트 ({componentDocs.length})</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {componentDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/components/${doc.slug}`}
              className="rounded-md border border-border p-4 transition-colors hover:border-border-strong hover:bg-surface-subtle"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-md font-semibold">{doc.name}</span>
                <Badge size="sm" variant={doc.status === 'stable' ? 'success' : 'warning'} shape="pill">
                  {doc.status}
                </Badge>
              </div>
              <p className="mt-1.5 text-md leading-relaxed text-fg-muted">{doc.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
