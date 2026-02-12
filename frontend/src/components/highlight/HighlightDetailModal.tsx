import { useMemo } from "react";

import { Loading } from "@/components/Loading";
import { Modal } from "@/components/Modal";
import type { Companion } from "@/schemas/companion";
import type { HighlightMessage } from "@/schemas/highlight";

import type { CompanionInfo } from "./HighlightMessageList";
import { HighlightMessageList } from "./HighlightMessageList";

interface HighlightDetailModalProps {
  isOpen: boolean;
  isLoading?: boolean;
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
  isLoading = false,
  messages,
  companions,
  onClose,
}: HighlightDetailModalProps) {
  const companionMap = useMemo(() => toCompanionMap(companions), [companions]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <Loading />
      ) : (
        <HighlightMessageList messages={messages} companions={companionMap} />
      )}
    </Modal>
  );
}
