import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface NewMemberSectionProps {
  onNewMember: () => void;
}

export function NewMemberSection({ onNewMember }: NewMemberSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base-200 col-span-2 flex flex-col items-center justify-center gap-4 rounded-lg p-4">
      <div className="text-body-s text-base-content flex flex-col items-start text-center">
        <p>{t("aidol:casting.newMember.prompt")}</p>
        <p>{t("aidol:casting.newMember.subPrompt")}</p>
      </div>
      <button
        type="button"
        className="btn btn-primary gap-2.5"
        onClick={onNewMember}
      >
        {t("aidol:casting.addMember")}
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
