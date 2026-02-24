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
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { LocalChatroomIdsRepository } from "@/repositories/LocalChatroomIdsRepository";
import { getApiService } from "@/services/ApiService";

interface ChatroomView {
  id: string;
  name: string;
  imageUrl: string | null;
  active: boolean;
  lastMessage: string | null;
  lastMessageAt: string | null;
}

// TODO: API 연동 시 제거
const MOCK_CHATROOMS: ChatroomView[] = [
  {
    id: "1",
    name: "데프레임",
    imageUrl: "https://placehold.co/96x96",
    active: true,
    lastMessage: "안녕하세요! 오늘 컨디션은 어때요?",
    lastMessageAt: new Date(Date.now() - 30 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "스타라이트",
    imageUrl: "https://placehold.co/96x96",
    active: false,
    lastMessage: "다음에 또 이야기해요!",
    lastMessageAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "루미너스",
    imageUrl: "https://placehold.co/96x96",
    active: false,
    lastMessage: "내일 연습 때 봐요!",
    lastMessageAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "드리머즈",
    imageUrl: null,
    active: false,
    lastMessage: null,
    lastMessageAt: null,
  },
];

export default function InboxPage() {
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const { t } = useTranslation("aidol");
  const { showToast } = useToast();

  const companionRepo = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const [chatrooms, setChatrooms] = useState<ChatroomView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const activity = useMemo(() => getCurrentActivity(), []);

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const chatroomIdMap = LocalChatroomIdsRepository.getAll();
        const companionIds = Object.keys(chatroomIdMap);

        if (companionIds.length === 0) {
          setChatrooms(MOCK_CHATROOMS);
          return;
        }

        const { data: companions } = await companionRepo.getList({
          pagination: { current: 1, pageSize: 100 },
        });

        const companionMap = new Map(companions.map((c) => [c.id, c]));

        const rooms: ChatroomView[] = companionIds.flatMap((companionId) => {
          const companion = companionMap.get(companionId);
          if (!companion) return [];

          const room: ChatroomView = {
            id: chatroomIdMap[companionId],
            name: companion.name ?? "",
            imageUrl: companion.profilePictureUrl ?? null,
            // TODO: active 상태는 기획 확정 후 구현
            active: false,
            lastMessage: null,
            lastMessageAt: null,
          };
          return [room];
        });

        setChatrooms(rooms.length > 0 ? rooms : MOCK_CHATROOMS);
      } catch (error) {
        console.error("Failed to fetch chatrooms:", error);
        showToast(t("inbox.error.load"), "error");
        setChatrooms(MOCK_CHATROOMS);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchChatrooms();
  }, [companionRepo, showToast, t]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleRoomClick = useCallback(
    (roomId: string) => {
      router.push(`/${params.lang}/chatrooms/${roomId}/companion`);
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
        {/* TODO: API 연동 후 mock fallback 제거 시 empty state 도달 가능 */}
        {chatrooms.length === 0 ? (
          <p className="text-body-m text-base-content/60 py-20 text-center">
            {t("inbox.empty")}
          </p>
        ) : (
          chatrooms.map((room) => (
            <InboxBlock
              key={room.id}
              name={room.name}
              imageUrl={room.imageUrl}
              active={room.active}
              activity={room.active ? activity : undefined}
              lastMessage={room.lastMessage}
              lastMessageAt={formatLastMessageAt(room.lastMessageAt)}
              onClick={() => handleRoomClick(room.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
