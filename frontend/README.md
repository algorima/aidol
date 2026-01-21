# AIdol Frontend

AI 아이돌 그룹 생성 및 채팅 React 컴포넌트

## 주요 컴포넌트

### 생성
- **GroupCreation**: 멀티스텝 그룹 생성 폼
- **EmblemGenerator**: DALL-E 3 이미지 생성

### 랜딩
- **HeroSection**: 메인 히어로 섹션
- **DemoSection**: 데모 섹션

### 프로필
- **GroupHeader**: 그룹 프로필 헤더
- **CompanionGrid**: 멤버 카드 그리드

### Repository
- **AIdolRepository**: AIdol API 클라이언트
- **CompanionRepository**: Companion API 클라이언트

## 설치

```bash
npm install aidol @aioia/core
```

## 사용법

### 컴포넌트

```tsx
import { GroupCreation, HeroSection } from "aidol";

<HeroSection onStartClick={() => router.push("/create")} />
<GroupCreation onSubmit={handleCreate} />
```

### Repository

```tsx
import { AIdolRepository, CompanionRepository } from "aidol";

const aidolRepo = new AIdolRepository(apiService);
const companionRepo = new CompanionRepository(apiService);

// 그룹 생성
const aidol = await aidolRepo.create({ name: "My Group", concept: "cute" });

// 이미지 생성
const image = await aidolRepo.generateImage({ prompt: "K-pop idol emblem" });
```

### i18n 통합

[통합 가이드](../docs/integration-guide.md#i18n-통합) 참조

## Peer Dependencies

- React 18+
- Next.js 13 또는 14
- Tailwind CSS with DaisyUI
- @aioia/core

## 라이선스

Apache 2.0
