import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Modal } from "@/components/Modal";
import type { Companion } from "@/schemas/companion";
import type { HighlightMessage } from "@/schemas/highlight";

interface HighlightDetailModalProps {
  isOpen: boolean;
  messages: HighlightMessage[];
  companions: Companion[];
  onClose: () => void;
}

export function HighlightDetailModal({
  isOpen,
  messages,
  companions,
  onClose,
}: HighlightDetailModalProps) {
  const { t } = useTranslation();

  const getCompanion = (companionId: string | null) => {
    if (!companionId) return null;
    return companions.find((c) => c.id === companionId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {messages.map((message: HighlightMessage) => {
          const { companionId } = message;
          const companion = getCompanion(companionId);
          const isInterviewer = !companionId;

          if (isInterviewer) {
            // 인터뷰어 메시지 (오른쪽 정렬)
            return (
              <div key={message.id} className="flex flex-col items-end gap-2">
                <span className="text-body-s text-base-content">
                  {t("aidol:highlight.interviewer")}
                </span>
                <div className="max-w-65.75 rounded-xl bg-black p-2">
                  <p className="text-body-s text-white">{message.content}</p>
                </div>
              </div>
            );
          }

          // 멤버 메시지 (왼쪽 정렬)
          return (
            <div key={message.id} className="flex items-start gap-2">
              <div className="border-base-300 bg-base-200 size-10 shrink-0 overflow-hidden rounded-lg border">
                {companion?.profilePictureUrl && (
                  <Image
                    src={companion.profilePictureUrl}
                    alt={companion.name ?? ""}
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-body-s text-base-content">
                  {companion?.name}
                </span>
                <div className="bg-secondary w-fit max-w-full rounded-xl p-2">
                  <p className="text-body-s text-white">{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
