import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Message, MessageStatus, SenderType } from "../../schemas";

import { ErrorBubble } from "./ErrorBubble";

const formatTime = (
  createdAt: string,
  t: (key: string, options?: Record<string, string>) => string,
) => {
  const d = new Date(createdAt);
  const h = d.getHours();
  const period = h < 12 ? t("chat.time.am") : t("chat.time.pm");
  return t("chat.time.format", {
    period,
    hour: String(h % 12 || 12),
    minute: String(d.getMinutes()).padStart(2, "0"),
  });
};

const isSameSender = (a: Message, b: Message) => a.senderType === b.senderType;

const isSameMinute = (a: Message, b: Message) =>
  isSameSender(a, b) &&
  new Date(a.createdAt).getMinutes() === new Date(b.createdAt).getMinutes();

interface MessageBubbleProps {
  message: Message;
  prev: Message | undefined;
  next: Message | undefined;
  companionName: string;
  companionImageUrl?: string | null;
  onResend?: (message: Message) => void;
  onRetryGenerate?: (message: Message) => void;
}

export function MessageBubble({
  message,
  prev,
  next,
  companionName,
  companionImageUrl,
  onResend,
  onRetryGenerate,
}: MessageBubbleProps) {
  const { t } = useTranslation("aidol");

  const isFirstBySender = !prev || !isSameSender(prev, message);
  const isGroupTop = !next || !isSameSender(message, next);
  const isFirstByMinute = !prev || !isSameMinute(prev, message);
  const spacing = isFirstBySender && !!prev ? "mb-4" : "mb-2";

  // 유저 메시지
  if (message.senderType === SenderType.USER) {
    const renderStatus = () => {
      // 재전송
      if (message.status === MessageStatus.ERROR) {
        return (
          <button
            className="bg-error text-error-content flex cursor-pointer items-center gap-1 rounded-lg p-2"
            onClick={() => onResend?.(message)}
          >
            <ArrowPathIcon className="size-4" />
            <span className="text-label-s">{t("chat.resend")}</span>
          </button>
        );
      }

      // 전송중
      if (message.status === MessageStatus.SENDING) {
        return (
          <PaperAirplaneIcon className="text-base-400 size-4 rotate-180" />
        );
      }

      // 메시지 옆 시간
      if (isFirstByMinute) {
        return (
          <span className="text-label-s text-base-content/50">
            {formatTime(message.createdAt, t)}
          </span>
        );
      }
      return null;
    };

    return (
      <div className={clsx("flex items-end gap-2 self-end", spacing)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row-reverse items-end gap-1">
            <div className="text-body-s bg-base-300 w-fit max-w-[200px] rounded-lg p-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                className="prose prose-sm text-base-content max-w-none"
              >
                {message.content}
              </ReactMarkdown>
            </div>
            {renderStatus()}
          </div>
        </div>
      </div>
    );
  }

  // Companion 메시지
  const isFailed =
    message.status === MessageStatus.ERROR ||
    message.status === MessageStatus.SENDING;

  return (
    <div className={clsx("flex items-end gap-2", spacing)}>
      <div className="w-10 shrink-0 self-start">
        {isGroupTop && (
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
        {isGroupTop && (
          <span className="text-body-s text-base-content">{companionName}</span>
        )}
        {isFailed ? (
          <ErrorBubble
            isRetrying={message.status === MessageStatus.SENDING}
            onRetry={() => onRetryGenerate?.(message)}
          />
        ) : (
          <div className="flex items-end gap-1">
            <div className="text-body-s bg-secondary w-fit max-w-50 rounded-lg p-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                className="prose prose-sm text-secondary-content max-w-none"
              >
                {message.content}
              </ReactMarkdown>
            </div>
            {isFirstByMinute && (
              <span className="text-label-s text-base-content/50">
                {formatTime(message.createdAt, t)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
