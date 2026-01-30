import clsx from "clsx";
import { useTranslation } from "react-i18next";

import type { Gender } from "@/schemas/companion";

interface GenderSelectorProps {
  value: Gender | null;
  onChange: (gender: Gender) => void;
}

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  const { t } = useTranslation();

  const options: { gender: Gender; label: string }[] = [
    { gender: "female", label: t("aidol:companionCreate.gender.female") },
    { gender: "male", label: t("aidol:companionCreate.gender.male") },
  ];

  return (
    <div className="flex gap-4">
      {options.map(({ gender, label }) => (
        <button
          key={gender}
          type="button"
          onClick={() => onChange(gender)}
          className={clsx(
            "text-label-l flex-1 rounded-lg border px-6 py-3 transition-colors",
            value === gender
              ? "border-primary bg-primary/10 text-primary"
              : "border-base-300 bg-base-100 text-base-content",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
