import clsx from "clsx";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import checkAnimation from "@/assets/lottie/check.json";
import { Card } from "@/components/companion/Card";
import type { Companion } from "@/schemas";

import { EmptyState } from "./EmptyState";

interface CastingBoardProps {
  companions: Companion[];
  isLoading: boolean;
  onBrowse: () => void;
  onCardClick: (companion: Companion) => void;
  onConfirm: () => void;
}

const MIN_MEMBERS = 2;

export function CastingBoard({
  companions,
  isLoading,
  onBrowse,
  onCardClick,
  onConfirm,
}: CastingBoardProps) {
  const { t } = useTranslation();

  const canConfirm = companions.length >= MIN_MEMBERS;
  const isEmpty = companions.length === 0;

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyState onBrowse={onBrowse} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <Lottie
              animationData={checkAnimation}
              loop={false}
              className="-mb-1 -ml-1.5 size-8"
            />
            <span className="text-title-s text-base-content">
              {t("aidol:castingBoard.title")}
            </span>
          </div>
          <p className="text-body-s text-neutral">
            {t("aidol:castingBoard.subtitle")}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          {companions.map((companion) => (
            <Card
              key={companion.id}
              companion={companion}
              variant="castingBoard"
              onClick={() => onCardClick(companion)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-mobile fixed inset-x-0 bottom-0 mx-auto px-6 pb-6">
        <button
          type="button"
          onClick={canConfirm ? onConfirm : undefined}
          disabled={!canConfirm}
          className={clsx(
            "btn btn-lg text-label-l w-full rounded-lg",
            canConfirm ? "btn-primary" : "bg-base-300 text-base-content",
          )}
        >
          {canConfirm
            ? t("aidol:castingBoard.confirm")
            : t("aidol:castingBoard.needMore", {
                count: MIN_MEMBERS - companions.length,
              })}
        </button>
      </div>
    </div>
  );
}
