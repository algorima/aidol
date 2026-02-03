"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { ShareButton } from "../ShareButton";

interface GroupProfileProps {
  profileImageUrl: string | null;
  name: string;
  season?: string;
  date?: string;
  onChemistryClick: () => void;
  shareUrl: string;
}

export function GroupProfile({
  profileImageUrl,
  name,
  season,
  date,
  onChemistryClick,
  shareUrl,
}: GroupProfileProps) {
  const { t } = useTranslation("aidol");

  const metadata = [season, date].filter(Boolean).join(" \u00B7 ");

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="bg-base-200 relative size-20 overflow-hidden rounded-full">
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
        <h2 className="text-headline-s text-base-content">{name}</h2>
        {metadata && (
          <p className="text-body-s text-base-content/70 mt-1">{metadata}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="btn btn-primary text-label-l"
          onClick={onChemistryClick}
        >
          {t("group.chemistryButton")}
        </button>
        <ShareButton url={shareUrl} />
      </div>
    </div>
  );
}
