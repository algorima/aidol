"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { GenderSelector } from "@/components/creation/GenderSelector";
import { StepCard } from "@/components/creation/StepCard";
import { CompanionRepository } from "@/repositories";
import type { Gender } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

export default function GenderPage() {
  const { t } = useTranslation();
  const params = useParams<{
    lang: string;
    aidolId: string;
    companionId: string;
  }>();
  const router = useRouter();
  const [gender, setGender] = useState<Gender | null>(null);
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const handleNext = async () => {
    if (!gender) return;
    await companionRepository.update({
      id: params.companionId,
      variables: { gender },
    });
    router.push(
      `/${params.lang}/aidols/${params.aidolId}/companions/${params.companionId}/personality`,
    );
  };

  return (
    <CompanionCreateLayout
      step={1}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
          disabled={!gender}
          onClick={handleNext}
          className="btn btn-neutral w-full"
        >
          {t("aidol:companionCreate.next")}
        </button>
      }
    >
      <StepCard step={1} title={t("aidol:companionCreate.gender.stepTitle")}>
        <GenderSelector value={gender} onChange={setGender} />
      </StepCard>
    </CompanionCreateLayout>
  );
}
