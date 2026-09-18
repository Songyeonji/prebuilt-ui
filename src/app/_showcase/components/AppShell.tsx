'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Badge, Button, Input } from '@shared';
import { cn } from '@shared/utils';

export interface NavItem {
  href: string;
  label: string;
  /** 오른쪽 작은 라벨 (beta 등) */
  tag?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  /** 섹션 제목 옆에 항목 수 표시 */
  showCount?: boolean;
}

interface AppShellProps {
  sections: NavSection[];
  version: string;
  repoUrl: string;
  children: ReactNode;
}

const COLLAPSED_KEY = 'prebuilt-ui:sidebar-collapsed';

/* ─────────────── icons ─────────────── */

const iconProps = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  'aria-hidden': true,
};

const MenuIcon = () => (
  <svg {...iconProps} className="size-4">
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </svg>
);
const CloseIcon = () => (
  <svg {...iconProps} className="size-4">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);
const SearchIcon = () => (
  <svg {...iconProps} className="size-3.5">
    <circle cx="7" cy="7" r="4.25" />
    <path d="M10.25 10.25L13.5 13.5" />
  </svg>
);
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg {...iconProps} strokeWidth={2} className={className}>
    <path d="M6 3.5L10.5 8 6 12.5" strokeLinejoin="round" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

/* ─────────────── pieces ─────────────── */

function Logo({ version }: { version: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-xs">
      <span className="grid size-6 place-items-center rounded-xs bg-primary text-xs font-bold text-fg-inverse">P</span>
      <span className="text-md font-semibold tracking-tight">Prebuilt UI</span>
      <Badge size="sm" className="font-mono">
        v{version}
      </Badge>
    </Link>
  );
}

