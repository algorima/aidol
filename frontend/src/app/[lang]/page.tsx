"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { HeroSection } from "@/components/landing/HeroSection";
import { getOrCreateClaimToken } from "@/lib/claimToken";
import { AIdolRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

interface AIdolLandingPageProps {
  params: {
    lang: string;
  };
}

/**
 * AIdol 랜딩 페이지
 * - CTA 클릭 → AIdol 생성 → 캐스팅 페이지로 이동
 */
export default function AIdolLandingPage({
  params,
}: AIdolLandingPageProps): JSX.Element {
  const { lang } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  // CTA 클릭 → AIdol 생성 → 캐스팅 페이지로 이동
  const handleStart = useCallback(async () => {
    setIsStarting(true);
    try {
      const claimToken = getOrCreateClaimToken();
      const aidol = await aidolRepository.createAIdol({
        name: "",
        profileImageUrl: "",
        claimToken,
      });
      router.push(`/${lang}/aidols/${aidol.id}/casting`);
    } catch (err) {
      console.error("Failed to create AIdol on start:", err);
      showToast(t("aidol:landing.error.create"), "error");
      setIsStarting(false);
    }
  }, [aidolRepository, lang, router, showToast, t]);

  return (
    <div className="mx-auto min-h-dvh max-w-[393px] min-w-[360px]">
      <main className="bg-base-100 flex w-full flex-col items-center justify-center">
        <HeroSection onGetStarted={handleStart} isLoading={isStarting} />
      </main>
    </div>
  );
}
