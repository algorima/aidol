import clsx from "clsx";
import Image from "next/image";

import type { AIdol } from "@/schemas/aidol";

interface GroupDropdownProps {
  groups: AIdol[];
  selectedGroupId: string | null;
  onSelect: (group: AIdol) => void;
  onClose: () => void;
}

export function GroupDropdown({
  groups,
  selectedGroupId,
  onSelect,
  onClose,
}: GroupDropdownProps) {
  return (
    <>
      {/* 바깥 클릭 감지용 오버레이 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="bg-base-100 border-base-400 absolute top-15 left-6 z-50 w-49.5 overflow-hidden rounded-lg border shadow-md">
        {groups.map((group, index) => (
          <button
            key={group.id}
            type="button"
            onClick={() => onSelect(group)}
            className={clsx("flex w-full items-center gap-2.5 p-2", {
              "border-base-400 border-b": index !== groups.length - 1,
              "bg-base-400": selectedGroupId === group.id,
              "hover:bg-base-200": selectedGroupId !== group.id,
            })}
          >
            {/* 그룹 이미지 */}
            <div className="border-base-300 bg-base-200 size-10 shrink-0 overflow-hidden rounded-lg border">
              {group.profileImageUrl && (
                <Image
                  src={group.profileImageUrl}
                  alt={group.name ?? ""}
                  width={40}
                  height={40}
                  className="size-full object-cover"
                />
              )}
            </div>
            {/* 그룹 이름 */}
            <span className="text-body-s text-base-content truncate">
              {group.name}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
