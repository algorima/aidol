"use client";

import { CheckIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface ShareButtonProps {
  url: string;
  onShare?: () => void;
}

/**
 * Share button that copies URL to clipboard.
 * Shows a check icon briefly after successful copy.
 */
export function ShareButton({ url, onShare }: ShareButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    onShare?.();
    setTimeout(() => setCopied(false), 2000);
  }, [url, onShare]);

  return (
    <button
      onClick={handleShare}
      className="btn btn-circle btn-ghost"
      aria-label={t("aidol:share")}
    >
      {copied ? (
        <CheckIcon className="size-6 text-success" />
      ) : (
        <ShareIcon className="size-6" />
      )}
    </button>
  );
}
