import { useTranslation } from "react-i18next";

interface BiographyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BiographyInput({ value, onChange }: BiographyInputProps) {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t("aidol:companionCreate.complete.bioPlaceholder")}
      className="input bg-base-100 w-full"
    />
  );
}
