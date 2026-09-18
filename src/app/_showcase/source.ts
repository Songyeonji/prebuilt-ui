import 'server-only';
import { existsSync, readFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { cache } from 'react';

const SHARED_DIR = join(process.cwd(), 'src/shared');

export interface SourceFile {
  /** src/shared 기준 경로 (components/Button/Button.tsx) */
  path: string;
  code: string;
}

export interface ComponentSource {
  files: SourceFile[];
  /** 복사해서 쓸 때 추가로 설치해야 하는 npm 패키지 (react 제외) */
  dependencies: string[];
}

const read = (rel: string) => readFileSync(join(SHARED_DIR, rel), 'utf8');

function resolveRelative(fromFile: string, spec: string) {
  const base = posix.join(posix.dirname(fromFile), spec);
  const candidates = [base, `${base}.tsx`, `${base}.ts`, `${base}/index.tsx`, `${base}/index.ts`];
  return candidates.find((c) => /\.tsx?$/.test(c) && existsSync(join(SHARED_DIR, c)));
}

/**
 * 컴포넌트 파일에서 시작해 상대 경로 import 를 따라가며 필요한 파일을 모두 모읍니다.
 * (실제 소스 파일을 읽으므로 문서와 코드가 항상 일치)
 */
export const getComponentSource = cache((name: string): ComponentSource => {
  const files: string[] = [];
  const deps = new Set<string>();

  const visit = (rel: string) => {
    if (files.includes(rel)) return;
    files.push(rel);
    for (const [, spec] of read(rel).matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      if (spec.startsWith('.')) {
        const resolved = resolveRelative(rel, spec);
        if (resolved) visit(resolved);
      } else if (!/^react(-dom)?(\/|$)/.test(spec)) {
        deps.add(spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]);
      }
    }
  };

  visit(`components/${name}/${name}.tsx`);
  return { files: files.map((path) => ({ path, code: read(path) })), dependencies: [...deps].sort() };
});

export const getTokensSource = cache(() => read('styles/tokens.css'));
