"use client";

import { useRouter } from "next/navigation";

import { HeroSection } from "@/components/landing/HeroSection";

interface AIdolLandingPageProps {
  params: {
    lang: string;
  };
}

/**
 * AIdol 랜딩 페이지
 * Hero 섹션과 Demo 섹션을 표시하고, CTA 버튼 클릭 시 생성 페이지로 이동합니다.
 */
export default function AIdolLandingPage({
  params,
}: AIdolLandingPageProps): JSX.Element {
  const { lang } = params;
  const router = useRouter();

  const handleStart = () => {
    router.push(`/${lang}/create`);
  };

  return (
    <div className="mx-auto min-h-dvh max-w-[393px] min-w-[360px]">
      <main className="bg-base-100 flex w-full flex-col items-center justify-center">
        <HeroSection onGetStarted={handleStart} />
      </main>
    </div>
  );
}
