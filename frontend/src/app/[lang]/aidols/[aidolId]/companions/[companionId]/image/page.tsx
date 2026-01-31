"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { ProfileImageGenerator } from "@/components/creation/ProfileImageGenerator";
import { StepCard } from "@/components/creation/StepCard";
import { getMockCompanionRepository } from "@/repositories/MockCompanionRepository";

export default function ImagePage() {
  const { t } = useTranslation();
  const params = useParams<{
    lang: string;
    aidolId: string;
    companionId: string;
  }>();
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const repository = getMockCompanionRepository();
    const response = await repository.generateImage(prompt);
    setImageUrl(response.data.imageUrl);
    setHasGenerated(true);
    setIsGenerating(false);
  };

  const handleNext = () => {
    if (!imageUrl) return;
    const repository = getMockCompanionRepository();
    repository.updateCompanion(params.companionId, {
      profilePictureUrl: imageUrl,
    });
    router.push(
      `/${params.lang}/aidols/${params.aidolId}/companions/${params.companionId}/complete`,
    );
  };

  return (
    <CompanionCreateLayout
      step={3}
      totalSteps={5}
      bottomButton={
        <button
          type="button"
          disabled={!hasGenerated}
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
