import type { ReactNode } from 'react';

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ExampleDoc {
  title: string;
  description?: string;
  /** 미리보기 렌더 함수 (서버에서 실행됨 — 상태가 필요하면 demos/ 의 클라이언트 컴포넌트 사용) */
  render: () => ReactNode;
  /** 화면에 보여줄 코드 */
  code: string;
}

export interface ComponentDoc {
  name: string;
  /** URL 경로에 사용 (/components/button) */
  slug: string;
  status: 'stable' | 'beta' | 'draft';
  /** 한 줄 요약 */
  summary: string;

  // ── 설명 탭 ──
  /** 언제 사용하는지 */
  whenToUse: string[];
  guidelines?: { do: string[]; dont: string[] };
  usage: string;
  props: PropDoc[];

  // ── 디자인 탭 ──
  examples: ExampleDoc[];
  /** 컴포넌트가 참조하는 디자인 토큰 이름 (tokens.css 의 변수명, 예: '--color-primary') */
  tokens?: string[];
}
