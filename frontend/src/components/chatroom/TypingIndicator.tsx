import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Message, SenderType } from "../../schemas";

interface TypingIndicatorProps {
  newestMessage: Message | undefined;
  companionName: string;
  companionImageUrl?: string | null;
}

export function TypingIndicator({
  newestMessage,
  companionName,
  companionImageUrl,
}: TypingIndicatorProps) {
  const { t } = useTranslation("aidol");
  const showAvatar =
    !newestMessage || newestMessage.senderType !== SenderType.COMPANION;

  return (
    <div className={clsx("flex items-end gap-2", showAvatar ? "mt-4" : "mt-2")}>
      <div className="w-10 shrink-0 self-start">
        {showAvatar && (
          <Image
            src={companionImageUrl ?? ""}
            alt={companionName}
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        {showAvatar && (
          <span className="text-body-s text-base-content">{companionName}</span>
        )}
        <div className="text-body-s bg-base-400 text-base-content w-fit rounded-lg p-2">
          {t("chat.typing")}
        </div>
      </div>
    </div>
  );
}
