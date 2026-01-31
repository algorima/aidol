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
    <div className="dropdown dropdown-start w-full">
      <div
        tabIndex={0}
        role="button"
        className="border-base-300 text-body-m flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-black"
      >
        {selectedPosition
          ? t(`aidol:position.${selectedPosition}`)
          : t("aidol:position.unassigned")}
        <ChevronDownIcon className="text-neutral size-4" />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu rounded-box mt-1 w-full bg-white text-black shadow-sm"
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
