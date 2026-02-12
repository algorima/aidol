import { Modal } from "@/components/Modal";
import type { Companion } from "@/schemas/companion";
import type { HighlightMessage } from "@/schemas/highlight";

import { HighlightMessageList } from "./HighlightMessageList";

interface CompanionInfo {
  name: string;
  imageUrl?: string;
}

interface HighlightDetailModalProps {
  isOpen: boolean;
  messages: HighlightMessage[];
  companions: Companion[];
  onClose: () => void;
}

const toCompanionMap = (
  companions: Companion[],
): Record<string, CompanionInfo> => {
  const map: Record<string, CompanionInfo> = {};
  for (const c of companions) {
    map[c.id] = {
      name: c.name ?? "",
      imageUrl: c.profilePictureUrl ?? undefined,
    };
  }
  return map;
};

export function HighlightDetailModal({
  isOpen,
  messages,
  companions,
  onClose,
}: HighlightDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HighlightMessageList
        messages={messages}
        companions={toCompanionMap(companions)}
      />
    </Modal>
  );
}
