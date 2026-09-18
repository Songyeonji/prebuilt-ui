'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@shared';

export interface NavSection {
  title: string;
  items: Array<{ href: string; label: string }>;
}

export function SidebarNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 overflow-x-auto md:flex-col md:gap-0">
      {sections.map((section) => (
        <div key={section.title} className="flex gap-0.5 md:flex-col">
          <p className="mt-8 mb-2 hidden px-2 text-xs font-bold tracking-wide text-fg-muted uppercase md:block">
            {section.title}
          </p>
          {section.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-sm px-3 py-2 text-md font-medium whitespace-nowrap text-fg-subtle hover:bg-surface-muted',
                  active && 'bg-primary-soft font-bold text-primary hover:bg-primary-soft',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
