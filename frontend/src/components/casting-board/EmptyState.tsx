import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  onBrowse: () => void;
}

export function EmptyState({ onBrowse }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base-200 flex flex-1 flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col gap-1 text-center">
        <p className="text-title-s text-base-content whitespace-pre-line">
          {t("aidol:castingBoard.empty.title")}
        </p>
        <p className="text-body-s text-neutral">
          {t("aidol:castingBoard.empty.description")}
        </p>
      </div>
      <button
        type="button"
        onClick={onBrowse}
        className="btn btn-primary btn-lg rounded-lg p-4"
      >
        <span className="text-label-l">{t("aidol:castingBoard.browse")}</span>
      </button>
    </div>
  );
}
