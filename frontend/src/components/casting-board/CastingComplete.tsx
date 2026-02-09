import { HeartIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

interface CastingCompleteProps {
  remainingSlots: number | null;
  onFindNext: () => void;
  onViewBoard: () => void;
}

export function CastingComplete({
  remainingSlots,
  onFindNext,
  onViewBoard,
}: CastingCompleteProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base-100 flex min-h-dvh w-full flex-col items-center justify-center gap-12 px-6 py-12">
      <HeartIcon className="text-primary size-20 shrink-0" />

      <div className="flex w-full flex-col gap-3 text-center">
        <h2 className="text-display-s text-base-content">
          {t("aidol:castingComplete.title")}
        </h2>
        <p className="text-headline-s text-neutral">
          {t("aidol:castingComplete.subtitle")}
        </p>
      </div>

      {remainingSlots !== null && (
        <div className="border-base-300 bg-base-200 flex shrink-0 items-center gap-2 rounded-lg border p-4">
          <span className="text-title-s text-base-content">
            {t("aidol:castingComplete.remainingSlots")}
          </span>
          <span className="text-title-s text-primary">{remainingSlots}</span>
        </div>
      )}

      <div className="flex w-full gap-4">
        <button
          type="button"
          onClick={onFindNext}
          disabled={remainingSlots !== null && remainingSlots <= 0}
          className="btn btn-lg btn-neutral text-label-l flex-1 rounded-lg"
        >
          {t("aidol:castingComplete.findNext")}
        </button>
        <button
          type="button"
          onClick={onViewBoard}
          className="btn btn-lg btn-primary text-label-l flex-1 rounded-lg"
        >
          {t("aidol:castingComplete.viewBoard")}
        </button>
      </div>
    </div>
  );
}
