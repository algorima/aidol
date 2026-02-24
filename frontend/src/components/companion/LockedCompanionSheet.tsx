import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Modal } from "@/components/Modal";
import { getParticle } from "@/lib/koreanParticle";

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
  const particle = getParticle(companionName, "과", "와");

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="bottom">
      <div className="flex flex-col items-center gap-6 pt-6">
        {/* 잠금 아바타 */}
        <div className="relative size-20 overflow-hidden rounded-lg">
          {companionImageUrl ? (
            <Image
              src={companionImageUrl}
              alt={companionName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-base-300 flex size-full items-center justify-center">
              <UserIcon className="text-base-content/50 size-10" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LockClosedIcon className="size-8 text-white" />
          </div>
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-title-s text-base-content max-w-1/2 text-center break-keep">
            {t("companion.locked.title", { name: companionName, particle })}
          </p>
          <p className="text-body-s text-base-content/50 text-center">
            {t("companion.locked.subtitle", { name: companionName, particle })}
          </p>
        </div>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary text-label-l h-auto min-h-0 w-full rounded-lg py-4"
        >
          {t("common.confirm")}
        </button>
      </div>
    </Modal>
  );
}
