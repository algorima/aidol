# AIdol Backend

AI 아이돌 그룹 생성 및 채팅 Python 패키지

## 주요 기능

- AI 아이돌 그룹/멤버 CRUD
- Google Gemini 이미지 생성 (엠블럼, 프로필)
- 텍스트 채팅 (페르소나 기반 응답)
- Buppy 통합 Adapter 패턴

## 설치

```bash
cd backend
poetry install
poetry run uvicorn main:app --reload
```

API 문서:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 사용법

### FastAPI 통합

```python
from aidol.api.aidol import AIdolRouter
from aidol.api.companion import CompanionRouter
from aidol.factories import AIdolRepositoryFactory, CompanionRepositoryFactory

# AIdol 라우터
aidol_router = AIdolRouter(
    repository_factory=AIdolRepositoryFactory(),
    google_settings=google_settings,
    image_storage=image_storage,
)

# Companion 라우터
companion_router = CompanionRouter(
    repository_factory=CompanionRepositoryFactory(),
)

app.include_router(aidol_router.router, prefix="/api/aidol")
app.include_router(companion_router.router, prefix="/api/aidol")
```

## 개발

```bash
poetry install
make lint
make type-check
make unit-test
make format
```

## 환경 변수

### 이미지 생성 인증 (선택, ADC 지원)

| 변수 | 설명 |
|------|------|
| `GOOGLE_API_KEY` | Google API 키 (선택) |

**인증 방법:**

**Option 1: Google AI API (API Key)**
```bash
export GOOGLE_API_KEY=your-api-key
```

**Option 2: Vertex AI (ADC)**
```bash
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT=your-project-id
export GOOGLE_CLOUD_LOCATION=global  # gemini-3-pro-image-preview requires global
gcloud auth application-default login  # 로컬 개발
```

> **중요**: `gemini-3-pro-image-preview` 모델은 `location=global` 필수입니다.

### 선택

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `AIDOL_OPENAI_MODEL` | `gpt-4o-mini` | 채팅 응답 LLM 모델 |

> **참고**: 데이터베이스, 모델 등 추가 설정은 기본값으로 로컬 개발 가능합니다.
> 변경이 필요한 경우 `aidol/` 내 Settings 클래스를 참고하세요.

## 의존성

- aioia-core (공통 인프라)
- FastAPI, SQLAlchemy, Pydantic
- Google Generative AI (이미지 생성)
- OpenAI (채팅)
- Pillow (이미지 처리)

## 라이선스

Apache 2.0
