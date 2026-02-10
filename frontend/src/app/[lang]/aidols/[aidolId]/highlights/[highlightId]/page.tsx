"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { HighlightMessageList } from "@/components/highlight";
import { Loading } from "@/components/Loading";
import { Modal } from "@/components/Modal";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { HighlightRepository } from "@/repositories/HighlightRepository";
import type { HighlightMessage } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface HighlightMessagePageProps {
  params: { lang: string; aidolId: string; highlightId: string };
}

export default function HighlightMessagePage({
  params,
}: HighlightMessagePageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  const { showToast } = useToast();
  const { aidolId, highlightId } = params;

  const [messages, setMessages] = useState<HighlightMessage[]>([]);
  const [companions, setCompanions] = useState<
    Record<string, { name: string; imageUrl?: string }>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  const highlightRepository = useMemo(
    () => new HighlightRepository(getApiService()),
    [],
  );
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: messagesData }, companionsResponse] = await Promise.all([
          highlightRepository.getMessages(highlightId),
          companionRepository.getList({
            filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
            pagination: { current: 1, pageSize: 100 },
          }),
        ]);

        setMessages(messagesData);

        const companionMap: Record<
          string,
          { name: string; imageUrl?: string }
        > = {};
        for (const c of companionsResponse.data) {
          companionMap[c.id] = {
            name: c.name ?? "",
            imageUrl: c.profilePictureUrl ?? undefined,
          };
        }
        setCompanions(companionMap);
      } catch (error) {
        console.error("Failed to fetch highlight messages:", error);
        showToast(t("highlight.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [
    aidolId,
    highlightId,
    highlightRepository,
    companionRepository,
    showToast,
    t,
  ]);

  return (
    <Modal isOpen onClose={() => router.back()}>
      {isLoading ? (
        <Loading />
      ) : (
        <HighlightMessageList messages={messages} companions={companions} />
      )}
    </Modal>
  );
}
