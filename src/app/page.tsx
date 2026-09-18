import Link from 'next/link';
import { Badge } from '@shared';
import { CodeBlock } from './_showcase/components/CodeBlock';
import { PACKAGE_NAME } from './_showcase/package-info';
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
          으로만 작성합니다. npm 패키지로 설치하거나, 각 컴포넌트의 <b className="font-medium text-fg">코드</b> 탭에서
          전체 코드를 복사해 쓸 수 있습니다.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">설치</h2>
        <CodeBlock lang="bash" code={`npm install ${PACKAGE_NAME}`} />
        <CodeBlock
          lang="css"
          title="app/globals.css"
          code={`@import 'tailwindcss';\n@import '${PACKAGE_NAME}/styles.css'; /* 디자인 토큰 + 클래스 스캔 */`}
        />
        <CodeBlock
          title="app/page.tsx"
          code={`
import { Button, Input } from '${PACKAGE_NAME}';
import { cn } from '${PACKAGE_NAME}/utils'; // 서버 컴포넌트에서도 사용 가능

export default function Page() {
  return <Button variant="primary">저장하기</Button>;
}`}
        />
        <p className="text-sm text-fg-muted">
          요구 사항: React 18.3+ / 19, Tailwind CSS v4. 폰트는 Pretendard 를 권장합니다 (
          <code className="font-mono">--font-sans</code> 토큰).
        </p>
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
