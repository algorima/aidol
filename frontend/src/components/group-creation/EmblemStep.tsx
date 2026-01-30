import { SparklesIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ImagePreview } from "@/components/companion/ImagePreview";
import { StepCard } from "@/components/creation/StepCard";

interface EmblemStepProps {
  emblemUrl: string;
  isGeneratingImage: boolean;
  onGenerate: (prompt: string) => void;
}

export function EmblemStep({
  emblemUrl,
  isGeneratingImage,
  onGenerate,
}: EmblemStepProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <StepCard step={2} title={t("aidol:groupPlanning.step2Title")}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={t("aidol:groupPlanning.promptPlaceholder")}
        className="border-base-300 text-body-m placeholder:text-base-300 w-full rounded-lg border bg-white px-4 py-3 text-black focus:outline-none"
        maxLength={200}
        disabled={isGeneratingImage}
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGeneratingImage}
        className={clsx(
          "btn btn-lg text-label-l w-full rounded-lg border-0 py-4 text-white shadow-none",
          prompt.trim() && !isGeneratingImage ? "bg-primary" : "bg-primary/20",
        )}
      >
        {emblemUrl
          ? t("aidol:groupPlanning.regenerate")
          : t("aidol:groupPlanning.generate")}
      </button>
      <div className="border-base-300 flex h-72 items-center justify-center overflow-hidden rounded-lg border bg-white">
        {isGeneratingImage ? (
          <span className="loading loading-spinner loading-lg text-primary" />
        ) : emblemUrl ? (
          <ImagePreview url={emblemUrl} alt="emblem" />
        ) : (
          <div className="text-neutral flex flex-col items-center gap-4">
            <SparklesIcon className="size-6" />
            <p className="text-body-m text-center whitespace-pre-line">
              {t("aidol:groupPlanning.emptyImage")}
            </p>
          </div>
        )}
      </div>
    </StepCard>
  );
}
