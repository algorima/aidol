"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { CastingComplete } from "@/components/casting-board";

interface CastingCompletePageProps {
  params: { lang: string; aidolId: string };
}

const MOCK_REMAINING_SLOTS = 2;

export default function CastingCompletePage({
  params,
}: CastingCompletePageProps) {
  const { lang, aidolId } = params;
  const router = useRouter();

  const handleFindNext = useCallback(() => {
    router.push(`/${lang}/${aidolId}/casting`);
  }, [lang, aidolId, router]);

  const handleViewBoard = useCallback(() => {
    router.push(`/${lang}/${aidolId}/casting-board`);
  }, [lang, aidolId, router]);

  return (
    <CastingComplete
      remainingSlots={MOCK_REMAINING_SLOTS}
      onFindNext={handleFindNext}
      onViewBoard={handleViewBoard}
    />
  );
}
