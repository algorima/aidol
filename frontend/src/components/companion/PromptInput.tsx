import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface PromptInputProps {
  placeholder?: string;
  maxLength?: number;
  charCount?: number;
}

/**
 * Textarea for entering companion system prompt or personality description.
 * Supports react-hook-form register() via forwardRef.
 */
export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  ({ placeholder, maxLength = 500, charCount, ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          placeholder={placeholder ?? t("aidol:companion.promptPlaceholder")}
          maxLength={maxLength}
          className="textarea textarea-bordered h-32 w-full resize-none bg-base-100 text-base-content placeholder:text-base-content/50 focus:border-primary focus:outline-none"
          {...props}
        />
        <div className="mt-1 text-right text-label-s text-base-content/50">
          {charCount ?? 0}/{maxLength}
        </div>
      </div>
    );
  },
);

PromptInput.displayName = "PromptInput";
