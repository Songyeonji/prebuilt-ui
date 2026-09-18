import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { defineConfig, type Options } from 'tsup';

// 두 빌드가 병렬로 돌기 때문에 clean 은 여기서 한 번만
rmSync('dist', { recursive: true, force: true });

const shared: Options = {
  format: ['esm'],
  target: 'es2022',
  dts: true,
  sourcemap: true,
  clean: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
};

export default defineConfig([
  {
    // 컴포넌트: 훅/이벤트를 쓰므로 번들 전체를 클라이언트 컴포넌트로 표시 (Next.js App Router 호환)
    ...shared,
    entry: { index: 'index.ts' },
    banner: { js: "'use client';" },
  },
  {
    // 유틸: 서버 컴포넌트에서도 호출할 수 있도록 'use client' 없이 분리
    ...shared,
    entry: { utils: 'utils/index.ts' },
    async onSuccess() {
      mkdirSync('dist', { recursive: true });
      copyFileSync('styles/tokens.css', 'dist/tokens.css');
      // 사용하는 쪽에서 이 파일 하나만 import 하면
      // 1) 디자인 토큰이 등록되고 2) Tailwind 가 이 패키지의 클래스를 스캔합니다.
      writeFileSync(
        'dist/styles.css',
        [
          '/* @songyeonji/prebuilt-ui — app 의 CSS 에서 `@import "tailwindcss";` 다음에 import 하세요. */',
          "@import './tokens.css';",
          "@source './';",
          '',
        ].join('\n'),
      );
    },
  },
]);
