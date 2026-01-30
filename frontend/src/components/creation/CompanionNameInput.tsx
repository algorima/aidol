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
      className="input bg-base-100 w-full"
    />
  );
}
