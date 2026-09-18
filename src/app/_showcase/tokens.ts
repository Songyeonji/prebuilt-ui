import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';

export interface DesignToken {
  group: string;
  /** CSS 변수명 (--color-primary) */
  name: string;
  value: string;
  /** 대표 Tailwind 유틸리티 (bg-primary) */
  utility: string;
}

const TOKENS_FILE = join(process.cwd(), 'src/shared/styles/tokens.css');

const utilityPrefix: Array<[string, string]> = [
  ['--color-', 'bg-'],
  ['--radius-', 'rounded-'],
  ['--shadow-', 'shadow-'],
  ['--font-', 'font-'],
  ['--animate-', 'animate-'],
];

function toUtility(name: string) {
  const match = utilityPrefix.find(([prefix]) => name.startsWith(prefix));
  return match ? match[1] + name.slice(match[0].length) : name;
}

/**
 * tokens.css 를 직접 파싱합니다 — 토큰의 단일 출처는 CSS 파일이고, 쇼케이스는 그걸 읽어서 보여주기만 합니다.
 * "@group 이름" 주석으로 그룹을 나눕니다.
 */
export const getDesignTokens = cache((): DesignToken[] => {
  const source = readFileSync(TOKENS_FILE, 'utf8');
  const tokens: DesignToken[] = [];
  let group = 'Etc';

  for (const line of source.split(/\r?\n/)) {
    const groupMatch = line.match(/\/\*\s*@group\s+(.+?)\s*\*\//);
    if (groupMatch) {
      group = groupMatch[1];
      continue;
    }
    const tokenMatch = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);\s*$/);
    if (!tokenMatch || tokenMatch[1].includes('*')) continue;
    const [, name, value] = tokenMatch;
    tokens.push({ group, name, value, utility: toUtility(name) });
  }
  return tokens;
});

export function groupTokens(tokens: DesignToken[]) {
  const groups = new Map<string, DesignToken[]>();
  for (const token of tokens) {
    groups.set(token.group, [...(groups.get(token.group) ?? []), token]);
  }
  return [...groups.entries()];
}
