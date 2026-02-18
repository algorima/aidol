"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { InboxBlock } from "@/components/inbox";
import { getCurrentActivity } from "@/lib/activity";

// TODO: API 연동 시 교체
const MOCK_CHATROOMS = [
  {
    id: "1",
    name: "데프레임",
    imageUrl:
      "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    active: true,
    lastMessage: "안녕하세요! 오늘 컨디션은 어때요?",
    lastMessageAt: "오후 2:30",
  },
  {
    id: "2",
    name: "스타라이트",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    active: false,
    lastMessage: "다음에 또 이야기해요!",
    lastMessageAt: "어제",
  },
  {
    id: "3",
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

  return (
    <div className="bg-base-100 flex min-h-dvh flex-col">
      {/* Inline header — Figma: back + title + BETA badge in same row */}
      <header className="h-header bg-base-100 flex shrink-0 items-center px-6 py-7">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-base-content flex cursor-pointer items-center justify-center"
            aria-label={t("common.close")}
          >
            <ArrowLeftIcon className="size-6" />
          </button>
          <h1 className="text-headline-s text-base-content">
            {t("inbox.header")}
          </h1>
          <span className="bg-secondary text-body-s rounded-lg px-2 py-1 font-medium text-white">
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
            lastMessageAt={room.lastMessageAt}
            onClick={() =>
              router.push(`/${params.lang}/chatrooms/${room.id}/companion`)
            }
          />
        ))}
      </div>
    </div>
  );
}
