"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { StepCard } from "@/components/creation/StepCard";
import {
  Button,
  GroupPlanningLayout,
  TextInput,
} from "@/components/group-creation";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { getApiService } from "@/services/ApiService";

interface NamePageProps {
  params: { lang: string; aidolId: string };
}

export default function NamePage({ params }: NamePageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchAidol = async () => {
      try {
        const response = await aidolRepository.getOne({ id: aidolId });
        if (response.data.name) {
          setName(response.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch aidol:", error);
      }
    };
    void fetchAidol();
  }, [aidolId, aidolRepository]);

  const canProceed = name.trim().length > 0;

  const handleNext = async () => {
    if (!canProceed) return;

    setIsSaving(true);
    try {
      await aidolRepository.update({
        id: aidolId,
        variables: { name: name.trim() },
      });
      router.push(`/${lang}/aidols/${aidolId}/group/emblem`);
    } catch (error) {
      console.error("Failed to save name:", error);
      showToast(t("aidol:groupPlanning.error.update"), "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GroupPlanningLayout
      step={1}
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
      <StepCard step={1} title={t("aidol:groupPlanning.step1Title")}>
        <TextInput
          value={name}
          onChange={setName}
          placeholder={t("aidol:groupPlanning.namePlaceholder")}
          maxLength={20}
        />
      </StepCard>
    </GroupPlanningLayout>
  );
}
