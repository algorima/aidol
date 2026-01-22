"use client";

import { CheckIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface ShareButtonProps {
  url: string;
  onCopySuccess?: () => void;
}

/**
 * Share button that copies URL to clipboard.
 * Shows a check icon briefly after successful copy.
 */
export function ShareButton({ url, onCopySuccess }: ShareButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    onCopySuccess?.();
    setTimeout(() => setCopied(false), 2000);
  }, [url, onCopySuccess]);

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
