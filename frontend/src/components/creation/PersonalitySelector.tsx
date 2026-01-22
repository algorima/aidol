"use client";

import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface PersonalityOption {
  value: string;
  label: string;
  description?: string;
}

interface PersonalitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: PersonalityOption[];
}

/**
 * Radio group selector for companion personality.
 */
export function PersonalitySelector({
  value,
  onChange,
  options,
}: PersonalitySelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-base-content">
          {t("aidol:creation.personality")}
        </span>
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
              value === option.value
                ? "border-primary bg-primary/10"
                : "border-base-300 hover:border-base-content/30",
            )}
          >
            <input
              type="radio"
              name="personality"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="radio-primary radio mt-0.5"
            />
            <div>
              <div className="font-medium text-base-content">
                {option.label}
              </div>
              {option.description && (
                <div className="mt-1 text-body-s text-base-content/70">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
