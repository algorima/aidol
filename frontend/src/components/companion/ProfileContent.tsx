import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { Companion } from "@/schemas/companion";

import { ImagePreview } from "./ImagePreview";
import { RadarChart } from "./RadarChart";

interface ProfileContentProps {
  companion: Companion;
  /** 능력치 탭 표시 여부 (기본: true) */
  showStats?: boolean;
}

export function ProfileContent({
  companion,
  showStats: enableStats = true,
}: ProfileContentProps) {
  const { t } = useTranslation();
  const { name, profilePictureUrl, grade, mbti, biography, stats } = companion;
  const [showStatsTab, setShowStatsTab] = useState(false);
  const hasStats = enableStats && stats;

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

      {hasStats && (
        <div className="flex w-full flex-col gap-4">
          <div className="bg-base-200 flex rounded-lg p-1">
            <button
              type="button"
              onClick={() => setShowStatsTab(false)}
              className={clsx(
                "text-label-m flex-1 cursor-pointer rounded-md py-2 transition-colors",
                !showStatsTab
                  ? "bg-base-100 text-base-content"
                  : "text-base-content/50",
              )}
            >
              {t("aidol:companion.tab.profile")}
            </button>
            <button
              type="button"
              onClick={() => setShowStatsTab(true)}
              className={clsx(
                "text-label-m flex-1 cursor-pointer rounded-md py-2 transition-colors",
                showStatsTab
                  ? "bg-base-100 text-base-content"
                  : "text-base-content/50",
              )}
            >
              {t("aidol:companion.tab.stats")}
            </button>
          </div>

          {showStatsTab ? (
            <RadarChart stats={stats} />
          ) : (
            biography && (
              <p className="text-body-s text-base-content">{biography}</p>
            )
          )}
        </div>
      )}

      {!hasStats && biography && (
        <p className="text-body-s text-base-content">{biography}</p>
      )}
    </div>
  );
}
