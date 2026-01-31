"use client";

import { CodeBlock, Slide, SlideContainer } from "@/components/onboarding";

interface OnboardingPageProps {
  params: {
    lang: string;
  };
}

// 외부 링크
const LINKS = {
  refineDataProvider: "https://refine.dev/docs/data/data-provider/",
  martinFowlerRepository: "https://martinfowler.com/eaaCatalog/repository.html",
  aioiaCoreNpm: "https://www.npmjs.com/package/@aioia/core",
  aioiaCorePyPI: "https://pypi.org/project/aioia-core/",
  baseCrudRepositorySource:
    "https://github.com/algorima/aioia-core/blob/main/typescript/src/repositories/BaseCrudRepository.ts",
  baseCrudRouterSource:
    "https://github.com/algorima/aioia-core/blob/main/python/aioia_core/fastapi/base_crud_router.py",
  baseRepositoryFactorySource:
    "https://github.com/algorima/aioia-core/blob/main/python/aioia_core/factories/base_repository_factory.py",
};

const FRONTEND_REPOSITORY_CODE = `import { BaseCrudRepository } from "@aioia/core";
import type { Companion } from "../schemas";
import { companionSchema } from "../schemas";

export class CompanionRepository extends BaseCrudRepository<Companion> {
  readonly resource = "aidol/companions";

  protected getDataSchema() {
    return companionSchema;
  }
}`;

const BACKEND_ROUTER_CODE = `from aioia_core.fastapi import BaseCrudRouter

class CompanionRouter(
    BaseCrudRouter[Companion, CompanionCreate, CompanionUpdate, CompanionRepositoryProtocol]
):
    pass  # 기본 CRUD 엔드포인트 자동 생성

# 라우터 인스턴스 생성
router = CompanionRouter(
    model_class=Companion,
    create_schema=CompanionCreate,
    update_schema=CompanionUpdate,
    db_session_factory=db_session_factory,
    repository_factory=repository_factory,
    resource_name="companions",
    tags=["Companion"],
)`;

const FACTORY_CODE = `from aioia_core.factories import BaseRepositoryFactory
from aidol.repositories import CompanionRepository

class CompanionRepositoryFactory(BaseRepositoryFactory[CompanionRepository]):
    """Factory for creating Companion repositories."""

    def __init__(self):
        super().__init__(repository_class=CompanionRepository)

# 사용 예시
factory = CompanionRepositoryFactory()
repo = factory.create_repository(db_session)`;

const RESPONSE_CODE = `// 단일 항목 응답
interface SingleItemResponse<T> {
  data: T;
}

// 목록 응답
interface PaginatedResponse<T> {
  data: T[];
  total: number;
}`;

const QUERY_PARAMS_TS_CODE = `// @aioia/core - GetListParams
interface GetListParams {
  pagination?: { current?: number; pageSize?: number; };
  sorters?: Array<{ field: string; order: "asc" | "desc"; }>;
  filters?: Array<{ field: string; operator: string; value: any; }>;
}`;

const QUERY_PARAMS_PY_CODE = `# aioia-core - BaseCrudRouter
current: int = Query(1, ge=1)
page_size: int = Query(10, ge=1, le=100)
sort: str | None  # JSON: [["field", "asc|desc"], ...]
filters: str | None  # JSON: [{"field": "...", "operator": "...", "value": "..."}]`;

/**
 * 온보딩 자가학습 페이지
 * 프로젝트 아키텍처 패턴을 설명하는 슬라이드 형식
 */
