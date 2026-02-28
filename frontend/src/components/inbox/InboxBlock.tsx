import clsx from "clsx";
import { useTranslation } from "react-i18next";

import type { Activity } from "@/constants/activity";

import { ActivityBadge } from "../common/ActivityBadge";
import { CompanionAvatar } from "../common/CompanionAvatar";

interface InboxBlockProps {
  name: string;
  imageUrl?: string | null;
  active: boolean;
  pending?: boolean;
  activity?: Activity;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  onClick?: () => void;
}

export function InboxBlock({
  name,
  imageUrl,
  active,
  pending = false,
  activity,
  lastMessage,
  lastMessageAt,
  onClick,
}: InboxBlockProps) {
  const { t } = useTranslation("aidol");

  const showActive = active || pending;
  const subtitle = pending
    ? t("inbox.waitingForResponse")
    : active
      ? lastMessage
      : t("inbox.meetSoon");

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-3 px-6 py-4",
        pending && "opacity-50",
      )}
    >
      <CompanionAvatar imageUrl={imageUrl} name={name} active={showActive} />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-0 items-center gap-1 pr-2">
            <span className="text-title-s text-base-content max-w-[140px] truncate">
              {name}
            </span>
            {showActive && activity && <ActivityBadge activity={activity} />}
          </div>
          {showActive && lastMessageAt && (
            <span className="text-label-m text-base-content shrink-0 opacity-50">
              {lastMessageAt}
            </span>
          )}
        </div>

        <span className="text-body-s text-base-content w-full truncate text-left opacity-50">
          {subtitle}
        </span>
      </div>
    </button>
  );
}
