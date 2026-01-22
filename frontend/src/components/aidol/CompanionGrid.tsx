"use client";

import { useTranslation } from "react-i18next";

import { Card } from "@/components/companion/Card";
import type { Companion } from "@/schemas";

export interface CompanionGridProps {
  companions: Companion[] | undefined;
  onCompanionClick: (companionId: string) => void;
}

/**
 * Companion 카드 그리드 (Presentational)
 * 멤버 목록 제목, 그리드 레이아웃, 빈 상태 표시
 */
export function CompanionGrid({
  companions,
  onCompanionClick,
}: CompanionGridProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-title-l font-semibold">
        {t("aidol:aidol.members")}
      </h2>
      {companions && companions.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {companions.map((companion) => (
            <Card
              key={companion.id}
              companion={companion}
              onClick={() => onCompanionClick(companion.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-base-content/50">
          {t("aidol:aidol.noMembers")}
        </p>
      )}
    </div>
  );
}
