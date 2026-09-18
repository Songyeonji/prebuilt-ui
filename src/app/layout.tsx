import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SidebarNav, type NavSection } from './_showcase/components/SidebarNav';
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
    items: componentDocs.map((doc) => ({ href: `/components/${doc.slug}`, label: doc.name })),
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="bg-surface font-sans text-fg antialiased">
        <div className="flex min-h-screen flex-col md:flex-row">
          <aside className="border-b border-border bg-surface-subtle p-4 md:sticky md:top-0 md:h-screen md:w-sidebar md:shrink-0 md:overflow-y-auto md:border-r md:border-b-0 md:px-4 md:py-6">
            <Link href="/" className="mb-3 flex items-center gap-2 px-2 text-lg font-extrabold md:mb-0">
              <span className="grid size-7 place-items-center rounded-md bg-primary text-md text-fg-inverse">P</span>
              Prebuilt UI
            </Link>
            <SidebarNav sections={sections} />
          </aside>
          <main className="min-w-0 flex-1 px-4 pt-6 pb-12 md:px-8 md:pt-12 md:pb-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
