import { useTranslation } from "react-i18next";

import type { CompanionAbilities } from "@/schemas/companion";

interface AbilityChartProps {
  abilities: CompanionAbilities;
}

const ABILITY_KEYS: (keyof CompanionAbilities)[] = [
  "vocal",
  "dance",
  "visual",
  "acting",
  "rap",
];

export function AbilityChart({ abilities }: AbilityChartProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-title-s text-base-content">
        {t("aidol:casting.abilities.title")}
      </h3>
      <div className="flex flex-col gap-2">
        {ABILITY_KEYS.map((key) => {
          const value = abilities[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-label-l text-base-content w-14 shrink-0">
                {t(`aidol:casting.abilities.${key}`)}
              </span>
              <div className="bg-base-300 relative h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className="bg-primary absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-label-s text-base-content/60 w-8 text-right">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
