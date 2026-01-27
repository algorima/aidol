"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim() && !isGenerating && !disabled) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="form-control w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("aidol:creation.emblemPromptPlaceholder")}
          maxLength={200}
          className="input-bordered input flex-1"
          disabled={disabled || isGenerating}
          data-testid="emblem-prompt-input"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={disabled || isGenerating || !prompt.trim()}
          className="btn btn-secondary"
          data-testid="emblem-generate-button"
        >
          {isGenerating ? (
            <span className="loading loading-sm loading-spinner" />
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
    </div>
  );
}
