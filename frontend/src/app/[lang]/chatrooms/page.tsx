"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { InboxBlock } from "@/components/inbox";
import { getCurrentActivity } from "@/lib/activity";
import { getRelativeTime } from "@/lib/date";

// TODO: API 연동 시 교체
const MOCK_CHATROOMS = [
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

  // TODO: API 연동 시 교체
  const activity = useMemo(() => getCurrentActivity(), []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleRoomClick = useCallback(
    (roomId: string) => {
      router.push(`/${params.lang}/chatrooms/${roomId}/companion`);
    },
    [params.lang, router],
  );

  return (
    <div className="bg-base-100 flex min-h-dvh flex-col">
      {/* Inline header — Figma: back + title + BETA badge in same row */}
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

      {/* Chatroom list */}
      <div className="flex flex-col">
        {MOCK_CHATROOMS.map((room) => (
          <InboxBlock
            key={room.id}
            name={room.name}
            imageUrl={room.imageUrl}
            active={room.active}
            activity={room.active ? activity : undefined}
            lastMessage={room.lastMessage}
            lastMessageAt={
              room.lastMessageAt
                ? (() => {
                    const rel = getRelativeTime(room.lastMessageAt);
                    if (!rel) return null;
                    if (rel.formattedTime)
                      return `${t(rel.key)} ${rel.formattedTime}`;
                    return t(rel.key, rel.params);
                  })()
                : null
            }
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </div>
    </div>
  );
}
