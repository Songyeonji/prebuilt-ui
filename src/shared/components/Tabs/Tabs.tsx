'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { focusRing } from '../../utils/styles';

export interface TabItem {
  key: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'line' | 'pill';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps {
  items: TabItem[];
  /** 제어 모드: 현재 활성 탭 key */
  activeKey?: string;
  /** 비제어 모드: 초기 활성 탭 key (기본값: 첫 번째 탭) */
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  className?: string;
}

const listClass: Record<TabsVariant, string> = {
  line: 'flex gap-4 border-b border-border',
  pill: 'inline-flex gap-0.5 rounded-md border border-border bg-surface-muted p-0.5',
};

const tabClass: Record<TabsVariant, { base: string; active: string }> = {
  line: {
    base: '-mb-px border-b-2 border-transparent',
    active: 'border-primary text-fg',
  },
  pill: {
    base: 'rounded-sm',
    active: 'bg-surface text-fg shadow-sm',
  },
};

const sizeClass: Record<TabsVariant, Record<TabsSize, string>> = {
  line: {
    sm: 'py-2 text-sm',
    md: 'py-2.5 text-md',
    lg: 'py-3 text-lg',
  },
  pill: {
    sm: 'h-7 px-2.5 text-sm',
    md: 'h-8 px-3 text-md',
    lg: 'h-9 px-3.5 text-md',
  },
};

export function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant = 'line',
  size = 'md',
  className,
}: TabsProps) {
  const baseId = useId();
  const [innerKey, setInnerKey] = useState(defaultActiveKey ?? items[0]?.key);
  const currentKey = activeKey ?? innerKey;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (key: string) => {
    if (activeKey === undefined) setInnerKey(key);
    onChange?.(key);
  };

  // 좌우 화살표 / Home / End 로 탭 이동 (WAI-ARIA Tabs 패턴)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.map((item, i) => ({ item, i })).filter(({ item }) => !item.disabled);
    const pos = enabled.findIndex(({ item }) => item.key === currentKey);
    let next: number | undefined;
    if (e.key === 'ArrowRight') next = (pos + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') next = (pos - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    const target = enabled[next];
    select(target.item.key);
    tabRefs.current[target.i]?.focus();
  };

  const active = items.find((item) => item.key === currentKey);

  return (
    <div className={className}>
      <div className={listClass[variant]} role="tablist" onKeyDown={handleKeyDown}>
        {items.map((item, i) => {
          const selected = item.key === currentKey;
          return (
            <button
              key={item.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={cn(
                'cursor-pointer font-medium text-fg-muted transition-colors duration-100 enabled:hover:text-fg',
                'disabled:cursor-not-allowed disabled:opacity-40',
                focusRing,
                tabClass[variant].base,
                sizeClass[variant][size],
                selected && tabClass[variant].active,
              )}
              onClick={() => select(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {active && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active.key}`}
          aria-labelledby={`${baseId}-tab-${active.key}`}
          className="pt-5"
        >
          {active.content}
        </div>
      )}
    </div>
  );
}
