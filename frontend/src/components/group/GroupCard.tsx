import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";

import { HighlightCard } from "./HighlightCard";

interface GroupCardProps {
  avatarUrl: string;
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
      className={clsx("flex flex-col gap-3", onClick && "cursor-pointer")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleClickKeyDown(onClick) : undefined}
    >
      <div className="flex items-center gap-3">
        <div className="border-base-300 relative size-12 shrink-0 overflow-hidden rounded-full border">
          <Image
            src={avatarUrl}
            alt={groupName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-title-s text-base-content">{groupName}</span>
          <span className="text-body-s text-base-content/60">
            {t("aidol:groupList.memberCount", { count: memberCount })}
          </span>
        </div>
      </div>
      <HighlightCard imageUrl={highlightImageUrl} title={highlightTitle} />
    </div>
  );
}
