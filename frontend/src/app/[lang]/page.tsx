"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { HeroSection } from "@/components/landing/HeroSection";
import { getClaimToken, getOrCreateClaimToken } from "@/lib/claimToken";
import { AIdolRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

interface AIdolLandingPageProps {
  params: {
    lang: string;
  };
}

/**
 * AIdol 랜딩 페이지
 * - 재방문: claimToken으로 기존 AIdol 조회 → 캐스팅 페이지로 자동 리다이렉트
 * - 첫 진입: CTA 클릭 → AIdol 생성 → 캐스팅 페이지로 이동
 */
export default function AIdolLandingPage({
  params,
}: AIdolLandingPageProps): JSX.Element {
  const { lang } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  // 재방문: claimToken이 있으면 기존 AIdol 조회 후 자동 리다이렉트
  useEffect(() => {
    const checkExistingAIdol = async () => {
      const claimToken = getClaimToken();
      if (!claimToken) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await aidolRepository.getList({
          filters: [{ field: "claimToken", operator: "eq", value: claimToken }],
          pagination: { current: 1, pageSize: 1 },
        });
        if (response.data.length > 0) {
          router.push(`/${lang}/aidols/${response.data[0].id}/casting`);
          return;
        }
      } catch (err) {
        // API 실패 시 랜딩 페이지 그대로 표시
        console.error("Failed to check existing AIdol:", err);
      }
      setIsLoading(false);
    };
    void checkExistingAIdol();
  }, [aidolRepository, lang, router]);

  // 첫 진입: CTA 클릭 → AIdol 생성 → 캐스팅 페이지로 이동
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
        <HeroSection
          onGetStarted={handleStart}
          isLoading={isLoading || isStarting}
        />
      </main>
    </div>
  );
}
