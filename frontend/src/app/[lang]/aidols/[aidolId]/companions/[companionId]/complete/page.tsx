"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { CompanionNameInput } from "@/components/creation/CompanionNameInput";
import { StepCard } from "@/components/creation/StepCard";
import { TextInput } from "@/components/group-creation/TextInput";
import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

interface CompletePageProps {
  params: {
    lang: string;
    aidolId: string;
    companionId: string;
  };
}

export default function CompletePage({ params }: CompletePageProps) {
  const { lang, aidolId, companionId } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const handleComplete = useCallback(async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      await companionRepository.update({
        id: companionId,
        variables: { name, biography, status: "published" },
      });
      router.push(`/${lang}/aidols/${aidolId}/casting-complete`);
    } catch {
      showToast(t("aidol:companionCreate.error.update"), "error");
      setIsSubmitting(false);
    }
  }, [
    aidolId,
    biography,
    companionId,
    companionRepository,
    lang,
    name,
    router,
    showToast,
    t,
  ]);

  return (
    <CompanionCreateLayout
      step={5}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
          disabled={!name.trim() || isSubmitting}
          onClick={handleComplete}
          className="btn btn-primary btn-lg text-label-l w-full rounded-lg"
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
        <TextInput
          value={biography}
          onChange={setBiography}
          placeholder={t("aidol:companionCreate.complete.bioPlaceholder")}
        />
      </StepCard>
    </CompanionCreateLayout>
  );
}
