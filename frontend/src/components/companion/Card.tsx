import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";
import { Companion } from "@/schemas";

import { ImagePreview } from "./ImagePreview";

type CardVariant = "grade" | "position" | "castingBoard";

interface CardProps {
  companion: Companion;
  variant?: CardVariant;
  onClick?: () => void;
  overlayText?: string;
  disabled?: boolean;
  className?: string;
}

export function Card({
  companion,
  variant = "grade",
  onClick,
  overlayText,
  disabled,
  className,
}: CardProps) {
  const { t } = useTranslation();
  const isSigned = companion.aidolId !== null;
  const showSignedOverlay = isSigned && variant === "grade";
  const isClickable = onClick && !showSignedOverlay && !disabled;

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
        "border-base-300 relative isolate overflow-hidden rounded-lg border",
        !className && "h-card max-w-card w-full",
        isClickable && "cursor-pointer",
        className,
      )}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleClickKeyDown(onClick) : undefined}
    >
      <div className="absolute inset-0">
        <ImagePreview
          url={companion.profilePictureUrl}
          alt={companion.name ?? ""}
          variant="profile"
        />
      </div>

      {(showSignedOverlay || disabled) && (
        <>
          <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm" />
          {(showSignedOverlay || overlayText) && (
            <div className="absolute top-4 left-4 z-20">
              <span className="text-body-s w-fit rounded-lg bg-black px-2 py-1 text-white">
                {showSignedOverlay ? t("companion.signed") : overlayText}
              </span>
            </div>
          )}
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
