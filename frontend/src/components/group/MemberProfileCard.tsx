import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import type { Companion } from "@/schemas/companion";

interface MemberProfileCardProps {
  companion: Companion;
}

export function MemberProfileCard({ companion }: MemberProfileCardProps) {
  const { t } = useTranslation("aidol");
  const { name, profilePictureUrl, grade, mbti, position, biography } =
    companion;

  return (
    <div className="bg-base-200 flex flex-col gap-4 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="border-base-300 relative size-[70px] shrink-0 overflow-hidden rounded-lg border">
          {profilePictureUrl ? (
            <Image
              src={profilePictureUrl}
              alt={name ?? ""}
              fill
              draggable={false}
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <UserIcon className="text-base-content/50 size-1/2" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-title-s text-base-content font-bold">
            {name ?? ""}
          </span>
          {(grade || mbti || position) && (
            <div className="flex gap-1">
              {grade && (
                <span className="text-label-l bg-base-content text-base-100 rounded-lg px-2 py-1">
                  {t("companion.grade", { grade })}
                </span>
              )}
              {mbti && (
                <span className="text-label-l bg-base-content text-base-100 rounded-lg px-2 py-1">
                  {mbti}
                </span>
              )}
              {position && (
                <span className="text-label-l bg-base-content text-base-100 rounded-lg px-2 py-1">
                  {t(`position.${position}`)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {biography && (
        <div className="bg-base-100 rounded-lg p-2">
          <p className="text-body-s text-base-content">{biography}</p>
        </div>
      )}
    </div>
  );
}
