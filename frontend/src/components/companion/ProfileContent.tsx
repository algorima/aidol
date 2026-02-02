import { useTranslation } from "react-i18next";

import type { Companion } from "@/schemas/companion";

import { ImagePreview } from "./ImagePreview";
import { RadarChart } from "./RadarChart";

interface ProfileContentProps {
  companion: Companion;
  /** 바이오그래피 표시 여부 (기본: true) */
  showBiography?: boolean;
  /** 능력치 표시 여부 (기본: true) */
  showStats?: boolean;
}

export function ProfileContent({
  companion,
  showBiography = true,
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
              <span className="text-label-l bg-base-content text-base-100 rounded-lg px-2 py-1">
                {t("aidol:companion.grade", { grade })}
              </span>
            )}
            {mbti && (
              <span className="text-label-l bg-base-content text-base-100 rounded-lg px-2 py-1">
                {mbti}
              </span>
            )}
          </div>
        )}
      </div>

      {showBiography && biography && (
        <p className="text-body-s text-base-content">{biography}</p>
      )}

      {showStats && stats && <RadarChart stats={stats} />}
    </div>
  );
}
