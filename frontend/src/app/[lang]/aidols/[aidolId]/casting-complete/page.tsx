"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CastingComplete } from "@/components/casting-board";
import { Loading } from "@/components/Loading";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { getApiService } from "@/services/ApiService";

interface CastingCompletePageProps {
  params: { lang: string; aidolId: string };
}

const MAX_MEMBERS = 25;

export default function CastingCompletePage({
  params,
}: CastingCompletePageProps) {
  const { lang, aidolId } = params;
  const router = useRouter();
  const [memberCount, setMemberCount] = useState<number | null>(null);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
        });
        setMemberCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch companions:", error);
        setMemberCount(0);
      }
    };

    void fetchMemberCount();
  }, [aidolId, companionRepository]);

  const handleFindNext = useCallback(() => {
    router.push(`/${lang}/aidols/${aidolId}/casting`);
  }, [lang, aidolId, router]);

  const handleViewBoard = useCallback(() => {
    router.push(`/${lang}/aidols/${aidolId}/casting-board`);
  }, [lang, aidolId, router]);

  if (memberCount === null) {
    return <Loading />;
  }

  return (
    <CastingComplete
      remainingSlots={MAX_MEMBERS - memberCount}
      onFindNext={handleFindNext}
      onViewBoard={handleViewBoard}
    />
  );
}
