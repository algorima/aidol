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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && prompt.trim() && !isGenerating && !disabled) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <fieldset className="fieldset w-full">
      <div className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            const target = e.target;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
          onKeyDown={handleKeyDown}
          placeholder={t("aidol:creation.emblemPromptPlaceholder")}
          maxLength={200}
          className="textarea border-base-400 bg-base-200 min-h-0 flex-1 resize-none overflow-hidden rounded-lg px-4 py-3"
          disabled={disabled || isGenerating}
          data-testid="emblem-prompt-input"
          rows={1}
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
