import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [style, setStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 0,
  });

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const top = rect.bottom + 4;
      const maxHeight = window.innerHeight - top - 16;
      setStyle({ top, left: rect.left, width: rect.width, maxHeight });
    };

    updatePosition();

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        ref={triggerRef}
        type="button"
        className="border-base-300 text-body-m bg-base-200 text-base-content flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedPosition
          ? t(`aidol:position.${selectedPosition}`)
          : t("aidol:position.unassigned")}
        <ChevronDownIcon className="text-neutral size-4" />
      </button>
      {isOpen &&
        createPortal(
          <ul
            ref={listRef}
            className="bg-base-200 text-base-content rounded-box fixed z-50 overflow-y-auto shadow-sm"
            style={{
              top: style.top,
              left: style.left,
              width: style.width,
              maxHeight: style.maxHeight,
            }}
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
                    className="text-body-m hover:bg-base-300/30 w-full cursor-pointer p-4 text-left"
                    onClick={() => {
                      onPositionChange(position);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>,
          triggerRef.current?.closest("dialog") ?? document.body,
        )}
    </div>
  );
}
