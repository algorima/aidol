"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface AddMemberButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

/**
 * Button for adding a new companion member.
 */
export function AddMemberButton({ onClick, isLoading }: AddMemberButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="btn h-16 min-w-48 text-label-l text-neutral-content btn-neutral"
    >
      {isLoading ? (
        <span className="loading loading-sm loading-spinner" />
      ) : (
        <>
          <PlusIcon className="size-5" />
          {t("aidol:companion.addMember")}
        </>
      )}
    </button>
  );
}
