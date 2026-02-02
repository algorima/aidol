"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { BiographyInput } from "@/components/creation/BiographyInput";
import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { CompanionNameInput } from "@/components/creation/CompanionNameInput";
import { StepCard } from "@/components/creation/StepCard";
import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

export default function CompletePage() {
  const { t } = useTranslation();
  const params = useParams<{
    lang: string;
    aidolId: string;
    companionId: string;
  }>();

  const router = useRouter();
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const handleComplete = async () => {
    if (!name.trim()) return;
    await companionRepository.update({
      id: params.companionId,
      variables: { name, biography },
    });
    router.push(`/${params.lang}/${params.aidolId}/casting-complete`);
  };

  return (
    <CompanionCreateLayout
      step={5}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
          disabled={!name.trim()}
          onClick={handleComplete}
          className="btn btn-neutral w-full"
        >
          {t("aidol:companionCreate.complete.button")}
          <SparklesIcon className="size-5" />
        </button>
      }
    >
      <StepCard
        step={4}
        title={t("aidol:companionCreate.complete.nameStepTitle")}
      >
        <CompanionNameInput value={name} onChange={setName} />
      </StepCard>
      <StepCard
        step={5}
        title={t("aidol:companionCreate.complete.bioStepTitle")}
      >
        <BiographyInput value={biography} onChange={setBiography} />
      </StepCard>
    </CompanionCreateLayout>
  );
}
