"use client";

import { ShareIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface GroupProfileProps {
  profileImageUrl: string | null;
  name: string;
  createdAt: string;
  onChemistryClick: () => void;
  shareUrl: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const getDaysSince = (dateStr: string) => {
  const created = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
};

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
          className="bg-base-300 text-base-content/60 text-label-l flex w-full items-center justify-center gap-2 rounded-lg p-4 font-bold"
          onClick={handleShare}
        >
          {copied ? t("urlCopied") : t("share")}
          <ShareIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}
