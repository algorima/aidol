"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { GroupProfile } from "@/components/group/GroupProfile";
import { HighlightCard } from "@/components/group/HighlightCard";
import { HighlightSectionHeader } from "@/components/group/HighlightSectionHeader";
import { Header } from "@/components/Header";
import { HighlightMessageList } from "@/components/highlight";
import { Loading } from "@/components/Loading";
import { Modal } from "@/components/Modal";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { HighlightRepository } from "@/repositories/HighlightRepository";
import type { AIdol, AIdolHighlight, HighlightMessage } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface GroupDetailPageProps {
  params: { lang: string; aidolId: string };
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [aidol, setAidol] = useState<AIdol | null>(null);
  const [highlights, setHighlights] = useState<AIdolHighlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<HighlightMessage[]>([]);
  const [companions, setCompanions] = useState<
    Record<string, { name: string; imageUrl?: string }>
  >({});
  const [isModalLoading, setIsModalLoading] = useState(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );
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
        const [aidolResponse, highlightsResponse, companionsResponse] =
          await Promise.all([
            aidolRepository.getOne({ id: aidolId }),
            highlightRepository.getList({
              filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
              pagination: { current: 1, pageSize: 100 },
            }),
            companionRepository.getList({
              filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
              pagination: { current: 1, pageSize: 100 },
            }),
          ]);
        setAidol(aidolResponse.data);
        setHighlights(highlightsResponse.data);

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
        console.error("Failed to fetch group detail:", error);
        showToast(t("group.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [
    aidolId,
    aidolRepository,
    highlightRepository,
    companionRepository,
    showToast,
    t,
  ]);

  const handleHighlightClick = async (highlightId: string) => {
    setSelectedHighlightId(highlightId);
    setIsModalLoading(true);
    try {
      const { data: messagesData } =
        await highlightRepository.getMessages(highlightId);
      const invalid = messagesData.filter(
        (msg) => msg.companionId !== null && !(msg.companionId in companions),
      );
      if (invalid.length > 0) {
        console.error(
          "Unknown companionIds:",
          invalid.map((msg) => msg.companionId),
        );
      }
      setMessages(
        messagesData.filter(
          (msg) => msg.companionId === null || msg.companionId in companions,
        ),
      );
    } catch (error) {
      console.error("Failed to fetch highlight messages:", error);
      showToast(t("highlight.error.load"), "error");
      setSelectedHighlightId(null);
    } finally {
      setIsModalLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-screen flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!aidol) {
    return (
      <div className="bg-base-100 flex h-screen flex-col items-center justify-center">
        <p className="text-body-m text-neutral">{t("aidol.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      <Header
        onBackClick={() => router.push(`/${lang}/aidols/home`)}
        title={aidol.name ?? ""}
      />

      <main className="flex-1">
        <GroupProfile
          name={t("group.title")}
          profileImageUrl={aidol.profileImageUrl}
          createdAt={aidol.createdAt}
          onChemistryClick={() =>
            router.push(`/${lang}/aidols/${aidolId}/chemistry`)
          }
          onFollowClick={() => router.push(`/${lang}/aidols/${aidolId}/follow`)}
        />

        <div className="px-6">
          <span className="text-label-l text-base-content border-base-content inline-block border-b-2 py-2">
            {t("group.highlightTab")}
          </span>
        </div>

        <div className="flex flex-col gap-6 px-6 py-4">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col gap-4">
              <HighlightSectionHeader
                title={highlight.title}
                subtitle={highlight.subtitle}
              />
              <HighlightCard
                imageUrl={highlight.thumbnailUrl}
                title={highlight.title}
                onClick={() => handleHighlightClick(highlight.id)}
              />
            </div>
          ))}
        </div>
      </main>

      <Modal
        isOpen={selectedHighlightId !== null}
        onClose={() => setSelectedHighlightId(null)}
      >
        {isModalLoading ? (
          <Loading />
        ) : (
          <HighlightMessageList messages={messages} companions={companions} />
        )}
      </Modal>
    </div>
  );
}
