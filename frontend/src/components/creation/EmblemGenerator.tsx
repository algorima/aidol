"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { TextInput } from "@/components/group-creation/TextInput";

interface EmblemGeneratorProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  disabled?: boolean;
}

/**
 * Emblem image generation input (Presentational)
 * Follows ImageUpload pattern: input + loading state only
 * Preview is handled by parent component
 */
export function EmblemGenerator({
  onGenerate,
  isGenerating,
  disabled,
}: EmblemGeneratorProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && prompt.trim() && !isGenerating && !disabled) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <fieldset className="fieldset w-full">
      <div className="flex gap-2">
        <TextInput
          value={prompt}
          onChange={setPrompt}
          onKeyDown={handleKeyDown}
          placeholder={t("aidol:creation.emblemPromptPlaceholder")}
          maxLength={200}
          disabled={disabled || isGenerating}
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={disabled || isGenerating || !prompt.trim()}
          className="btn btn-secondary"
          data-testid="emblem-generate-button"
        >
          {isGenerating ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            t("aidol:creation.generate")
          )}
        </button>
      </div>
      {isGenerating && (
        <div className="mt-2">
          <progress className="progress w-full"></progress>
        </div>
      )}
    </fieldset>
  );
}
