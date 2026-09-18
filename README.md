# Prebuilt UI

직접 만들어 쓰는 React 공통 컴포넌트 모음입니다. Next.js(App Router) + TypeScript + Tailwind CSS v4.
`src/shared` 가 라이브러리 본체이고, `src/app` 은 그 컴포넌트를 보여주는 문서(쇼케이스) 사이트입니다.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 타입 체크 + 빌드
```

## 구조

```
src/
├─ shared/                        ← 공통 컴포넌트 (라이브러리)
│  ├─ index.ts                    ← 진입점: import { Button } from '@shared'
│  ├─ styles/tokens.css           ← ★ 디자인 토큰 (유일한 스타일 파일, Tailwind @theme)
│  ├─ utils/cn.ts                 ← clsx + tailwind-merge
│  └─ components/Button|Input|Badge|Tabs|Modal/
└─ app/                           ← Next.js App Router (쇼케이스)
   ├─ globals.css                 ← tailwindcss + tokens.css import 만
   ├─ layout.tsx                  ← 사이드바
   ├─ page.tsx                    ← /           소개
   ├─ tokens/page.tsx             ← /tokens     토큰 목록 (tokens.css 를 읽어 자동 생성)
   ├─ components/[slug]/page.tsx  ← /components/button  설명 / 디자인 탭
   └─ _showcase/                  ← 라우트가 아닌 쇼케이스 내부 코드 (_ 로 시작하면 라우팅 제외)
      ├─ docs/*.doc.tsx           ← 컴포넌트별 문서
      ├─ demos/                   ← 상태가 필요한 예제 (client component)
      ├─ registry.ts              ← 문서 등록
      └─ components/
```

## 디자인 토큰

`src/shared/styles/tokens.css` **한 곳에서만** 관리합니다.

```css
@theme static {
  --color-*: initial;          /* Tailwind 기본값 제거 → 토큰에 없는 값은 사용 불가 */
  --text-*: initial;
  --spacing: initial;
  ...
  /* @group Brand */
  --color-primary: #18181b;    /* → bg-primary, text-primary, border-primary ... */
  /* @group Font Size */
  --text-md: 14px;             /* → text-md */
  --text-md--line-height: 20px;
  /* @group Spacing */
  --spacing-4: 16px;           /* → p-4, gap-4, h-4, size-4 ... */
  --spacing-1_5: 6px;          /* → p-1.5  (소수 키는 _ 로 작성) */
  /* @group Container */
  --container-content: 920px;  /* → max-w-content, w-content */
}
```

| 그룹 | 예시 클래스 |
| --- | --- |
| Color | `bg-primary`(잉크) `text-accent`(포인트) `text-fg-muted` `border-border` |
| Font Family | `font-sans` (Pretendard) `font-mono` |
| Font Size | `text-2xs`(11) `text-xs`(12) `text-sm`(13) `text-md`(14) `text-lg`(16) `text-xl`(18) `text-2xl`(20) `text-3xl`(24) `text-4xl`(32) |
| Font Weight | `font-regular` `font-medium` `font-semibold` `font-bold` `font-extrabold` |
| Line Height / Letter Spacing | `leading-tight/normal/relaxed` `tracking-tight/normal/wide` |
| Spacing (4px 그리드) | `0` `0.5` `1` `1.5` `2` `2.5` `3` `3.5` `4` `5` `6` `7` `8` `9` `10` `12` `16` `20` |
| Container | `max-w-field` `w-sidebar` `max-w-modal-sm/md/lg/xl` `max-w-content` |
| Radius / Shadow | `rounded-xs/sm/md/lg` `shadow-xs/sm/md/lg` |

- 폰트는 **Pretendard** 가변 폰트(`pretendard` npm 패키지)를 `next/font/local` 로 셀프 호스팅합니다 (`app/layout.tsx`).
- 토큰을 추가하면 바로 Tailwind 유틸리티로 쓸 수 있고, `/tokens` 페이지에 자동으로 나타납니다.
- ⚠️ 토큰에 없는 클래스(`text-base`, `p-4.5`, `bg-blue-500` 등)는 Tailwind 가 **에러 없이 무시**합니다. 스타일이 안 먹으면 `/tokens` 에 있는 값인지 먼저 확인하세요.
- `/* @group 이름 */` 주석으로 `/tokens` 페이지의 그룹을 나눕니다.
- 컴포넌트에는 `.css` 파일을 만들지 않고 Tailwind 클래스만 사용합니다.

## 새 컴포넌트 추가하기

1. `src/shared/components/Foo/Foo.tsx`, `index.ts` 생성
   - 상태/이벤트가 있으면 파일 맨 위에 `'use client'`
   - variant/size 는 `Record<Variant, string>` 으로 클래스 매핑, 최종 조합은 `cn()`
2. `src/shared/index.ts` 에 `export * from './components/Foo';` 추가
3. `src/app/_showcase/docs/Foo.doc.tsx` 작성 후 `registry.ts` 에 등록 → 사이드바와 `/components/foo` 페이지 생성

## 자동화 (GitHub Actions)

| 워크플로 | 트리거 | 동작 |
| --- | --- | --- |
| `issue-branch.yml` | 이슈 생성 | `feature/12-title` 브랜치 생성 + 이슈에 댓글 (라벨 `bug`→`fix/`, `docs`→`docs/`, `refactor`→`refactor/`) |
| `ci.yml` | main 대상 PR | `npm run build` 통과 확인 |
| `deploy.yml` | main 에 push | 빌드(타입 체크 포함) → Vercel Production 배포 |

### Vercel 배포 설정 (최초 1회)

1. 로컬에서 `npx vercel link` → 생성된 `.vercel/project.json` 의 `orgId`, `projectId` 확인
2. https://vercel.com/account/tokens 에서 토큰 발급
3. GitHub 저장소 → Settings → Secrets and variables → Actions 에 등록
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

`vercel.json` 의 `git.deploymentEnabled: false` 로 Vercel 자체 Git 연동 배포는 꺼두었습니다. 배포는 GitHub Actions 로만 이루어져 중복 배포가 생기지 않습니다.

### 이슈 → 브랜치 자동 생성 조건

- 저장소에 main 브랜치(첫 커밋)가 있어야 합니다.
- Settings → Actions → General → Workflow permissions 가 **Read and write** 인지 확인하세요.
