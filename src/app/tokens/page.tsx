import type { Metadata } from 'next';
import { TokenTable } from '../_showcase/components/TokenTable';
import { getDesignTokens, groupTokens } from '../_showcase/tokens';

export const metadata: Metadata = { title: '디자인 토큰' };

export default function TokensPage() {
  const groups = groupTokens(getDesignTokens());

  return (
    <div className="mx-auto flex max-w-230 flex-col gap-10">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">디자인 토큰</h1>
        <p className="mt-2 text-base leading-relaxed text-fg-muted">
          모든 토큰은 <code className="font-mono text-[13px] font-semibold">src/shared/styles/tokens.css</code> 한
          곳에서 관리됩니다. 이 페이지는 그 파일을 읽어 자동으로 생성됩니다. Tailwind 기본 색상 팔레트는 꺼져 있어서,
          여기에 없는 색은 사용할 수 없습니다.
        </p>
      </header>

      {groups.map(([group, tokens]) => (
        <section key={group}>
          <h2 className="mb-3 text-lg font-bold">{group}</h2>
          <TokenTable tokens={tokens} />
        </section>
      ))}
    </div>
  );
}
