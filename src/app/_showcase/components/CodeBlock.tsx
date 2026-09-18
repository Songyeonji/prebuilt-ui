import { cn } from '@shared/utils';
import { highlight, type CodeLang } from '../highlight';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  lang?: CodeLang;
  /** 헤더에 언어 대신 표시할 이름 (예: 파일명) */
  title?: string;
  /** 카드 안에 붙여 넣을 때: 바깥 테두리/모서리 제거 */
  flush?: boolean;
  className?: string;
}

/**
 * GitHub 마크다운 코드 블록 스타일.
 * 하이라이팅은 서버(빌드 시)에서 끝나므로 브라우저에는 색칠된 HTML 만 전달됩니다.
 */
export async function CodeBlock({ code, lang = 'tsx', title, flush = false, className }: CodeBlockProps) {
  const source = code.trim();
  const html = await highlight(source, lang);

  return (
    <div
      className={cn(
        'overflow-hidden bg-syntax-bg',
        flush ? 'border-t border-border' : 'rounded-md border border-border',
        className,
      )}
    >
      <div className="flex h-9 items-center justify-between border-b border-border pr-1.5 pl-4">
        <span className="font-mono text-xs text-fg-muted">{title ?? lang}</span>
        <CopyButton text={source} />
      </div>
      <div
        className={cn(
          'overflow-x-auto font-mono text-sm leading-relaxed',
          '[&_pre]:w-fit [&_pre]:min-w-full [&_pre]:px-4 [&_pre]:py-3.5 [&_pre]:outline-none',
          '[&_pre]:focus-visible:outline-2 [&_pre]:focus-visible:-outline-offset-2 [&_pre]:focus-visible:outline-accent',
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
