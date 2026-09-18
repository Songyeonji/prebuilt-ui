import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { PACKAGE_VERSION } from './_showcase/package-info';
import { AppShell, type NavSection } from './_showcase/components/AppShell';
import { componentDocs } from './_showcase/registry';
import './globals.css';

// Pretendard 가변 폰트를 셀프 호스팅 (외부 CDN 요청 없음). tokens.css 의 --font-sans 가 이 변수를 참조합니다.
const pretendard = localFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  weight: '45 920',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: { default: 'Prebuilt UI', template: '%s · Prebuilt UI' },
  description: '직접 만드는 React 공통 컴포넌트 라이브러리',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

const REPO_URL = 'https://github.com/Songyeonji/prebuilt-ui';

const sections: NavSection[] = [
  {
    title: '시작하기',
    items: [
      { href: '/', label: '소개' },
      { href: '/tokens', label: '디자인 토큰' },
    ],
  },
  {
    title: 'Components',
    showCount: true,
    items: componentDocs.map((doc) => ({
      href: `/components/${doc.slug}`,
      label: doc.name,
      tag: doc.status === 'stable' ? undefined : doc.status,
    })),
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="min-h-screen bg-surface font-sans text-fg antialiased">
        <AppShell sections={sections} version={PACKAGE_VERSION} repoUrl={REPO_URL}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
