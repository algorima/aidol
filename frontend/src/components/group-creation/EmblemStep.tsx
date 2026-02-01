import { SparklesIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import { ImagePreview } from "@/components/companion/ImagePreview";
import { StepCard } from "@/components/creation/StepCard";

import { Button } from "./Button";
import { TextInput } from "./TextInput";

interface EmblemStepProps {
  prompt: string;
  emblemUrl: string;
  isGeneratingImage: boolean;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
}

export function EmblemStep({
  prompt,
  emblemUrl,
  isGeneratingImage,
  onPromptChange,
  onGenerate,
}: EmblemStepProps) {
  const { t } = useTranslation();

  return (
    <StepCard step={2} title={t("aidol:groupPlanning.step2Title")}>
      <TextInput
        value={prompt}
        onChange={onPromptChange}
        placeholder={t("aidol:groupPlanning.promptPlaceholder")}
        maxLength={200}
        disabled={isGeneratingImage}
      />
      <Button
        onClick={onGenerate}
        disabled={!prompt.trim() || isGeneratingImage}
        variant="primary"
        className="w-full"
      >
        {emblemUrl
          ? t("aidol:groupPlanning.regenerate")
          : t("aidol:groupPlanning.generate")}
      </Button>
      <div className="border-base-300 bg-base-100 flex h-72 items-center justify-center overflow-hidden rounded-lg border">
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
