import 'server-only';
import { createHighlighterCore, type HighlighterCore, type ThemeRegistration } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export type CodeLang = 'tsx' | 'bash' | 'css';

const v = (name: string) => `var(--color-syntax-${name})`;

/**
 * 코드 하이라이팅 테마 — 색상 값은 tokens.css 의 --color-syntax-* 를 참조합니다.
 * (색을 바꾸려면 tokens.css 만 수정)
 */
const theme: ThemeRegistration = {
  name: 'prebuilt',
  type: 'light',
  colors: {
    'editor.foreground': v('fg'),
    'editor.background': v('bg'),
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: v('comment') } },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.operator',
        'keyword.control',
        'punctuation.section.embedded',
      ],
      settings: { foreground: v('keyword') },
    },
    { scope: ['keyword.operator.accessor', 'punctuation.accessor'], settings: { foreground: v('fg') } },
    {
      scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'],
      settings: { foreground: v('string') },
    },
    {
      scope: ['entity.name.tag', 'support.class.component', 'entity.name.tag.tsx'],
      settings: { foreground: v('tag') },
    },
    { scope: ['entity.other.attribute-name'], settings: { foreground: v('attribute') } },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'],
      settings: { foreground: v('function') },
    },
    {
      scope: [
        'constant',
        'constant.numeric',
        'constant.language',
        'support.constant',
        'variable.other.constant',
        'variable.other.enummember',
        'support.type.property-name',
        'meta.object-literal.key',
      ],
      settings: { foreground: v('constant') },
    },
    {
      scope: ['entity.name.type', 'support.type', 'variable.parameter', 'entity.other.inherited-class'],
      settings: { foreground: v('type') },
    },
    // bash: npm install 의 "npm"
    { scope: ['entity.name.command', 'support.function.builtin.shell'], settings: { foreground: v('function') } },
  ],
};

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [theme],
    langs: [import('@shikijs/langs/tsx'), import('@shikijs/langs/bash'), import('@shikijs/langs/css')],
    // wasm 없이 동작하는 JS 정규식 엔진 (서버/빌드 환경 호환성)
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

/** 코드를 하이라이팅된 HTML(<pre class="shiki">…)로 변환 — 빌드/서버에서만 실행 */
export async function highlight(code: string, lang: CodeLang) {
  const h = await getHighlighter();
  return h.codeToHtml(code, { lang, theme: 'prebuilt' });
}
