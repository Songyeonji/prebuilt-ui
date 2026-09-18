/** 컴포넌트 간 공통으로 쓰는 Tailwind 클래스 조각 */

/** 키보드 포커스: 번지는 glow 대신 2px 아웃라인 */
export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/** 폼 컨트롤(Button, Input) 공통 높이 — 나란히 놓았을 때 높이가 맞도록 */
export type ControlSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const controlHeight: Record<ControlSize, string> = {
  xs: 'h-7',
  sm: 'h-8',
  md: 'h-9',
  lg: 'h-10',
  xl: 'h-12',
};
