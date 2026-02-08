"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ChatTooltipButton() {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const handleDismiss = () => {
    setShowTooltip(false);
    setIsFirstVisit(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => !isFirstVisit && setShowTooltip(true)}
      onMouseLeave={() => !isFirstVisit && setShowTooltip(false)}
    >
      <button
        type="button"
        className="relative z-50 flex size-10 items-center justify-center"
        onClick={() => !isFirstVisit && setShowTooltip((prev) => !prev)}
      >
        <ChatBubbleLeftEllipsisIcon className="text-base-content/20 size-6" />
      </button>
      {showTooltip && (
        <>
          {isFirstVisit && (
            <div className="fixed inset-0 z-40" onClick={handleDismiss} />
          )}
          <div className="absolute top-full right-0 z-50 mt-2 w-fit">
            <div className="border-b-neutral absolute -top-2 right-3 size-0 border-x-8 border-b-8 border-x-transparent" />
            <div className="bg-neutral text-neutral-content text-label-m rounded-lg px-4 py-3 whitespace-nowrap">
              {t("aidol:myGroup.chatComingSoon")}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
