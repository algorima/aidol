"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BiographyInput } from "@/components/creation/BiographyInput";
import { CastingCompleteModal } from "@/components/creation/CastingCompleteModal";
import { CompanionCreateLayout } from "@/components/creation/CompanionCreateLayout";
import { CompanionNameInput } from "@/components/creation/CompanionNameInput";
import { StepCard } from "@/components/creation/StepCard";
import { getMockCompanionService } from "@/services/MockCompanionService";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = () => {
    if (!name.trim()) return;
    const service = getMockCompanionService();
    service.updateCompanion(params.companionId, { name, biography });
    setIsModalOpen(true);
  };

  const handleViewCasting = () => {
    router.push(`/${params.lang}/aidols/${params.aidolId}/casting`);
  };

  return (
    <>
      <CompanionCreateLayout
        step={4}
        totalSteps={4}
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

      <CastingCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onViewCasting={handleViewCasting}
      />
    </>
  );
}
