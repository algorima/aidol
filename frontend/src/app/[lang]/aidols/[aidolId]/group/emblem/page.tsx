"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import {
  Button,
  EmblemStep,
  GroupPlanningLayout,
} from "@/components/group-creation";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { aidolStatusSchema } from "@/schemas/aidol";
import { getApiService } from "@/services/ApiService";

interface EmblemPageProps {
  params: { lang: string; aidolId: string };
}

export default function EmblemPage({ params }: EmblemPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [emblemUrl, setEmblemUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchAidol = async () => {
      try {
        const response = await aidolRepository.getOne({ id: aidolId });
        if (response.data.profileImageUrl) {
          setEmblemUrl(response.data.profileImageUrl);
        }
      } catch (error) {
        console.error("Failed to fetch aidol:", error);
      }
    };
    void fetchAidol();
  }, [aidolId, aidolRepository]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsGeneratingImage(true);
    try {
      const response = await aidolRepository.generateImage({
        prompt: prompt.trim(),
      });
      setEmblemUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
      showToast(t("aidol:groupPlanning.error.generate"), "error");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const canProceed = emblemUrl.length > 0;

  const handleNext = async () => {
    if (!canProceed) return;

    setIsSaving(true);
    try {
      await aidolRepository.update({
        id: aidolId,
        variables: {
          profileImageUrl: emblemUrl,
          status: aidolStatusSchema.enum.PUBLISHED,
        },
      });
      router.push(`/${lang}/aidols/${aidolId}`);
    } catch (error) {
      console.error("Failed to save:", error);
      showToast(t("aidol:groupPlanning.error.update"), "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GroupPlanningLayout
      step={2}
      totalSteps={2}
      bottomButton={
        <Button
          onClick={() => void handleNext()}
          disabled={!canProceed}
          isLoading={isSaving}
          className="w-full"
        >
          {t("aidol:groupPlanning.next")}
        </Button>
      }
    >
      <EmblemStep
        prompt={prompt}
        emblemUrl={emblemUrl}
        isGeneratingImage={isGeneratingImage}
        onPromptChange={setPrompt}
        onGenerate={() => void handleGenerateImage()}
      />
    </GroupPlanningLayout>
  );
}
