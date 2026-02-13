import { SparklesIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
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
      <textarea
        value={prompt}
        onChange={(e) => {
          onPromptChange(e.target.value);
          const target = e.target;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        placeholder={t("aidol:companionCreate.image.promptPlaceholder")}
        className="textarea border-base-400 bg-base-200 min-h-0 w-full resize-none overflow-hidden rounded-lg px-4 py-3"
        rows={1}
      />
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className={clsx(
          "btn btn-lg text-label-l w-full rounded-lg",
          hasGenerated ? "bg-base-300 text-base-content" : "btn-primary",
        )}
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
