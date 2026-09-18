# @songyeonji/prebuilt-ui

React + Tailwind CSS v4 공통 컴포넌트 라이브러리.
모든 스타일은 **디자인 토큰**(`tokens.css`) 기반의 Tailwind 유틸리티로 작성되어 있습니다.

📖 문서 · 예제 · 전체 코드: **https://prebuilt-ui.vercel.app**

## 설치

```bash
npm install @songyeonji/prebuilt-ui
```

요구 사항: `react` 18.3+ 또는 19, `tailwindcss` v4

## 설정

앱의 전역 CSS 에서 Tailwind 다음에 패키지 스타일을 import 합니다.

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@songyeonji/prebuilt-ui/styles.css';
```

`styles.css` 한 줄로 두 가지가 처리됩니다.

1. 디자인 토큰 등록 — `bg-primary`, `text-md`, `rounded-md` 같은 클래스 사용 가능
2. Tailwind 가 이 패키지의 컴포넌트 클래스를 스캔 (`@source`)

> ⚠️ 토큰 파일은 Tailwind 의 기본 색상·폰트 크기·간격을 **제거**하고 토큰 값으로 대체합니다.
> 앱에서도 `bg-blue-500`, `text-base`, `p-4.5` 같은 기본 클래스 대신 토큰 클래스를 사용하세요.
> 토큰만 쓰고 Tailwind 기본값을 유지하고 싶다면 `tokens.css` 를 복사해서 `--*: initial` 줄을 지우고 사용하세요.

### 폰트 (권장)

`--font-sans` 는 `--font-pretendard` 변수 → `Pretendard Variable` → 시스템 폰트 순으로 사용합니다.

```tsx
// Next.js 예시
import localFont from 'next/font/local';
const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  variable: '--font-pretendard',
});
// <html className={pretendard.variable}>
```

## 사용

```tsx
import { Button, Input, Modal } from '@songyeonji/prebuilt-ui';
import { cn } from '@songyeonji/prebuilt-ui/utils';

<Button variant="primary" size="md">저장하기</Button>
<Input label="이메일" size="md" placeholder="name@example.com" />
```

| 진입점 | 내용 | 비고 |
| --- | --- | --- |
| `@songyeonji/prebuilt-ui` | 컴포넌트 (`Button` `Input` `Badge` `Tabs` `Modal`) + 타입 | `'use client'` — Next.js App Router 서버 컴포넌트에서 바로 렌더 가능 |
| `@songyeonji/prebuilt-ui/utils` | `cn()` (clsx + tailwind-merge) | 서버/클라이언트 어디서나 사용 |
| `@songyeonji/prebuilt-ui/styles.css` | 토큰 + 클래스 스캔 | 앱 CSS 에서 import |
| `@songyeonji/prebuilt-ui/tokens.css` | 토큰만 | 스캔 경로를 직접 지정하고 싶을 때 |

## 컴포넌트

| 컴포넌트 | 주요 props |
| --- | --- |
| `Button` | `variant` primary · secondary · outline · ghost · danger / `size` xs–xl / `loading` `leftIcon` `rightIcon` `fullWidth` |
| `Input` | `label` `helperText` `error` / `size` xs–xl (Button 과 같은 높이) / `leftSection` `rightSection` |
| `Badge` | `variant` neutral · accent · success · warning · danger · solid / `size` sm–lg / `shape` square · pill / `dot` |
| `Tabs` | `items` / `variant` line · pill / `size` sm–lg / 제어·비제어 모드, 키보드 이동 |
| `Modal` | `open` `onClose` `title` `footer` / `size` sm · md · lg · xl · full / ESC·바깥 클릭 닫기 |

자세한 props, 디자인 예제, 사용 토큰은 [문서 사이트](https://prebuilt-ui.vercel.app)를 참고하세요.

## 설치 없이 복사해서 쓰기

문서 사이트의 각 컴포넌트 **코드** 탭에서 컴포넌트 파일과 필요한 유틸 파일 전문을 복사할 수 있습니다.
`/tokens` 페이지에서 `tokens.css` 전문도 제공합니다.

## License

MIT
