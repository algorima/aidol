"use client";

import { Slide, SlideContainer } from "@/components/onboarding";

interface OnboardingPageProps {
  params: {
    lang: string;
  };
}

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
              슬라이드 콘텐츠 준비 중입니다.
            </p>
          </Slide>
        );
      case 1:
        return (
          <Slide slideNumber={2} title="프로젝트 계층 구조">
            <p className="text-body-m text-base-content">
              슬라이드 콘텐츠 준비 중입니다.
            </p>
          </Slide>
        );
      case 2:
        return (
          <Slide slideNumber={3} title="aioia-core 패턴">
            <p className="text-body-m text-base-content">
              슬라이드 콘텐츠 준비 중입니다.
            </p>
          </Slide>
        );
      case 3:
        return (
          <Slide slideNumber={4} title="백엔드 응답 형식">
            <p className="text-body-m text-base-content">
              슬라이드 콘텐츠 준비 중입니다.
            </p>
          </Slide>
        );
      case 4:
        return (
          <Slide slideNumber={5} title="체크리스트">
            <p className="text-body-m text-base-content">
              슬라이드 콘텐츠 준비 중입니다.
            </p>
          </Slide>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto min-h-dvh max-w-[600px] min-w-[360px] p-4">
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
