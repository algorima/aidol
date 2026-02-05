"use client";

import { ShareIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { formatDate, getDaysSince } from "@/lib/date";

interface GroupProfileProps {
  profileImageUrl: string | null;
  name: string;
  createdAt: string;
  onChemistryClick: () => void;
  shareUrl: string;
}

export function GroupProfile({
  profileImageUrl,
  name,
  createdAt,
  onChemistryClick,
  shareUrl,
}: GroupProfileProps) {
  const { t } = useTranslation("aidol");
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-5">
        <div className="border-base-300 bg-base-200 relative size-20 shrink-0 overflow-hidden rounded-lg border">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="from-primary/20 to-secondary/20 flex size-full items-center justify-center bg-gradient-to-br">
              <UserGroupIcon className="text-base-content/50 size-10" />
            </div>
          )}
        </div>
        <div>
          <p className="text-label-l text-base-content font-bold">{name}</p>
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
        <button
          className="btn bg-base-300 text-base-content/60 text-label-l w-full rounded-lg"
          onClick={handleShare}
        >
          {copied ? t("urlCopied") : t("share")}
          <ShareIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
