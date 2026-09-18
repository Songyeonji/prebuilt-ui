import type { Metadata } from 'next';
import { CodeBlock } from '../_showcase/components/CodeBlock';
import { TokenTable } from '../_showcase/components/TokenTable';
import { PACKAGE_NAME } from '../_showcase/package-info';
import { getTokensSource } from '../_showcase/source';
import { getDesignTokens, groupTokens } from '../_showcase/tokens';

export const metadata: Metadata = { title: '디자인 토큰' };

export default function TokensPage() {
  const groups = groupTokens(getDesignTokens());

  return (
    <div className="mx-auto flex max-w-content flex-col gap-8 sm:gap-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">디자인 토큰</h1>
        <p className="mt-2 text-md leading-relaxed text-fg-muted sm:text-lg">
          모든 토큰은 <code className="font-mono text-sm font-semibold">src/shared/styles/tokens.css</code> 한
          곳에서 관리됩니다. 이 페이지는 그 파일을 읽어 자동으로 생성됩니다. Tailwind 기본값(색상·폰트 크기·간격 등)은 모두 꺼져 있어서,
          여기에 없는 값은 사용할 수 없습니다. 폰트는 Pretendard 입니다.
        </p>
      </header>

      <section id="source" className="scroll-mt-20">
        <h2 className="mb-1 text-lg font-semibold tracking-tight">tokens.css 전체 코드</h2>
        <p className="mb-4 text-md leading-relaxed text-fg-muted">
          npm 패키지를 쓴다면 <code className="font-mono text-sm">{`${PACKAGE_NAME}/styles.css`}</code> 에 이미
          포함되어 있습니다. 코드를 직접 복사해서 쓸 때만 이 파일을 프로젝트에 추가하고,{' '}
          <code className="font-mono text-sm">@import &apos;tailwindcss&apos;;</code> 다음 줄에서 import 하세요.
        </p>
        <details className="group">
          <summary className="flex h-10 w-fit cursor-pointer list-none items-center gap-2 rounded-sm border border-border px-3 text-md font-medium text-fg-subtle transition-colors hover:bg-surface-subtle [&::-webkit-details-marker]:hidden">
            <span className="text-xs text-fg-muted transition-transform group-open:rotate-90" aria-hidden>
              ▶
            </span>
            <span className="group-open:hidden">전체 코드 펼치기</span>
            <span className="hidden group-open:inline">접기</span>
          </summary>
          <div className="mt-3">
            <CodeBlock lang="css" title="styles/tokens.css" code={getTokensSource()} />
          </div>
        </details>
      </section>

      {groups.map(([group, tokens]) => (
        <section key={group}>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">{group}</h2>
          <TokenTable tokens={tokens} />
        </section>
      ))}
    </div>
  );
}
