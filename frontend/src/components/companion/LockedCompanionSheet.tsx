import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Modal } from "@/components/Modal";

interface LockedCompanionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  companionName: string;
  companionImageUrl?: string;
}

export function LockedCompanionSheet({
  isOpen,
  onClose,
  companionName,
  companionImageUrl,
}: LockedCompanionSheetProps) {
  const { t } = useTranslation("aidol");

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="bottom">
      <div className="flex flex-col items-center gap-6 px-6 pt-12 pb-6">
        {/* 잠금 아바타 */}
        <div className="relative size-12 overflow-hidden rounded-lg">
          {companionImageUrl ? (
            <Image
              src={companionImageUrl}
              alt={companionName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-base-300 flex size-full items-center justify-center">
              <UserIcon className="text-base-content/50 size-6" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LockClosedIcon className="size-6 text-white" />
          </div>
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-title-s text-base-content text-center">
            {t("companion.locked.title", { name: companionName })}
          </p>
          <p className="text-body-s text-base-content/50 text-center">
            {t("companion.locked.subtitle", { name: companionName })}
          </p>
        </div>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary text-label-l w-full rounded-lg shadow-sm"
        >
          {t("common.confirm")}
        </button>
      </div>
    </Modal>
  );
}
