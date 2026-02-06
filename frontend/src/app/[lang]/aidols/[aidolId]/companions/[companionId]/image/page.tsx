"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { ProfileImageGenerator } from "@/components/creation/ProfileImageGenerator";
import { StepCard } from "@/components/creation/StepCard";
import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

interface ImagePageProps {
  params: {
    lang: string;
    aidolId: string;
    companionId: string;
  };
}

export default function ImagePage({ params }: ImagePageProps) {
  const { lang, aidolId, companionId } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const response = await companionRepository.generateImage({ prompt });
      setImageUrl(response.data.imageUrl);
      setHasGenerated(true);
    } catch {
      showToast(t("aidol:companionCreate.error.generateImage"), "error");
    } finally {
      setIsGenerating(false);
    }
  }, [companionRepository, prompt, showToast, t]);

  const handleNext = useCallback(async () => {
    if (!imageUrl) return;
    setIsSubmitting(true);
    try {
      await companionRepository.update({
        id: companionId,
        variables: { profilePictureUrl: imageUrl },
      });
      router.push(
        `/${lang}/aidols/${aidolId}/companions/${companionId}/complete`,
      );
    } catch {
      showToast(t("aidol:companionCreate.error.update"), "error");
      setIsSubmitting(false);
    }
  }, [
    aidolId,
    companionId,
    companionRepository,
    imageUrl,
    lang,
    router,
    showToast,
    t,
  ]);

  return (
    <CompanionCreateLayout
      step={3}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
          disabled={!hasGenerated || isSubmitting}
          onClick={handleNext}
          className="btn btn-neutral w-full"
        >
          {t("aidol:companionCreate.next")}
        </button>
      }
    >
      <StepCard step={3} title={t("aidol:companionCreate.image.stepTitle")}>
        <ProfileImageGenerator
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          imageUrl={imageUrl}
          hasGenerated={hasGenerated}
        />
      </StepCard>
    </CompanionCreateLayout>
  );
}
