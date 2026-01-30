"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { GroupPlanningForm } from "@/components/group-creation";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import type { AIdol } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface GroupPageProps {
  params: { lang: string; aidolId: string };
}

export default function GroupPage({ params }: GroupPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [aidol, setAidol] = useState<AIdol | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchAidol = async () => {
      setIsLoading(true);
      try {
        const response = await aidolRepository.getOne({ id: aidolId });
        setAidol(response.data);
      } catch (error) {
        console.error("Failed to fetch aidol:", error);
        showToast(t("aidol:groupPlanning.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAidol();
  }, [aidolId, aidolRepository, showToast, t]);

  const handleGenerateImage = async (
    prompt: string,
  ): Promise<string | null> => {
    setIsGeneratingImage(true);
    try {
      const response = await aidolRepository.generateImage({ prompt });
      return response.data.imageUrl;
    } catch (error) {
      console.error("Failed to generate image:", error);
      showToast(t("aidol:groupPlanning.error.generate"), "error");
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = async (data: { name: string; emblemUrl: string }) => {
    setIsSubmitting(true);
    try {
      await aidolRepository.update({
        id: aidolId,
        variables: {
          name: data.name,
          profileImageUrl: data.emblemUrl,
        },
      });
      router.push(`/${lang}/${aidolId}/complete`);
    } catch (error) {
      console.error("Failed to update aidol:", error);
      showToast(t("aidol:groupPlanning.error.update"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-screen flex-col">
        <Header title={t("aidol:groupPlanning.header")} />
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex h-screen flex-col">
      <Header title={t("aidol:groupPlanning.header")} />
      <GroupPlanningForm
        initialName={aidol?.name}
        initialEmblemUrl={aidol?.profileImageUrl}
        onSubmit={handleSubmit}
        onGenerateImage={handleGenerateImage}
        isLoading={isSubmitting}
        isGeneratingImage={isGeneratingImage}
      />
    </div>
  );
}
