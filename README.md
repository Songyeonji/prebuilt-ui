# Prebuilt UI

직접 만들어 쓰는 React 공통 컴포넌트 라이브러리입니다. **TypeScript + Tailwind CSS v4 + 디자인 토큰**.

- 📦 **npm 패키지** — `@songyeonji/prebuilt-ui` (소스: `src/shared`)
- 📖 **문서 사이트** — https://prebuilt-ui.vercel.app (Next.js App Router, 소스: `src/app`)
- 📋 **복사해서 쓰기** — 문서의 각 컴포넌트 **코드** 탭에서 전체 코드 복사

```bash
npm install
npm run dev         # 문서 사이트 http://localhost:3000
npm run build       # 문서 사이트 빌드 (타입 체크 포함)
npm run build:lib   # 라이브러리 빌드 → src/shared/dist
npm run pack:lib    # 배포될 패키지를 .tgz 로 만들어 확인
```

## 구조

```
.
├─ package.json                   ← 문서 사이트 (workspaces: ["src/shared"])
└─ src/
   ├─ shared/                     ← 📦 @songyeonji/prebuilt-ui (npm workspace 패키지)
   │  ├─ package.json             ← 패키지 이름·버전·exports
   │  ├─ tsup.config.ts           ← 라이브러리 빌드 설정
   │  ├─ README.md                ← npm 페이지에 보이는 README
   │  ├─ index.ts                 ← 컴포넌트 진입점 ('use client')
   │  ├─ utils/index.ts           ← 유틸 진입점 (cn) — 서버에서도 사용 가능
   │  ├─ styles/tokens.css        ← ★ 디자인 토큰 (유일한 스타일 파일)
   │  └─ components/Button|Input|Badge|Tabs|Modal/
   └─ app/                        ← 📖 문서 사이트 (Next.js App Router)
      ├─ page.tsx                 ← /                  소개 + 설치 방법
      ├─ tokens/page.tsx          ← /tokens            토큰 목록 + tokens.css 전문
      ├─ components/[slug]/       ← /components/button  설명 / 디자인 / 코드 탭
      └─ _showcase/               ← 문서 내부 코드 (라우트 아님)
         ├─ docs/*.doc.tsx        ← 컴포넌트별 문서
         ├─ registry.ts           ← 문서 등록
         ├─ source.ts             ← 코드 탭: 실제 소스 파일을 읽어서 표시
         └─ highlight.ts          ← 코드 하이라이팅 (Shiki, 빌드 시 실행)
```

문서 사이트는 `@shared` alias 로 `src/shared` **소스를 직접** 참조합니다 (빌드 없이 바로 반영).
화면에 보이는 예제 코드는 `@shared` → `@songyeonji/prebuilt-ui` 로 자동 치환됩니다.

## 라이브러리 사용법

```bash
npm install @songyeonji/prebuilt-ui
```

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@songyeonji/prebuilt-ui/styles.css'; /* 토큰 등록 + 패키지 클래스 스캔 */
```

```tsx
import { Button } from '@songyeonji/prebuilt-ui';
import { cn } from '@songyeonji/prebuilt-ui/utils';
```

자세한 내용은 [src/shared/README.md](src/shared/README.md) (npm 페이지와 동일) 참고.

### 설치 없이 복사해서 쓰기

문서 사이트 → 컴포넌트 → **코드** 탭에서 다음을 제공합니다.

1. 의존 패키지 설치 명령 (`npm install clsx tailwind-merge`)
2. `tokens.css` 전문 링크 (`/tokens#source`)
3. 컴포넌트 파일 + import 를 따라가 찾은 유틸 파일 **전문** (복사 버튼 포함)

코드 탭은 `src/shared` 의 실제 파일을 읽어 보여주므로 문서와 코드가 항상 일치합니다.

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
| Color | `bg-primary`(잉크) `text-accent`(포인트) `text-fg-muted` `border-border` `text-syntax-*`(코드 하이라이팅) |
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
   - variant/size 는 `Record<Variant, string>` 으로 클래스 매핑, 최종 조합은 `cn()` (`../../utils/cn`)
   - 스타일은 토큰 클래스만 사용 (`.css` 파일 만들지 않기)
2. `src/shared/index.ts` 에 `export * from './components/Foo';` 추가
3. `src/app/_showcase/docs/Foo.doc.tsx` 작성 후 `registry.ts` 에 등록
   → 사이드바, `/components/foo` 페이지, **코드 탭(전문)** 자동 생성

## 라이브러리 배포 (npm)

최초 1회:

1. https://www.npmjs.com 가입 → 사용자 이름이 `songyeonji` 가 아니면 `src/shared/package.json` 의 `name` 스코프를 본인 것으로 변경
2. npm → Access Tokens → **Generate New Token (Granular)** → 패키지 Read and write
3. GitHub → Settings → Secrets and variables → Actions → `NPM_TOKEN` 등록

배포할 때마다:

```bash
# 1) src/shared/package.json 의 version 올리기 (예: 0.1.0 → 0.2.0)
npm version minor -w @songyeonji/prebuilt-ui --no-git-tag-version
# 2) 커밋 & 같은 버전의 태그 푸시 → release.yml 이 빌드 후 npm 배포
git commit -am "chore: release v0.2.0"
git tag v0.2.0 && git push origin main v0.2.0
```

태그 버전과 `package.json` 버전이 다르면 워크플로가 배포를 막습니다.

## 자동화 (GitHub Actions)

| 워크플로 | 트리거 | 동작 |
| --- | --- | --- |
| `issue-branch.yml` | 이슈 생성 | `feature/12-title` 브랜치 생성 + 이슈에 댓글 (라벨 `bug`→`fix/`, `docs`→`docs/`, `refactor`→`refactor/`) |
| `ci.yml` | main 대상 PR | 문서 빌드 + 라이브러리 빌드 + 패키지 내용 확인 |
| `deploy.yml` | main 에 push | Vercel 접근 확인 → 문서 사이트 Production 배포 |
| `release.yml` | `v*` 태그 push | 라이브러리 빌드 → npm 배포 |

### Vercel 배포 설정 (최초 1회)

1. https://vercel.com/account/tokens 에서 토큰 발급 — **Scope 를 프로젝트가 속한 팀으로** 선택
2. 프로젝트 → Settings → General → **Project ID**, 팀 → Settings → General → **Team ID** 확인
   (또는 로컬에서 `npx vercel link` → `.vercel/project.json` 의 `projectId`, `orgId`)
3. GitHub → Settings → Secrets and variables → Actions 에 `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 등록

`deploy.yml` 의 **Verify Vercel access** 단계가 토큰 소유자, 접근 가능한 팀 목록(id 포함), 프로젝트 접근 여부를 로그에 출력합니다. 배포가 실패하면 이 단계 로그부터 확인하세요.

`vercel.json` 의 `git.deploymentEnabled: false` 로 Vercel 자체 Git 연동 배포는 꺼두었습니다. 배포는 GitHub Actions 로만 이루어집니다.

### 이슈 → 브랜치 자동 생성 조건

- 저장소에 main 브랜치(첫 커밋)가 있어야 합니다.
- Settings → Actions → General → Workflow permissions 가 **Read and write** 인지 확인하세요.
