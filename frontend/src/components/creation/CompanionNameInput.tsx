import { useTranslation } from "react-i18next";

interface CompanionNameInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const SPECIAL_CHARS_REGEX = /[!@#$%^&*()+=[\]{}|\\;:'",.<>?/`~_]/g;

export function CompanionNameInput({
  value,
  onChange,
  maxLength = 10,
}: CompanionNameInputProps) {
  const { t } = useTranslation();

  return (
    <textarea
      value={value}
      onChange={(e) => {
        onChange(
          e.target.value.replace(SPECIAL_CHARS_REGEX, "").slice(0, maxLength),
        );
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }}
      placeholder={t("aidol:companionCreate.complete.namePlaceholder")}
      className="textarea border-base-400 bg-base-200 min-h-0 w-full resize-none overflow-hidden rounded-lg px-4 py-3"
      rows={1}
    />
  );
}
