"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { InboxBlock } from "@/components/inbox";
import { Loading } from "@/components/Loading";
import { getCurrentActivity } from "@/lib/activity";
import { getRelativeTime } from "@/lib/date";
import { ChatroomRepository } from "@/repositories/ChatroomRepository";
import type { MyChatroomItem } from "@/repositories/ChatroomRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

export default function InboxPage() {
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const { t } = useTranslation("aidol");
  const { showToast } = useToast();

  const apiService = useMemo(() => getApiService(), []);
  const chatroomRepo = useMemo(
    () => new ChatroomRepository(apiService),
    [apiService],
  );
  const companionRepo = useMemo(
    () => new CompanionRepository(apiService),
    [apiService],
  );

  const [chatrooms, setChatrooms] = useState<MyChatroomItem[]>([]);
  const [companionMap, setCompanionMap] = useState<Map<string, Companion>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);

  const activity = useMemo(() => getCurrentActivity(), []);

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const myChatrooms = await chatroomRepo.getMyChatrooms();

        if (myChatrooms.length === 0) {
          setChatrooms([]);
          return;
        }

        const companionIds = myChatrooms.map((c) => c.companionId);
        const { data: companions } = await companionRepo.getList({
          filters: [{ field: "id", operator: "in", value: companionIds }],
          pagination: { current: 1, pageSize: companionIds.length },
        });

        setCompanionMap(new Map(companions.map((c) => [c.id, c])));
        setChatrooms(myChatrooms);

        // Secondary task: Generate initial AI response for empty chatrooms
        const emptyChatrooms = myChatrooms.filter(
          (c) => c.lastMessage === null,
        );
        for (const chatroom of emptyChatrooms) {
          chatroomRepo
            .generateInitialResponse(chatroom.id, chatroom.companionId)
            .then((response) => {
              setChatrooms((prev) =>
                prev.map((room) =>
                  room.id === chatroom.id
                    ? {
                        ...room,
                        lastMessage: {
                          content: response.content,
                          createdAt: new Date().toISOString(),
                        },
                      }
                    : room,
                ),
              );
            })
            .catch((error) => {
              console.error(
                `Initial response failed for chatroom ${chatroom.id}:`,
                error,
              );
            });
        }
      } catch (error) {
        console.error("Failed to fetch chatrooms:", error);
        showToast(t("inbox.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchChatrooms();
  }, [chatroomRepo, companionRepo, showToast, t]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleRoomClick = useCallback(
    (chatroomId: string, companionId: string, active: boolean) => {
      if (!active) {
        // TODO: 대화 제한 안내 모달 표시 (별도 브랜치에서 작업 중)
        return;
      }
      router.push(`/${params.lang}/chatrooms/${chatroomId}/${companionId}`);
    },
    [params.lang, router],
  );

  const formatLastMessageAt = useCallback(
    (dateStr: string | null) => {
      if (!dateStr) return null;
      const rel = getRelativeTime(dateStr);
      if (!rel) return null;
      return t(rel.key, rel.params);
    },
    [t],
  );

  /* Inline header — Figma: back + title + BETA badge in same row */
  const header = (
    <header className="h-header bg-base-100 flex shrink-0 items-center px-6 py-7">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleBack}
          className="text-base-content flex cursor-pointer items-center justify-center"
          aria-label={t("common.close")}
        >
          <ArrowLeftIcon className="size-6" />
        </button>
        <h1 className="text-headline-s text-base-content">
          {t("inbox.header")}
        </h1>
        <span className="bg-secondary text-label-l text-secondary-content rounded-lg px-2 py-1">
          {t("inbox.beta")}
        </span>
      </div>
    </header>
  );

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col">
        {header}
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex h-dvh flex-col">
      {header}

      {/* Chatroom list */}
      <div className="scrollbar-hide flex flex-1 flex-col overflow-y-auto">
        {chatrooms.length === 0 ? (
          <p className="text-body-m text-base-content/60 py-20 text-center">
            {t("inbox.empty")}
          </p>
        ) : (
          chatrooms.map((room) => {
            const companion = companionMap.get(room.companionId);
            // TODO: active 상태는 기획 확정 후 구현
            const active = false;
            return (
              <InboxBlock
                key={room.id}
                name={companion?.name ?? ""}
                imageUrl={companion?.profilePictureUrl ?? null}
                active={active}
                activity={active ? activity : undefined}
                lastMessage={room.lastMessage?.content ?? null}
                lastMessageAt={formatLastMessageAt(
                  room.lastMessage?.createdAt ?? null,
                )}
                onClick={() =>
                  handleRoomClick(room.id, room.companionId, active)
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
}
