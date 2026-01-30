import { useTranslation } from "react-i18next";

interface CompanionNameInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function CompanionNameInput({
  value,
  onChange,
  maxLength = 10,
}: CompanionNameInputProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
              .replace(/[!@#$%^&*()+=[\]{}|\\;:'",.<>?/`~_]/g, "")
              .slice(0, maxLength),
          )
        }
        placeholder={t("aidol:companionCreate.complete.namePlaceholder")}
        className="input w-full"
      />
      <span className="text-label-m text-base-content/50 text-right">
        {value.length}/{maxLength}
      </span>
    </div>
  );
}
