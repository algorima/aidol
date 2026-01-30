import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { StepCard } from "@/components/creation/StepCard";

import { EmblemStep } from "./EmblemStep";

interface GroupPlanningFormProps {
  initialStep?: 1 | 2;
  initialName?: string;
  initialEmblemUrl?: string;
  onSubmit: (data: { name: string; emblemUrl: string }) => void;
  onGenerateImage: (prompt: string) => Promise<string | null>;
  isLoading: boolean;
  isGeneratingImage: boolean;
}

export function GroupPlanningForm({
  initialStep = 1,
  initialName = "",
  initialEmblemUrl = "",
  onSubmit,
  onGenerateImage,
  isLoading,
  isGeneratingImage,
}: GroupPlanningFormProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(initialStep);
  const [name, setName] = useState(initialName);
  const [emblemUrl, setEmblemUrl] = useState(initialEmblemUrl);

  const canProceedStep1 = name.trim().length > 0;
  const canProceedStep2 = emblemUrl.length > 0;

  const handleNext = () => {
    if (step === 1 && canProceedStep1) {
      setStep(2);
    } else if (step === 2 && canProceedStep2) {
      onSubmit({ name: name.trim(), emblemUrl });
    }
  };

  const handleGenerateImage = async (prompt: string) => {
    const url = await onGenerateImage(prompt);
    if (url) {
      setEmblemUrl(url);
    }
  };

  const canProceed = step === 1 ? canProceedStep1 : canProceedStep2;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="px-6 py-4">
        <progress
          className="progress progress-primary h-3 w-full"
          value={step}
          max={2}
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-center gap-6 overflow-y-auto px-6 pb-24">
        {step === 1 && (
          <StepCard step={1} title={t("aidol:groupPlanning.step1Title")}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("aidol:groupPlanning.namePlaceholder")}
              className="border-base-300 text-body-m placeholder:text-base-300 w-full rounded-lg border bg-white px-4 py-3 text-black focus:outline-none"
              maxLength={20}
            />
          </StepCard>
        )}

        {step === 2 && (
          <EmblemStep
            emblemUrl={emblemUrl}
            isGeneratingImage={isGeneratingImage}
            onGenerate={(prompt) => void handleGenerateImage(prompt)}
          />
        )}
      </div>

      <div className="max-w-mobile fixed inset-x-0 bottom-0 z-10 mx-auto px-6 pb-6">
        <div className="bg-base-100">
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || isLoading}
            className={clsx(
              "btn btn-lg text-label-l text-neutral-content w-full rounded-lg border-0 shadow-none",
              canProceed && !isLoading ? "bg-neutral" : "bg-neutral/20",
            )}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              t("aidol:groupPlanning.next")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
