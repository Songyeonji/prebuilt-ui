import type { Metadata } from 'next';
import { TokenTable } from '../_showcase/components/TokenTable';
import { getDesignTokens, groupTokens } from '../_showcase/tokens';

export const metadata: Metadata = { title: '디자인 토큰' };

export default function TokensPage() {
  const groups = groupTokens(getDesignTokens());

  return (
    <div className="mx-auto flex max-w-content flex-col gap-10">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight">디자인 토큰</h1>
        <p className="mt-2 text-lg leading-relaxed text-fg-muted">
          모든 토큰은 <code className="font-mono text-sm font-semibold">src/shared/styles/tokens.css</code> 한
          곳에서 관리됩니다. 이 페이지는 그 파일을 읽어 자동으로 생성됩니다. Tailwind 기본값(색상·폰트 크기·간격 등)은 모두 꺼져 있어서,
          여기에 없는 값은 사용할 수 없습니다. 폰트는 Pretendard 입니다.
        </p>
      </header>

      {groups.map(([group, tokens]) => (
        <section key={group}>
          <h2 className="mb-3 text-xl font-bold">{group}</h2>
          <TokenTable tokens={tokens} />
        </section>
      ))}
    </div>
  );
}
