import clsx from "clsx";

import type { Activity } from "@/constants/activity";

import { ActivityBadge } from "../common/ActivityBadge";
import { CompanionAvatar } from "../common/CompanionAvatar";

interface InboxBlockProps {
  name: string;
  imageUrl?: string | null;
  active: boolean;
  activity?: Activity;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  onClick?: () => void;
}

export function InboxBlock({
  name,
  imageUrl,
  active,
  activity,
  lastMessage,
  lastMessageAt,
  onClick,
}: InboxBlockProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-6 py-4"
    >
      <CompanionAvatar imageUrl={imageUrl} name={name} active={active} />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-0 items-center gap-1 pr-2">
            <span className="text-title-s text-base-content max-w-[140px] truncate">
              {name}
            </span>
            {active && activity && <ActivityBadge activity={activity} />}
          </div>
          {lastMessageAt && (
            <span
              className={clsx(
                "text-label-m text-base-content shrink-0",
                active ? "opacity-50" : "opacity-0",
              )}
            >
              {lastMessageAt}
            </span>
          )}
        </div>

        {lastMessage && (
          <span className="text-body-s text-base-content w-full truncate text-left opacity-50">
            {lastMessage}
          </span>
        )}
      </div>
    </button>
  );
}
