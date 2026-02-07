"use client";

import { ShareIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { formatDate, getDaysSince } from "@/lib/date";

interface GroupProfileProps {
  profileImageUrl: string | null;
  createdAt: string;
  onChemistryClick: () => void;
  onFollowClick?: () => void;
}

export function GroupProfile({
  profileImageUrl,
  createdAt,
  onChemistryClick,
  onFollowClick,
}: GroupProfileProps) {
  const { t } = useTranslation("aidol");

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-5">
        <div className="border-base-300 bg-base-200 relative size-20 shrink-0 overflow-hidden rounded-lg border">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={t("group.title")}
              fill
              className="object-cover"
            />
          ) : (
            <div className="from-primary/20 to-secondary/20 flex size-full items-center justify-center bg-gradient-to-br">
              <UserGroupIcon className="text-neutral size-10" />
            </div>
          )}
        </div>
        <div>
          <p className="text-label-l text-base-content font-bold">
            {t("group.title")}
          </p>
          <p className="text-label-l text-base-content font-bold">
            {formatDate(createdAt)} (D+{getDaysSince(createdAt)})
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="btn btn-primary text-label-l w-full rounded-lg"
          onClick={onChemistryClick}
        >
          {t("group.chemistryButton")}
        </button>
        {onFollowClick ? (
          <div className="flex gap-2">
            <button
              className="btn bg-base-300 text-base-content text-label-l flex-1 rounded-lg"
              onClick={onFollowClick}
            >
              {t("group.followButton")}
            </button>
            <button
              className="btn bg-base-300 text-base-content text-label-l flex-1 rounded-lg"
              disabled
            >
              {t("share")}
              <ShareIcon className="size-5" />
            </button>
          </div>
        ) : (
          <button
            className="btn bg-base-300 text-base-content text-label-l w-full rounded-lg"
            disabled
          >
            {t("share")}
            <ShareIcon className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
