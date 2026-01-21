# AIdol

Create and chat with your own AI idol group

## Overview

**"내가 상상한 아이돌을 만들고, 대화하고, 키우는 가장 쉬운 방법"**

AIdol은 K-pop 팬이 자신만의 AI 아이돌 그룹을 생성하고, 텍스트 채팅으로 관계를 형성할 수 있는 서비스입니다.

## 주요 기능

- AI 아이돌 그룹/멤버 생성
- DALL-E 3 기반 이미지 생성 (엠블럼, 프로필)
- 텍스트 채팅 (페르소나 기반 응답)
- 프로필 URL 공유

## 빠른 시작

### Backend

```bash
cd backend
poetry install
poetry run uvicorn main:app --reload
```

자세한 내용: [backend/README.md](backend/README.md)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

자세한 내용: [frontend/README.md](frontend/README.md)

## 라이브러리 통합

기존 프로젝트에 통합: [docs/integration-guide.md](docs/integration-guide.md)

## 문서

- [Backend](backend/README.md) - Python 패키지 (PyPI: `py-aidol`)
- [Frontend](frontend/README.md) - React 컴포넌트 (npm: `aidol`)
- [통합 가이드](docs/integration-guide.md)
- [기여 가이드](CONTRIBUTING.md)

## 라이선스

Apache 2.0
