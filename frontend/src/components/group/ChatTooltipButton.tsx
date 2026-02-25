"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ChatTooltipButtonProps {
  onClick?: () => void;
}

export function ChatTooltipButton({ onClick }: ChatTooltipButtonProps) {
  const { t } = useTranslation();
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("chatTooltipVisited") !== "true";
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      setShowTooltip(true);
      setIsVisible(true);
    }
  }, [isFirstVisit]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowTooltip(false);
      setIsFirstVisit(false);
      localStorage.setItem("chatTooltipVisited", "true");
    }, 200);
  };

  const handleMouseEnter = () => {
    if (!isFirstVisit) {
      setShowTooltip(true);
      setTimeout(() => setIsVisible(true), 10);
    }
  };

  const handleMouseLeave = () => {
    if (!isFirstVisit) {
      setIsVisible(false);
      setTimeout(() => setShowTooltip(false), 200);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="relative z-50 flex size-10 cursor-pointer items-center justify-center"
        onClick={onClick}
      >
        <ChatBubbleLeftEllipsisIcon className="text-base-content size-6" />
      </button>
      {showTooltip && (
        <>
          {isFirstVisit && (
            <div
              className={clsx(
                "fixed inset-0 z-40 transition-opacity duration-200",
                isVisible ? "opacity-100" : "opacity-0",
              )}
              onClick={handleDismiss}
            />
          )}
          <div
            className={clsx(
              "absolute top-full right-0 z-50 mt-2 w-fit transition-opacity duration-200",
              isVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="border-b-primary absolute -top-2 right-3 size-0 border-x-8 border-b-8 border-x-transparent" />
            <div className="bg-primary text-primary-content text-label-m rounded-lg px-2 py-1 font-bold whitespace-nowrap">
              {t("aidol:myGroup.chatComingSoon")}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
