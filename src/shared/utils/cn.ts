import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * className 조합 유틸.
 * 조건부 클래스(clsx) + Tailwind 충돌 정리(twMerge) — 뒤에 오는 클래스가 우선합니다.
 * 예) cn('px-4 bg-primary', className)  // className 에 bg-danger 가 있으면 bg-danger 적용
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
