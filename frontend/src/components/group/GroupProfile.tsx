import { UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { formatDate, getDaysSince } from "@/lib/date";

interface GroupProfileProps {
  name: string;
  profileImageUrl: string | null;
  createdAt: string;
  onChemistryClick: () => void;
  onFollowClick?: () => void;
}

export function GroupProfile({
  name,
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
              alt={name}
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
          <p className="text-label-l text-base-content">{name}</p>
          <p className="text-label-l text-base-content">
            {formatDate(createdAt)} (D+{getDaysSince(createdAt)})
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="btn bg-base-300 text-label-l h-auto min-h-0 w-full rounded-lg py-3 shadow-[0_0_4px_rgba(0,0,0,0.1)]"
          onClick={onChemistryClick}
        >
          {t("group.chemistryButton")}
        </button>
        {onFollowClick && (
          <div className="flex gap-2">
            <button
              className="btn bg-base-100 border-base-400 text-base-content text-label-l h-auto min-h-0 w-full rounded-lg border py-3"
              onClick={onFollowClick}
            >
              {t("group.followButton")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
