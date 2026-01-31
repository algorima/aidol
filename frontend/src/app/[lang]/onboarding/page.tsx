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
  baseCrudRepositorySource:
    "https://github.com/algorima/aioia-core/blob/main/typescript/src/repositories/BaseCrudRepository.ts",
  baseCrudRouterSource:
    "https://github.com/algorima/aioia-core/blob/main/python/aioia_core/fastapi/base_crud_router.py",
};

const REPOSITORY_CODE = `import { BaseCrudRepository } from "@aioia/core";
import type { Companion } from "../schemas";
import { companionSchema } from "../schemas";

export class CompanionRepository extends BaseCrudRepository<Companion> {
  readonly resource = "aidol/companions";

  protected getDataSchema() {
    return companionSchema;
  }
}`;

const RESPONSE_CODE = `// 단일 항목 응답
interface SingleItemResponse<T> {
  data: T;
}

// 목록 응답
interface PaginatedResponse<T> {
  data: T[];
  total: number;
}`;

const BACKEND_ROUTER_CODE = `from aioia_core.fastapi import BaseCrudRouter

class CompanionRouter(BaseCrudRouter):
    # BaseCrudRouter가 { data: ... } 형식으로 자동 래핑`;

/**
 * 온보딩 자가학습 페이지
 * 프로젝트 아키텍처 패턴을 설명하는 슬라이드 형식
 */
export default function OnboardingPage({
  params: _params,
}: OnboardingPageProps): JSX.Element {
  const TOTAL_SLIDES = 5;

  const renderSlide = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Slide slideNumber={1} title="왜 이 구조인가">
            <p className="text-body-m text-base-content">
              이 프로젝트는{" "}
              <a
                href={LINKS.refineDataProvider}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                Refine Data Provider
              </a>{" "}
              패턴을 사용합니다.
            </p>
            <p className="text-body-m text-base-content">
              Refine은 모든 CRUD 응답이{" "}
              <code className="bg-base-300 rounded-sm px-1">
                {"{ data: ... }"}
              </code>{" "}
              형식으로 래핑되어야 합니다.
            </p>
            <div className="bg-warning/10 border-warning rounded-lg border-l-4 p-4">
              <p className="text-body-s text-warning-content">
                <strong>참고:</strong> 이 응답 래퍼 형식은 범용 REST API 표준이
                아닌{" "}
                <a
                  href={LINKS.refineDataProvider}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Refine 프레임워크 고유 요구사항
                </a>
                입니다.
              </p>
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
      case 1:
        return (
          <Slide slideNumber={2} title="프론트엔드 계층 구조">
            <div className="text-body-m text-base-content space-y-3">
              <div>
                <strong className="text-primary">repositories/</strong>
                <span className="badge badge-outline badge-sm ml-2">
                  Frontend
                </span>
                <p className="text-body-s text-base-content/80 ml-4">
                  데이터 접근 추상화 계층.{" "}
                  <a
                    href={LINKS.baseCrudRepositorySource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    BaseCrudRepository
                  </a>{" "}
                  상속.
                </p>
              </div>
              <div>
                <strong className="text-primary">services/</strong>
                <span className="badge badge-outline badge-sm ml-2">
                  Frontend
                </span>
                <p className="text-body-s text-base-content/80 ml-4">
                  비즈니스 로직. Repository를 조합하여 복잡한 작업 수행.
                </p>
              </div>
              <div>
                <strong className="text-primary">schemas/</strong>
                <span className="badge badge-outline badge-sm ml-2">
                  Frontend
                </span>
                <p className="text-body-s text-base-content/80 ml-4">
                  Zod 스키마 정의. API 응답 유효성 검증 및 TypeScript 타입 추론.
                </p>
              </div>
              <div>
                <strong className="text-primary">mocks/</strong>
                <span className="badge badge-outline badge-sm ml-2">
                  Frontend
                </span>
                <p className="text-body-s text-base-content/80 ml-4">
                  Storybook/테스트용 Mock 데이터. 타입별 fixture 제공.
                </p>
              </div>
            </div>
          </Slide>
        );
      case 2:
        return (
          <Slide slideNumber={3} title="aioia-core 패턴 (프론트엔드)">
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
              code={REPOSITORY_CODE}
              language="TypeScript"
              title="CompanionRepository.ts"
            />
            <div className="text-body-s text-base-content/80 space-y-1">
              <p>
                <strong>resource:</strong> API 엔드포인트 경로
              </p>
              <p>
                <strong>getDataSchema():</strong> Zod 스키마로 응답 유효성 검증
              </p>
            </div>
          </Slide>
        );
      case 3:
        return (
          <Slide slideNumber={4} title="백엔드 응답 형식">
            <p className="text-body-m text-base-content">
              백엔드는{" "}
              <a
                href={LINKS.baseCrudRouterSource}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                BaseCrudRouter
              </a>
              를 사용하여 자동으로{" "}
              <code className="bg-base-300 rounded-sm px-1">
                {"{ data: ... }"}
              </code>{" "}
              형식으로 응답합니다.
            </p>
            <CodeBlock
              code={RESPONSE_CODE}
              language="TypeScript"
              title="응답 타입"
            />
            <CodeBlock
              code={BACKEND_ROUTER_CODE}
              language="Python"
              title="백엔드 라우터"
            />
          </Slide>
        );
      case 4:
        return (
          <Slide slideNumber={5} title="새 파일 생성 전 체크리스트">
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
                  <code className="bg-base-300 rounded-sm px-1">
                    BaseCrudRepository
                  </code>
                  를 상속하고 있는지 확인
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
