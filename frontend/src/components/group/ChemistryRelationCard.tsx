import { ArrowLongRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";

interface ChemistryRelationCardProps {
  fromName: string;
  toName: string;
  fromLabel?: string;
  toLabel?: string;
  relationshipType?: string;
  description?: string;
  onClose?: () => void;
  onClick?: () => void;
}

export function ChemistryRelationCard({
  fromName,
  toName,
  fromLabel,
  toLabel,
  relationshipType,
  description,
  onClose,
  onClick,
}: ChemistryRelationCardProps) {
  const { t } = useTranslation("aidol");

  return (
    <div
      className={clsx(
        "bg-base-200 border-base-400 flex flex-col gap-2 rounded-lg border p-4",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleClickKeyDown(onClick) : undefined}
    >
      {relationshipType && (
        <div className="flex items-center justify-between">
          <span className="text-label-l bg-base-content text-base-100 rounded-lg px-2 py-1">
            {relationshipType}
          </span>
          {onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label={t("common.close")}
            >
              <XMarkIcon className="text-base-content size-5" />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-body-s text-base-content">{fromName}</span>
        <ArrowLongRightIcon className="text-base-content size-5" />
        <span className="text-body-s text-base-content">{toName}</span>
      </div>

      {!relationshipType && fromLabel && toLabel && (
        <span className="text-label-m text-neutral">
          {fromLabel} — {toLabel}
        </span>
      )}

      {relationshipType && description && (
        <span className="text-label-m text-neutral">{description}</span>
      )}
    </div>
  );
}
