import { useTranslation } from "react-i18next";

interface NewMemberSectionProps {
  onNewMember: () => void;
}

export function NewMemberSection({ onNewMember }: NewMemberSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base-200 col-span-2 flex flex-col items-center gap-4 rounded-lg py-10">
      <p className="text-body-s text-base-content">
        {t("aidol:casting.newMember.prompt")}
      </p>
      <button type="button" className="btn btn-neutral" onClick={onNewMember}>
        {t("aidol:casting.newMember.button")}
      </button>
    </div>
  );
}
