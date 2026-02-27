import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import type { Activity } from "@/constants/activity";

import { ActivityBadge, CompanionAvatar } from "../common";

interface ChatHeaderProps {
  companionName?: string;
  companionImageUrl?: string | null;
  activity: Activity;
  onBack?: () => void;
}

export function ChatHeader({
  companionName,
  companionImageUrl,
  activity,
  onBack,
}: ChatHeaderProps) {
  return (
    <header className="bg-base-100 flex items-center justify-between gap-1 px-6 py-4">
      <div className="flex min-w-0 items-center gap-2">
        <button type="button" onClick={onBack} className="cursor-pointer">
          <ArrowLeftIcon
            className="text-base-content size-5 shrink-0"
            strokeWidth={2}
          />
        </button>
        <CompanionAvatar
          imageUrl={companionImageUrl ?? undefined}
          name={companionName ?? ""}
          size="sm"
          active
        />
        <span className="truncate">{companionName ?? ""}</span>
      </div>
      <ActivityBadge activity={activity} className="shrink-0" />
    </header>
  );
}
