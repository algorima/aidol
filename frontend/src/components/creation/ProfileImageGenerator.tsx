import { SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface ProfileImageGeneratorProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  imageUrl: string | null;
  hasGenerated: boolean;
}

export function ProfileImageGenerator({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  imageUrl,
  hasGenerated,
}: ProfileImageGeneratorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder={t("aidol:companionCreate.image.promptPlaceholder")}
        className="input w-full bg-white text-black"
      />
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="btn btn-primary w-full"
      >
        {isGenerating && <span className="loading loading-spinner" />}
        {hasGenerated
          ? t("aidol:companionCreate.image.regenerate")
          : t("aidol:companionCreate.image.generate")}
      </button>

      {imageUrl ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt="Generated profile"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="border-base-300 bg-base-100 flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-lg border">
          <SparklesIcon className="text-neutral size-6" />
          <p className="text-body-m text-neutral text-center whitespace-pre-line">
            {t("aidol:companionCreate.image.placeholder")}
          </p>
        </div>
      )}
    </div>
  );
}