export default function OnboardingPage({
  params: _params,
}: OnboardingPageProps): JSX.Element {
  const TOTAL_SLIDES = 7;

  const renderSlide = (index: number) => {
    switch (index) {
      // 1. 전체 그림
      case 0:
        return (
          <Slide slideNumber={1} title="프로젝트 계층 구조">
            <p className="text-body-m text-base-content mb-4">
              프론트엔드와 백엔드가 동일한 계층 구조를 공유합니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-title-s text-primary mb-2">Frontend</h3>
                <ul className="text-body-s text-base-content/80 space-y-1">
                  <li>
                    <strong>repositories/</strong> - 데이터 접근
                  </li>
                  <li>
                    <strong>services/</strong> - 비즈니스 로직
                  </li>
                  <li>
                    <strong>schemas/</strong> - Zod 스키마
                  </li>
                  <li>
                    <strong>mocks/</strong> - 테스트 fixture
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-title-s text-primary mb-2">Backend</h3>
                <ul className="text-body-s text-base-content/80 space-y-1">
                  <li>
                    <strong>api/</strong> - FastAPI 라우터
                  </li>
                  <li>
                    <strong>models/</strong> - SQLAlchemy 모델
                  </li>
                  <li>
                    <strong>repositories/</strong> - 데이터 접근
                  </li>
                  <li>
                    <strong>schemas/</strong> - Pydantic 스키마
                  </li>
                  <li>
                    <strong>services/</strong> - 비즈니스 로직
                  </li>
                  <li>
                    <strong>factories.py</strong> - DI 팩토리
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-body-s text-base-content/60 mt-4">
              출처:{" "}
              <a
                href={LINKS.martinFowlerRepository}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Repository 패턴 - Martin Fowler, PoEAA
              </a>
            </p>
          </Slide>
        );
      // 2. 공통 규약: 응답 형식
      case 1:
        return (
          <Slide slideNumber={2} title="응답 형식">
            <p className="text-body-m text-base-content">
              모든 API 응답은{" "}
              <code className="bg-base-300 rounded-sm px-1">
                {"{ data: ... }"}
              </code>{" "}
              형식으로 래핑됩니다.
            </p>
            <CodeBlock
              code={RESPONSE_CODE}
              language="TypeScript"
              title="응답 타입"
            />
            <div className="bg-info/10 border-info rounded-lg border-l-4 p-4">
              <p className="text-body-s text-info-content">
                <strong>설계 이유:</strong> Admin 도구에서{" "}
                <a
                  href={LINKS.refineDataProvider}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Refine 프레임워크
                </a>
                를 사용합니다. aioia-core가 Refine Data Provider 구조와 호환되어
                여러 프로젝트를 통합 관리할 수 있습니다.
              </p>
              <p className="text-body-s text-base-content/60 mt-2">
                참고: 이는 Refine 프레임워크 고유 요구사항이며, 범용 REST API
                표준이 아닙니다.
              </p>
            </div>
          </Slide>
        );
      // 3. 공통 규약: 쿼리 파라미터
      case 2:
        return (
          <Slide slideNumber={3} title="쿼리 파라미터">
            <p className="text-body-m text-base-content mb-4">
              aioia-core 기반 목록 조회 파라미터
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-title-s text-primary mb-2">Frontend</h3>
                <CodeBlock
                  code={QUERY_PARAMS_TS_CODE}
                  language="TypeScript"
                  title="GetListParams"
                />
              </div>
              <div>
                <h3 className="text-title-s text-primary mb-2">Backend</h3>
                <CodeBlock
                  code={QUERY_PARAMS_PY_CODE}
                  language="Python"
                  title="BaseCrudRouter"
                />
              </div>
            </div>
            <p className="text-body-s text-base-content/60 mt-4">
              참고: 이 형식은 Refine Data Provider 호환을 위한 aioia-core 자체
              정의이며, 범용 REST API 표준이 아닙니다.
            </p>
          </Slide>
        );
      // 4. 구현: 프론트엔드 Repository
      case 3:
        return (
          <Slide slideNumber={4} title="aioia-core (프론트엔드)">
            <p className="text-body-m text-base-content">
              <a
                href={LINKS.aioiaCoreNpm}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                @aioia/core
              </a>
              에서 제공하는{" "}
              <a
                href={LINKS.baseCrudRepositorySource}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                BaseCrudRepository
              </a>
              를 상속합니다.
            </p>
            <CodeBlock
              code={FRONTEND_REPOSITORY_CODE}
              language="TypeScript"
              title="repositories/CompanionRepository.ts"
            />
            <div className="text-body-s text-base-content/80 space-y-1">
              <p>
                <strong>resource:</strong> API 엔드포인트 경로
              </p>
              <p>
                <strong>getDataSchema():</strong> Zod 스키마로 응답 유효성 검증
              </p>
            </div>
            <div className="bg-warning/10 border-warning mt-4 rounded-lg border-l-4 p-4">
              <p className="text-body-s text-warning-content">
                <strong>런타임 검증 목적:</strong> TypeScript 타입은 컴파일
                타임에만 존재합니다. Zod 스키마는 런타임에 API 응답을 검증하여,
                백엔드 스키마가 변경되면 즉시 감지하고 Sentry에 보고합니다.
              </p>
            </div>
          </Slide>
        );
      // 5. 구현: 백엔드 Router
      case 4:
        return (
          <Slide slideNumber={5} title="aioia-core (백엔드)">
            <p className="text-body-m text-base-content">
              <a
                href={LINKS.aioiaCorePyPI}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                aioia-core
              </a>{" "}
              (PyPI)에서 제공하는{" "}
              <a
                href={LINKS.baseCrudRouterSource}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                BaseCrudRouter
              </a>
              를 상속합니다.
            </p>
            <CodeBlock
              code={BACKEND_ROUTER_CODE}
              language="Python"
              title="api/companion.py"
            />
            <div className="text-body-s text-base-content/80 space-y-1">
              <p>
                <strong>resource_name:</strong> URL 경로 및 리소스 식별자
              </p>
              <p>
                <strong>tags:</strong> OpenAPI 문서 태그
              </p>
            </div>
          </Slide>
        );
      // 6. 심화: 백엔드 Factory 패턴
      case 5:
        return (
          <Slide slideNumber={6} title="Factory 패턴 (백엔드)">
            <p className="text-body-m text-base-content">
              <a
                href={LINKS.baseRepositoryFactorySource}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                BaseRepositoryFactory
              </a>
              를 상속하여 의존성 주입(DI)을 구현합니다.
            </p>
            <CodeBlock
              code={FACTORY_CODE}
              language="Python"
              title="factories.py"
            />
            <div className="text-body-s text-base-content/80 space-y-1">
              <p>
                <strong>BaseRepositoryFactory[T]:</strong> Repository 타입별
                개별 Factory 클래스
              </p>
              <p>
                <strong>create_repository():</strong> db_session을 받아
                Repository 인스턴스 생성
              </p>
            </div>
          </Slide>
        );
      // 7. 실무 적용
      case 6:
        return (
          <Slide slideNumber={7} title="체크리스트">
            <p className="text-body-m text-base-content mb-4">
              새 파일 생성 전 확인사항
            </p>
            <div className="text-body-m text-base-content space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1"
                  readOnly
                />
                <span>
                  <code className="bg-base-300 rounded-sm px-1">
                    repositories/
                  </code>
                  에 기존 Repository가 있는지 확인
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1"
                  readOnly
                />
                <span>
                  <code className="bg-base-300 rounded-sm px-1">schemas/</code>
                  에 관련 스키마가 있는지 확인
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1"
                  readOnly
                />
                <span>
                  aioia-core 베이스 클래스를 상속하고 있는지 확인
                  (BaseCrudRepository, BaseCrudRouter)
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1"
                  readOnly
                />
                <span>
                  API 응답이{" "}
                  <code className="bg-base-300 rounded-sm px-1">
                    {"{ data: ... }"}
                  </code>{" "}
                  형식인지 확인
                </span>
              </label>
            </div>
          </Slide>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto min-h-dvh w-full max-w-3xl p-4">
      <main className="bg-base-100 flex w-full flex-col gap-6">
        <header className="text-center">
          <h1 className="text-headline-s text-base-content">
            프로젝트 아키텍처 가이드
          </h1>
          <p className="text-body-m text-base-content/60">
            자가학습 온보딩 슬라이드
          </p>
        </header>

        <SlideContainer totalSlides={TOTAL_SLIDES}>
          {renderSlide}
        </SlideContainer>
      </main>
    </div>
  );
}
