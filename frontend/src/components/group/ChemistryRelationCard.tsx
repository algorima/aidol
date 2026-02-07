import { ArrowLongRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";

interface ChemistryRelationCardProps {
  fromName: string;
  toName: string;
  fromLabel?: string;
  toLabel?: string;
  nickname?: string;
  relationshipType?: string;
  onClose?: () => void;
  onClick?: () => void;
}

export function ChemistryRelationCard({
  fromName,
  toName,
  fromLabel,
  toLabel,
  nickname,
  relationshipType,
  onClose,
  onClick,
}: ChemistryRelationCardProps) {
  return (
    <div
      className={clsx(
        "bg-base-200 border-base-300 relative flex flex-col gap-2 rounded-lg border p-4",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleClickKeyDown(onClick) : undefined}
    >
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 cursor-pointer"
          aria-label="Close"
        >
          <XMarkIcon className="text-base-content size-5" />
        </button>
      )}

      {nickname && (
        <span className="text-label-l bg-base-content text-base-100 w-fit rounded-lg px-2 py-1">
          {nickname}
        </span>
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

      {relationshipType && (
        <span className="text-label-m text-neutral">{relationshipType}</span>
      )}
    </div>
  );
}
