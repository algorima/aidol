"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { CastingComplete } from "@/components/casting-board";
import { MAX_MEMBERS } from "@/constants/companion";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { getApiService } from "@/services/ApiService";

interface CastingCompletePageProps {
  params: { lang: string; aidolId: string };
}

export default function CastingCompletePage({
  params,
}: CastingCompletePageProps) {
  const { lang, aidolId } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const [remainingSlots, setRemainingSlots] = useState<number | null>(null);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await companionRepository.getByAidolId(aidolId);
        setRemainingSlots(MAX_MEMBERS - response.data.length);
      } catch {
        showToast(t("aidol:castingComplete.error.load"), "error");
      }
    };

    void fetchMemberCount();
  }, [aidolId, companionRepository, showToast, t]);

  const handleFindNext = useCallback(() => {
    router.push(`/${lang}/aidols/${aidolId}/casting`);
  }, [lang, aidolId, router]);

  const handleViewBoard = useCallback(() => {
    router.push(`/${lang}/aidols/${aidolId}/casting-board`);
  }, [lang, aidolId, router]);

  return (
    <CastingComplete
      remainingSlots={remainingSlots}
      onFindNext={handleFindNext}
      onViewBoard={handleViewBoard}
    />
  );
}
