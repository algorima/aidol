"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { MbtiForm } from "@/components/creation/MbtiForm";
import type { MbtiValues } from "@/components/creation/MbtiForm";
import { StepCard } from "@/components/creation/StepCard";
import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

interface PersonalityPageProps {
  params: {
    lang: string;
    aidolId: string;
    companionId: string;
  };
}

export default function PersonalityPage({ params }: PersonalityPageProps) {
  const { lang, aidolId, companionId } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const [mbtiValues, setMbtiValues] = useState<MbtiValues>({
    energy: 5,
    perception: 5,
    judgment: 5,
    lifestyle: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const handleNext = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await companionRepository.update({
        id: companionId,
        variables: {
          mbtiEnergy: mbtiValues.energy,
          mbtiPerception: mbtiValues.perception,
          mbtiJudgment: mbtiValues.judgment,
          mbtiLifestyle: mbtiValues.lifestyle,
        },
      });
      router.push(`/${lang}/aidols/${aidolId}/companions/${companionId}/image`);
    } catch {
      showToast(t("aidol:companionCreate.error.update"), "error");
      setIsSubmitting(false);
    }
  }, [
    aidolId,
    companionId,
    companionRepository,
    lang,
    mbtiValues,
    router,
    showToast,
    t,
  ]);

  return (
    <CompanionCreateLayout
      step={2}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleNext}
          className="btn btn-neutral w-full"
        >
          {t("aidol:companionCreate.next")}
        </button>
      }
    >
      <StepCard
        step={2}
        title={t("aidol:companionCreate.personality.stepTitle")}
      >
        <MbtiForm values={mbtiValues} onChange={setMbtiValues} />
      </StepCard>
    </CompanionCreateLayout>
  );
}
