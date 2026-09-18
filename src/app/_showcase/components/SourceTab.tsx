import Link from 'next/link';
import type { ReactNode } from 'react';
import { PACKAGE_NAME } from '../package-info';
import { getComponentSource } from '../source';
import type { ComponentDoc } from '../types';
import { CodeBlock } from './CodeBlock';

function Step({ n, title, children }: { n: number; title: ReactNode; children?: ReactNode }) {
  return (
    <li className="group/step relative pb-8 pl-10 last:pb-0">
      {/* 단계 번호 + 세로 연결선 */}
      <span className="absolute top-0 left-0 grid size-6 place-items-center rounded-full border border-border-strong bg-surface text-xs font-semibold text-fg-subtle">
        {n}
      </span>
      <span className="absolute top-7 bottom-1 left-3 w-px bg-border group-last/step:hidden" aria-hidden />
      <h3 className="text-md leading-normal font-semibold">{title}</h3>
      {children && <div className="mt-3 flex flex-col gap-3">{children}</div>}
    </li>
  );
}

function H2({ children, description }: { children: string; description?: ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight">{children}</h2>
      {description && <p className="mt-1 text-md text-fg-muted">{description}</p>}
    </div>
  );
}

export function SourceTab({ doc }: { doc: ComponentDoc }) {
  const { files, dependencies } = getComponentSource(doc.name);

  return (
    <div className="flex flex-col gap-12">
      <section>
        <H2 description="버전 관리와 업데이트가 필요하면 패키지로 설치하세요.">npm 으로 설치</H2>
        <ol>
          <Step n={1} title="설치">
            <CodeBlock lang="bash" code={`npm install ${PACKAGE_NAME}`} />
          </Step>
          <Step n={2} title="CSS 설정 (Tailwind v4)">
            <CodeBlock
              lang="css"
              title="app/globals.css"
              code={`@import 'tailwindcss';\n@import '${PACKAGE_NAME}/styles.css';`}
            />
          </Step>
          <Step n={3} title="사용">
            <CodeBlock code={`import { ${doc.name} } from '${PACKAGE_NAME}';`} />
          </Step>
        </ol>
      </section>

      <section>
        <H2 description="프로젝트에 맞게 코드를 직접 고쳐 쓰고 싶다면 아래 파일을 그대로 복사하세요.">
          직접 복사해서 사용
        </H2>
        <ol>
          {dependencies.length > 0 && (
            <Step n={1} title="의존 패키지 설치">
              <CodeBlock lang="bash" code={`npm install ${dependencies.join(' ')}`} />
            </Step>
          )}
          <Step
            n={dependencies.length > 0 ? 2 : 1}
            title={
              <>
                디자인 토큰 추가 —{' '}
                <Link href="/tokens#source" className="font-medium text-accent underline-offset-2 hover:underline">
                  tokens.css 전체 코드
                </Link>
                를 globals.css 에서 import
              </>
            }
          />
          <Step
            n={dependencies.length > 0 ? 3 : 2}
            title={`파일 ${files.length}개 복사 (폴더 구조를 유지하면 import 경로를 고칠 필요가 없습니다)`}
          >
            {files.map((file) => (
              <CodeBlock key={file.path} code={file.code} title={file.path} />
            ))}
          </Step>
        </ol>
      </section>
    </div>
  );
}
