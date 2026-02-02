"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { MbtiForm } from "@/components/creation/MbtiForm";
import type { MbtiValues } from "@/components/creation/MbtiForm";
import { StepCard } from "@/components/creation/StepCard";
import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

export default function PersonalityPage() {
  const { t } = useTranslation();
  const params = useParams<{
    lang: string;
    aidolId: string;
    companionId: string;
  }>();
  const router = useRouter();
  const [mbtiValues, setMbtiValues] = useState<MbtiValues>({
    energy: 5,
    perception: 5,
    judgment: 5,
    lifestyle: 5,
  });
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const handleNext = async () => {
    await companionRepository.update({
      id: params.companionId,
      variables: {
        mbtiEnergy: mbtiValues.energy,
        mbtiPerception: mbtiValues.perception,
        mbtiJudgment: mbtiValues.judgment,
        mbtiLifestyle: mbtiValues.lifestyle,
      },
    });
    router.push(
      `/${params.lang}/aidols/${params.aidolId}/companions/${params.companionId}/image`,
    );
  };

  return (
    <CompanionCreateLayout
      step={2}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
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
