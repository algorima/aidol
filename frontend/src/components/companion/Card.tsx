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
        "h-card max-w-card border-base-300 relative w-full overflow-hidden rounded-lg border",
        isClickable && "cursor-pointer",
      )}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="absolute inset-0">
        <ImagePreview
          url={companion.profilePictureUrl}
          alt={companion.name}
          variant="profile"
        />
      </div>

      {isSigned && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm" />
      )}

      {isSigned && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-base-100 text-body-s text-base-content w-fit rounded-lg px-2 py-1">
            {t("companion.signed")}
          </span>
        </div>
      )}

      <div
        className={clsx(
          "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent",
          isSigned && "opacity-20",
          isPosition && "opacity-30",
          !isSigned && !isPosition && "opacity-60",
        )}
      />

      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-2">
        <span className="text-title-s text-white">{companion.name}</span>

        {!isPosition && (
          <span className="text-body-s w-fit rounded-lg bg-black px-2 py-1 text-white">
            {t("companion.grade", { grade: companion.grade })}
          </span>
        )}
        {isPosition && (
          <span className="bg-base-100 text-body-s text-base-content w-fit rounded-lg px-2 py-1">
            {companion.position}
          </span>
        )}
      </div>
    </div>
  );
}
