import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Companion } from "@/schemas";

import { ImagePreview } from "./ImagePreview";

type CardVariant = "grade" | "position";

interface CardProps {
  companion: Companion;
  variant?: CardVariant;
  onClick?: () => void;
}

export function Card({ companion, variant = "grade", onClick }: CardProps) {
  const { t } = useTranslation();
  const isSigned = companion.aidolId !== null;
  const isPosition = variant === "position";
  const isClickable = onClick && !isSigned;

  return (
    <div
      className={clsx(
        "relative h-card w-full max-w-card overflow-hidden rounded-lg border border-base-300",
        isClickable && "cursor-pointer",
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {/* 1. 배경 이미지 */}
      <div className="absolute inset-0">
        <ImagePreview
          url={companion.profilePictureUrl}
          alt={companion.name}
          variant="profile"
        />
      </div>

      {/* 2. 계약 완료 시 블러 */}
      {isSigned && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm" />
      )}

      {/* 3. 블러 위 계약 완료 레이어 */}
      {isSigned && (
        <div className="absolute left-4 top-4 z-20">
          <span className="w-fit rounded-lg bg-base-100 px-2 py-1 text-body-s text-base-content">
            {t("companion.signed")}
          </span>
        </div>
      )}

      {/* 4. 기존 하단 그라데이션 */}
      <div
        className={clsx(
          "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent",
          isSigned && "opacity-20",
          isPosition && "opacity-30",
          !isSigned && !isPosition && "opacity-60",
        )}
      />

      {/* 5. 이름 + 등급 */}
      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-2">
        <span className="text-title-s text-white">{companion.name}</span>

        {!isPosition && (
          <span className="w-fit rounded-lg bg-black px-2 py-1 text-body-s text-white">
            {t("companion.grade", { grade: companion.grade })}
          </span>
        )}
        {isPosition && (
          <span className="w-fit rounded-lg bg-base-100 px-2 py-1 text-body-s text-base-content">
            {companion.position}
          </span>
        )}
      </div>
    </div>
  );
}
