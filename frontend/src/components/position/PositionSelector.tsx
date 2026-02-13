import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import type { Companion, Position } from "@/schemas";
import { POSITIONS } from "@/schemas";

interface PositionSelectorProps {
  selectedPosition: Position | null;
  companions: Companion[];
  currentCompanionId: string;
  onPositionChange: (position: Position) => void;
}

export function PositionSelector({
  selectedPosition,
  companions,
  currentCompanionId,
  onPositionChange,
}: PositionSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="dropdown dropdown-start w-full pb-10">
      <div
        tabIndex={0}
        role="button"
        className="border-base-300 text-body-m bg-base-200 text-base-content flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3"
      >
        {selectedPosition
          ? t(`aidol:position.${selectedPosition}`)
          : t("aidol:position.unassigned")}
        <ChevronDownIcon className="text-neutral size-4" />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu rounded-box bg-base-200 text-base-content mt-1 w-full shadow-sm"
      >
        {POSITIONS.map((position) => {
          const assignedTo = companions.find(
            (c) => c.id !== currentCompanionId && c.position === position,
          );
          const label = assignedTo
            ? t("aidol:position.assignedTo", {
                position: t(`aidol:position.${position}`),
                name: assignedTo.name,
              })
            : t(`aidol:position.${position}`);
          return (
            <li key={position}>
              <button
                type="button"
                disabled={!!assignedTo}
                className="text-body-m hover:bg-base-300/30 py-4"
                onClick={() => {
                  onPositionChange(position);
                  (document.activeElement as HTMLElement)?.blur();
                }}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
