import { useTranslation } from "react-i18next";

interface ErrorBubbleProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export function ErrorBubble({ isRetrying, onRetry }: ErrorBubbleProps) {
  const { t } = useTranslation("aidol");

  return (
    <div className="border-base-400 bg-base-200 flex max-w-50 flex-col gap-2 rounded-lg border p-2">
      <span className="text-body-s text-base-content">
        {isRetrying ? t("chat.typing") : t("chat.thinkingLong")}
      </span>
      <button
        className="bg-base-300 text-label-l text-base-content flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-1.5 shadow-sm"
        onClick={onRetry}
        disabled={isRetrying}
      >
        {isRetrying ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : (
          t("chat.reload")
        )}
      </button>
    </div>
  );
}
