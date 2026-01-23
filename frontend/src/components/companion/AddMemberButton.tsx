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
      className="btn btn-neutral h-16 min-w-48 text-body-m font-medium text-neutral-content"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <>
          <PlusIcon className="size-5" />
          {t("aidol:companion.addMember")}
        </>
      )}
    </button>
  );
}