function SidebarNav({ sections, searchId }: { sections: NavSection[]; searchId: string }) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" 키로 검색창 포커스 (다른 입력 중이 아닐 때, 화면에 보이는 검색창만)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key !== '/' || target.closest('input, textarea, [contenteditable="true"]')) return;
      if (!inputRef.current || inputRef.current.offsetParent === null) return;
      e.preventDefault();
      inputRef.current.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // 접힌 섹션 목록 — localStorage 에 저장해서 새로고침/드로어 간에 유지
  const [collapsed, setCollapsed] = useState<string[]>([]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(COLLAPSED_KEY) ?? '[]');
      if (Array.isArray(saved)) setCollapsed(saved);
    } catch {
      /* 저장소 접근 불가 시 모두 펼친 상태로 */
    }
  }, []);

  const toggle = (title: string) => {
    setCollapsed((prev) => {
      const next = prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title];
      try {
        localStorage.setItem(COLLAPSED_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  };

  // 접힌 섹션 안의 페이지로 이동하면 그 섹션을 자동으로 펼침
  useEffect(() => {
    const owner = sections.find((s) => s.items.some((item) => item.href === pathname));
    if (owner) setCollapsed((prev) => prev.filter((t) => t !== owner.title));
  }, [pathname, sections]);

  const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s) => ({ ...s, items: s.items.filter((item) => item.label.toLowerCase().includes(q)) }))
      .filter((s) => s.items.length > 0);
  }, [sections, query]);

  return (
    <>
      <div className="px-3 pt-4 pb-1">
        <Input
          ref={inputRef}
          id={searchId}
          size="sm"
          fullWidth
          type="search"
          aria-label="컴포넌트 검색"
          placeholder="검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
          leftSection={<SearchIcon />}
          rightSection={
            <kbd className="hidden rounded-xs border border-border bg-surface-subtle px-1.5 font-mono text-2xs text-fg-muted lg:inline-block">
              /
            </kbd>
          }
        />
      </div>

      <nav aria-label="문서" className="flex-1 overflow-y-auto px-3 pt-3 pb-6">
        {filtered.length === 0 && <p className="px-2 pt-3 text-sm text-fg-muted">‘{query}’ 에 맞는 항목이 없습니다.</p>}
        <div className="flex flex-col gap-3">
          {filtered.map((section) => {
            // 검색 중에는 결과가 보이도록 항상 펼침
            const expanded = searching || !collapsed.includes(section.title);
            const listId = `${searchId}-${section.title}`;
            return (
              <div key={section.title}>
                {/* 섹션 제목 = 링크가 아닌 토글 버튼 */}
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={listId}
                  disabled={searching}
                  onClick={() => toggle(section.title)}
                  className={cn(
                    'group flex h-8 w-full cursor-pointer items-center gap-2 rounded-sm px-2 text-sm font-semibold text-fg transition-colors duration-100',
                    'enabled:hover:bg-surface-muted disabled:cursor-default',
                    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent',
                  )}
                >
                  <ChevronIcon
                    className={cn(
                      'size-3 shrink-0 text-fg-muted transition-transform duration-150',
                      expanded && 'rotate-90',
                    )}
                  />
                  <span className="flex-1 text-left">{section.title}</span>
                  {section.showCount && (
                    <span className="rounded-xs bg-surface-muted px-1.5 text-2xs font-medium text-fg-muted tabular-nums group-enabled:group-hover:bg-surface">
                      {section.items.length}
                    </span>
                  )}
                </button>

                {/* 접기/펼치기: grid-rows 0fr ↔ 1fr 로 높이 애니메이션 */}
                <div
                  id={listId}
                  inert={!expanded}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-200 ease-out',
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    {/* 항목은 한 단계 들여쓰고 왼쪽 가이드 라인으로 묶음 */}
                    <ul className="mt-0.5 ml-3.5 flex flex-col gap-0.5 border-l border-border pl-2">
                      {section.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'relative flex h-8 items-center justify-between gap-2 rounded-sm px-2.5 text-md text-fg-muted transition-colors duration-100',
                                'hover:bg-surface-muted hover:text-fg',
                                'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent',
                                active && 'bg-surface-muted font-medium text-fg',
                              )}
                            >
                              {/* 가이드 라인 위에 겹치는 활성 표시 */}
                              {active && (
                                <span className="absolute inset-y-1.5 -left-2.5 w-0.5 rounded-full bg-primary" aria-hidden />
                              )}
                              <span className="truncate">{item.label}</span>
                              {item.tag && (
                                <Badge size="sm" variant="warning" shape="pill" className="shrink-0">
                                  {item.tag}
                                </Badge>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function SidebarFooter({ repoUrl }: { repoUrl: string }) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-xs text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <GitHubIcon />
        GitHub
      </a>
      <span className="text-xs text-fg-muted">React · Tailwind</span>
    </div>
  );
}

/* ─────────────── shell ─────────────── */

export function AppShell({ sections, version, repoUrl, children }: AppShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // 페이지 이동 시 드로어 닫기
  useEffect(() => setOpen(false), [pathname]);

  // 드로어가 열려 있는 동안: ESC 닫기, 배경 스크롤 잠금, 데스크톱 폭이 되면 자동 닫기
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 64rem)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    mq.addEventListener('change', onMq);
    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onMq);
      menuButton?.focus();
    };
  }, [open]);

  return (
    <div className="lg:flex">
      {/* 데스크톱 사이드바 */}
      <aside className="sticky top-0 hidden h-screen w-sidebar shrink-0 flex-col border-r border-border bg-surface-subtle lg:flex">
        <div className="flex h-14 shrink-0 items-center border-b border-border px-4">
          <Logo version={version} />
        </div>
        <SidebarNav sections={sections} searchId="sidebar-search" />
        <SidebarFooter repoUrl={repoUrl} />
      </aside>

      {/* 모바일/태블릿 상단 바 */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-surface/90 px-2 backdrop-blur sm:px-4 lg:hidden">
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="sm"
          className="size-8 px-0"
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
          leftIcon={<MenuIcon />}
        />
        <Logo version={version} />
      </header>

      {/* 모바일 드로어 */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-overlay" onClick={() => setOpen(false)} aria-hidden />
          <aside
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="메뉴"
            className="absolute inset-y-0 left-0 flex w-sidebar max-w-full animate-slide-in flex-col bg-surface shadow-lg"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border pr-2 pl-4">
              <Logo version={version} />
              <Button
                variant="ghost"
                size="sm"
                className="size-8 px-0"
                aria-label="메뉴 닫기"
                onClick={() => setOpen(false)}
                leftIcon={<CloseIcon />}
                autoFocus
              />
            </div>
            <SidebarNav sections={sections} searchId="drawer-search" />
            <SidebarFooter repoUrl={repoUrl} />
          </aside>
        </div>
      )}

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">{children}</main>
    </div>
  );
}
