import { useTranslation } from "react-i18next";

import { TextInput } from "@/components/group-creation/TextInput";

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
    <TextInput
      value={value}
      onChange={(v) =>
        onChange(v.replace(SPECIAL_CHARS_REGEX, "").slice(0, maxLength))
      }
      placeholder={t("aidol:companionCreate.complete.namePlaceholder")}
    />
  );
}
