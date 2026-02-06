import { UserGroupIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";

import { HighlightCard } from "./HighlightCard";

interface GroupCardProps {
  avatarUrl: string | null;
  groupName: string;
  memberCount: number;
  highlightImageUrl: string;
  highlightTitle: string;
  onClick?: () => void;
}

export function GroupCard({
  avatarUrl,
  groupName,
  memberCount,
  highlightImageUrl,
  highlightTitle,
  onClick,
}: GroupCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={clsx("flex flex-col gap-4", onClick && "cursor-pointer")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleClickKeyDown(onClick) : undefined}
    >
      <div className="flex items-center gap-2">
        <div className="border-base-300 bg-base-200 relative size-12 shrink-0 overflow-hidden rounded-lg border">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={groupName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <UserGroupIcon className="text-neutral size-6" />
            </div>
          )}
        </div>
        <p className="text-title-s text-base-content">
          {groupName} .{" "}
          {t("aidol:groupList.memberCount", { count: memberCount })}
        </p>
      </div>
      <HighlightCard imageUrl={highlightImageUrl} title={highlightTitle} />
    </div>
  );
}
