import { useTranslation } from "react-i18next";

import type { Companion } from "@/schemas/companion";

import { ImagePreview } from "./ImagePreview";
import { RadarChart } from "./RadarChart";

interface ProfileContentProps {
  companion: Companion;
  /** 능력치 표시 여부 (기본: true) */
  showStats?: boolean;
}

export function ProfileContent({
  companion,
  showStats = true,
}: ProfileContentProps) {
  const { t } = useTranslation();
  const { name, profilePictureUrl, grade, mbti, biography, stats } = companion;

  return (
    <div className="flex flex-col items-center gap-6">
      <ImagePreview url={profilePictureUrl ?? null} alt={name ?? ""} />
      <div className="flex flex-col gap-2 self-start">
        <h2 className="text-title-s text-base-content font-semibold">
          {name ?? ""}
        </h2>
        {(grade || mbti) && (
          <div className="flex gap-2">
            {grade && (
              <span className="text-label-l rounded-lg bg-black px-2 py-1 text-white">
                {t("aidol:companion.grade", { grade })}
              </span>
            )}
            {mbti && (
              <span className="text-label-l rounded-lg bg-black px-2 py-1 text-white">
                {mbti}
              </span>
            )}
          </div>
        )}
      </div>

      {biography && (
        <p className="text-body-s text-base-content">{biography}</p>
      )}

      {showStats && stats && <RadarChart stats={stats} />}
    </div>
  );
}
