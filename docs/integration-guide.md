# 통합 가이드

기존 프로젝트에 AIdol 라이브러리를 통합하는 방법

> Standalone 실행: [README.md](../README.md) 참조

## 라이브러리로 통합

## FastAPI 프로젝트

### 설치

```bash
pip install git+https://github.com/algorima/aidol.git#subdirectory=backend
```

### 사용

```python
from aidol.api.aidol import AIdolRouter
from aidol.api.companion import CompanionRouter
from aidol.factories import AIdolRepositoryFactory, CompanionRepositoryFactory

# AIdol 라우터
aidol_router = AIdolRouter(
    repository_factory=AIdolRepositoryFactory(db_session_factory),
    openai_settings=openai_settings,
    image_storage=image_storage,
)

# Companion 라우터
companion_router = CompanionRouter(
    repository_factory=CompanionRepositoryFactory(db_session_factory),
)

app.include_router(aidol_router.router, prefix="/api/aidol")
app.include_router(companion_router.router, prefix="/api/aidol")
```

### 환경 변수

```bash
export DATABASE_URL=postgresql://...
export OPENAI_API_KEY=sk-...
```

---

## React/Next.js 프로젝트

### 설치

```bash
npm install aidol @aioia/core
```

### Tailwind 설정 (필수)

```ts
// tailwind.config.ts
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/aidol/dist/**/*.{js,jsx,ts,tsx}",
  "./node_modules/@aioia/core/dist/**/*.{js,jsx,ts,tsx}",
]
```

### Entry Points

| 엔트리 | 용도 | 환경 |
|--------|------|------|
| `aidol` | Repository, 타입, Zod 스키마, i18n | 서버/클라이언트 |
| `aidol/client` | UI 컴포넌트 | 클라이언트 |

### 컴포넌트 (클라이언트)

```tsx
import { GroupCreation, HeroSection } from "aidol/client";

<HeroSection onStartClick={() => router.push("/create")} />
<GroupCreation onSubmit={handleCreate} />
```

### Repository (클라이언트)

```tsx
import { AIdolRepository, CompanionRepository } from "aidol";

const aidolRepo = new AIdolRepository(apiService);
const companionRepo = new CompanionRepository(apiService);

// 그룹 생성
const aidol = await aidolRepo.create({ name: "My Group", concept: "cute" });

// 이미지 생성
const image = await aidolRepo.generateImage({ prompt: "K-pop idol emblem" });
```

### 타입 및 스키마 (서버/클라이언트)

```tsx
// 서버 컴포넌트에서 타입 사용
import type { AIdol, Companion } from "aidol";
import { aidolSchema, companionSchema } from "aidol";
```

### i18n 통합

```tsx
import { aidolTranslations, AIDOL_NS } from "aidol";
```

> **서버 안전**: 메인 엔트리포인트(`aidol`)는 서버 안전 코드만 포함합니다.
> UI 컴포넌트는 `aidol/client`에 분리되어 있어 서버 환경에서 안전하게 import 가능합니다.

```tsx
// 호스트 앱의 i18n 인스턴스에 번역 리소스 추가
Object.entries(aidolTranslations).forEach(([lang, resources]) => {
  i18n.addResourceBundle(lang, AIDOL_NS, resources);
});
```

지원 언어: `en`, `es`, `id`, `ja`, `ko`, `th`, `tl`, `vi`, `zh`

---

## 데이터베이스

### 테이블

- `aidols`: 그룹 정보 (name, concept, profile_image_url)
- `companions`: 멤버 정보 (name, biography, system_prompt, aidol_id FK)

## 개발

```bash
# Backend
make format lint type-check

# Frontend
npm run lint type-check
npm run build:lib  # 라이브러리만 빌드
```
