import { useTranslation } from "react-i18next";

import { Modal } from "@/components/Modal";

interface CastingCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCasting: () => void;
}

export function CastingCompleteModal({
  isOpen,
  onClose,
  onViewCasting,
}: CastingCompleteModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      action={{
        label: t("aidol:companionCreate.castingComplete.viewCasting"),
        onClick: onViewCasting,
      }}
    >
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-headline-s text-base-content">
          {t("aidol:companionCreate.castingComplete.title")}
        </h2>
        <p className="text-body-s text-base-content/70 text-center">
          {t("aidol:companionCreate.castingComplete.description")}
        </p>
      </div>
    </Modal>
  );
}
