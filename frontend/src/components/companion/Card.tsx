import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Companion } from "@/schemas";

import { ImagePreview } from "./ImagePreview";

type CardVariant = "grade" | "position" | "castingBoard";

interface CardProps {
  companion: Companion;
  variant?: CardVariant;
  onClick?: () => void;
}

export function Card({ companion, variant = "grade", onClick }: CardProps) {
  const { t } = useTranslation();
  const isSigned = companion.aidolId !== null;
  const showSignedOverlay = isSigned && variant === "grade";
  const isClickable = onClick && !showSignedOverlay;

  const gradientOpacity =
    variant === "position"
      ? "opacity-30"
      : showSignedOverlay
        ? "opacity-20"
        : "opacity-60";

  const badgeText =
    variant === "position"
      ? companion.position
        ? t(`aidol:position.${companion.position}`)
        : t("aidol:position.unassigned")
      : t("companion.grade", { grade: companion.grade });

  return (
    <div
      className={clsx(
        "h-card max-w-card border-base-300 relative isolate w-full overflow-hidden rounded-lg border",
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
          alt={companion.name ?? ""}
          variant="profile"
        />
      </div>

      {showSignedOverlay && (
        <>
          <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm" />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-base-100 text-body-s text-base-content w-fit rounded-lg px-2 py-1">
              {t("companion.signed")}
            </span>
          </div>
        </>
      )}

      <div
        className={clsx(
          "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent",
          gradientOpacity,
        )}
      />

      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-2">
        <span className="text-title-s text-white">{companion.name}</span>
        <span className="text-body-s w-fit rounded-lg bg-black px-2 py-1 text-white">
          {badgeText}
        </span>
      </div>
    </div>
  );
}
