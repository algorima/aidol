import { useTranslation } from "react-i18next";

interface BiographyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BiographyInput({ value, onChange }: BiographyInputProps) {
  const { t } = useTranslation();

  return (
    <textarea
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }}
      placeholder={t("aidol:companionCreate.complete.bioPlaceholder")}
      className="textarea border-base-400 bg-base-200 min-h-0 w-full resize-none overflow-hidden rounded-lg px-4 py-3"
      rows={1}
    />
  );
}
