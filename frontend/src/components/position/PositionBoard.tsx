import { LottiePlayer } from "@aioia/core/client";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/companion/Card";
import { Loading } from "@/components/Loading";
import { CHECK_LOTTIE } from "@/constants/assets";
import type { Companion } from "@/schemas";

interface PositionBoardProps {
  companions: Companion[];
  isLoading: boolean;
  onCardClick: (companion: Companion) => void;
  onConfirm: () => void;
}

export function PositionBoard({
  companions,
  isLoading,
  onCardClick,
  onConfirm,
}: PositionBoardProps) {
  const { t } = useTranslation();

  const unassignedCount = companions.filter((c) => !c.position).length;
  const canConfirm = unassignedCount === 0 && companions.length > 0;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col items-start">
            <div className="-mb-1 -ml-2">
              <LottiePlayer
                src={CHECK_LOTTIE.light}
                autoplay
                loop={false}
                className="block size-9 dark:hidden"
                {...({ keepLastFrame: true } as object)}
              />
              <LottiePlayer
                src={CHECK_LOTTIE.dark}
                autoplay
                loop={false}
                className="hidden size-9 dark:block"
                {...({ keepLastFrame: true } as object)}
              />
            </div>
            <span className="text-title-s text-base-content">
              {t("aidol:position.title")}
            </span>
          </div>
          <p className="text-body-s text-neutral">
            {t("aidol:position.subtitle")}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          {companions.map((companion) => (
            <Card
              key={companion.id}
              companion={{
                ...companion,
                position: companion.position
                  ? t(`aidol:position.${companion.position}`)
                  : t("aidol:position.unassigned"),
              }}
              variant="position"
              onClick={() => onCardClick(companion)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-mobile fixed inset-x-0 bottom-0 z-10 mx-auto px-6 pb-6">
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
            ? t("aidol:position.confirm")
            : t("aidol:position.needMore", { count: unassignedCount })}
        </button>
      </div>
    </div>
  );
}
