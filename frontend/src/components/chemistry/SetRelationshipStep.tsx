import clsx from "clsx";
import { Trans, useTranslation } from "react-i18next";

import {
  RELATIONSHIP_TYPE_TO_INTIMACY,
  type RelationshipType,
} from "@/constants/relationship";

const RELATIONSHIP_TYPES = Object.keys(
  RELATIONSHIP_TYPE_TO_INTIMACY,
) as RelationshipType[];

interface SetRelationshipStepProps {
  selectedType: RelationshipType;
  nickname: string;
  onTypeChange: (type: RelationshipType) => void;
  onNicknameChange: (nickname: string) => void;
}

export function SetRelationshipStep({
  selectedType,
  nickname,
  onTypeChange,
  onNicknameChange,
}: SetRelationshipStepProps) {
  const { t } = useTranslation();
  const intimacy = RELATIONSHIP_TYPE_TO_INTIMACY[selectedType];

  return (
    <>
      {/* 관계 유형 */}
      <p className="text-title-s mb-4">
        {t("aidol:chemistry.add.relationshipType")}
      </p>
      <div className="text-label-l mb-6 grid grid-flow-col grid-cols-2 grid-rows-4 gap-2">
        {RELATIONSHIP_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onTypeChange(type)}
            className={clsx(
              "btn flex-1 rounded-lg p-2.5",
              selectedType === type
                ? "bg-primary/20 text-primary border-primary"
                : "btn-outline border-base-300 text-base-content",
            )}
          >
            {t(`aidol:chemistry.add.types.${type}`)}
          </button>
        ))}
      </div>

      {/* 친밀도 */}
      <p className="text-title-s mb-2">{t("aidol:chemistry.add.intimacy")}</p>
      <p className="text-label-l mb-4">
        <Trans
          i18nKey="aidol:chemistry.add.startsAt"
          values={{ intimacy }}
          components={{ highlight: <span className="text-primary" /> }}
        />
      </p>
      <div className="bg-base-300 mb-6 h-2 w-full overflow-hidden rounded-full">
        <div
          className="to-secondary from-primary h-full rounded-full bg-linear-to-r transition-all"
          style={{ width: `${intimacy}%` }}
        />
      </div>

      {/* 관계 별칭 */}
      <p className="text-title-s mb-4">
        {t("aidol:chemistry.add.relationshipNickname")}
      </p>
      <input
        type="text"
        placeholder={t("aidol:chemistry.add.nicknamePlaceholder")}
        value={nickname}
        onChange={(e) => onNicknameChange(e.target.value)}
        className="input border-base-400 bg-base-200 text-body-s placeholder:text-base-400 w-full rounded-lg border px-4 py-3"
      />
    </>
  );
}
