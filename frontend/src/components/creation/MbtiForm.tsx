import { useTranslation } from "react-i18next";

import { MbtiSlider } from "./MbtiSlider";

export interface MbtiValues {
  energy: number;
  perception: number;
  judgment: number;
  lifestyle: number;
}

interface MbtiFormProps {
  values: MbtiValues;
  onChange: (values: MbtiValues) => void;
}

export function MbtiForm({ values, onChange }: MbtiFormProps) {
  const { t } = useTranslation();

  const axes: {
    key: keyof MbtiValues;
    label: string;
    leftLabel: string;
    rightLabel: string;
  }[] = [
    {
      key: "energy",
      label: t("aidol:companionCreate.personality.energy"),
      leftLabel: t("aidol:companionCreate.personality.energyLeft"),
      rightLabel: t("aidol:companionCreate.personality.energyRight"),
    },
    {
      key: "perception",
      label: t("aidol:companionCreate.personality.perception"),
      leftLabel: t("aidol:companionCreate.personality.perceptionLeft"),
      rightLabel: t("aidol:companionCreate.personality.perceptionRight"),
    },
    {
      key: "judgment",
      label: t("aidol:companionCreate.personality.judgment"),
      leftLabel: t("aidol:companionCreate.personality.judgmentLeft"),
      rightLabel: t("aidol:companionCreate.personality.judgmentRight"),
    },
    {
      key: "lifestyle",
      label: t("aidol:companionCreate.personality.lifestyle"),
      leftLabel: t("aidol:companionCreate.personality.lifestyleLeft"),
      rightLabel: t("aidol:companionCreate.personality.lifestyleRight"),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {axes.map(({ key, label, leftLabel, rightLabel }) => (
        <MbtiSlider
          key={key}
          label={label}
          leftLabel={leftLabel}
          rightLabel={rightLabel}
          value={values[key]}
          onChange={(v) => onChange({ ...values, [key]: v })}
        />
      ))}
    </div>
  );
}
