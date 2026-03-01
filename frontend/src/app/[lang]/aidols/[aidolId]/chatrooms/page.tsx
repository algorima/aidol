"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { LockedCompanionSheet } from "@/components/companion";
import { InboxBlock } from "@/components/inbox";
import { Loading } from "@/components/Loading";
import { getCurrentActivity } from "@/lib/activity";
import { getRelativeTime } from "@/lib/date";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { ChatroomRepository } from "@/repositories/ChatroomRepository";
import type { MyChatroomItem } from "@/repositories/ChatroomRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

export default function InboxPage() {
  const params = useParams<{ lang: string; aidolId: string }>();
  const router = useRouter();
  const { t } = useTranslation("aidol");
  const { showToast } = useToast();

  const chatroomRepository = useMemo(
    () => new ChatroomRepository(getApiService()),
    [],
  );
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );
  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  const [chatrooms, setChatrooms] = useState<MyChatroomItem[]>([]);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [companionMap, setCompanionMap] = useState<Map<string, Companion>>(
    new Map(),
  );
  const [groupName, setGroupName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingChatroomIds, setPendingChatroomIds] = useState<Set<string>>(
    new Set(),
  );
  const [lockedCompanion, setLockedCompanion] = useState<{
    name: string;
    imageUrl?: string;
  } | null>(null);

  const activity = useMemo(() => getCurrentActivity(), []);

  const chatroomMap = useMemo(
    () => new Map(chatrooms.map((c) => [c.companionId, c])),
    [chatrooms],
  );

  const sortedCompanions = useMemo(() => {
    return [...companions].sort((a, b) => {
      const chatroomA = chatroomMap.get(a.id);
      const chatroomB = chatroomMap.get(b.id);

      const activeA = chatroomA?.lastMessage != null;
      const activeB = chatroomB?.lastMessage != null;
      const pendingA = chatroomA ? pendingChatroomIds.has(chatroomA.id) : false;
      const pendingB = chatroomB ? pendingChatroomIds.has(chatroomB.id) : false;

      const priorityA = activeA ? 2 : pendingA ? 1 : 0;
      const priorityB = activeB ? 2 : pendingB ? 1 : 0;

      return priorityB - priorityA;
    });
  }, [companions, chatroomMap, pendingChatroomIds]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      setIsLoading(true);
      try {
        const [myChatrooms, { data: companions }, { data: aidol }] =
          await Promise.all([
            chatroomRepository.getMyChatrooms(),
            companionRepository.getByAidolId(params.aidolId),
            aidolRepository.getOne({ id: params.aidolId }),
          ]);

        setGroupName(aidol.name ?? null);
        setCompanions(companions);

        const companionIdSet = new Set(companions.map((c) => c.id));
        const newCompanionMap = new Map(companions.map((c) => [c.id, c]));
        setCompanionMap(newCompanionMap);

        const filteredChatrooms = myChatrooms.filter((c) =>
          companionIdSet.has(c.companionId),
        );

        if (filteredChatrooms.length === 0) {
          // Path B: 채팅방 없음 → 랜덤 컴패니언으로 1개 생성
          const randomCompanion =
            companions[Math.floor(Math.random() * companions.length)];
          if (!randomCompanion) {
            setChatrooms([]);
            return;
          }

          const { data: newChatroom } = await chatroomRepository.create({
            variables: {
              name: randomCompanion.name ?? "",
              language: params.lang,
              companionId: randomCompanion.id,
            },
          });

          // 채팅방을 즉시 표시하고 pending 상태로 설정
          setChatrooms([
            {
              id: newChatroom.id,
              companionId: randomCompanion.id,
              lastMessage: null,
            },
          ]);
          setPendingChatroomIds(new Set([newChatroom.id]));

          // 선제발화 fire-and-forget
          void (async () => {
            try {
              const response = await chatroomRepository.generateInitialResponse(
                newChatroom.id,
                randomCompanion.id,
              );
              setChatrooms((prev) =>
                prev.map((room) =>
                  room.id === newChatroom.id
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
            } catch (error) {
              console.error(
                `Initial response failed for chatroom ${newChatroom.id}:`,
                error,
              );
              const fallbackContent = t("inbox.fallbackGreeting", {
                name: randomCompanion.name ?? "",
              });
              setChatrooms((prev) =>
                prev.map((room) =>
                  room.id === newChatroom.id
                    ? {
                        ...room,
                        lastMessage: {
                          content: fallbackContent,
                          createdAt: new Date().toISOString(),
                        },
                      }
                    : room,
                ),
              );
            } finally {
              setPendingChatroomIds((prev) => {
                const next = new Set(prev);
                next.delete(newChatroom.id);
                return next;
              });
            }
          })();
        } else {
          // Path A: 채팅방 있음 → 목록 그대로 표시
          setChatrooms(filteredChatrooms);
        }
      } catch (error) {
        console.error("Failed to fetch chatrooms:", error);
        showToast(t("inbox.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchChatrooms();
  }, [
    aidolRepository,
    chatroomRepository,
    companionRepository,
    params.aidolId,
    params.lang,
    showToast,
    t,
  ]);

  const handleBack = useCallback(() => {
    router.push(`/${params.lang}/aidols/${params.aidolId}`);
  }, [router, params.lang, params.aidolId]);

  const handleCompanionClick = useCallback(
    (companionId: string, chatroomId: string | undefined, active: boolean) => {
      if (chatroomId && pendingChatroomIds.has(chatroomId)) return;
      if (!active) {
        const companion = companionMap.get(companionId);
        setLockedCompanion({
          name: companion?.name ?? "",
          imageUrl: companion?.profilePictureUrl ?? undefined,
        });
        return;
      }
      router.push(
        `/${params.lang}/aidols/${params.aidolId}/chatrooms/${chatroomId}/${companionId}`,
      );
    },
    [companionMap, params.aidolId, params.lang, pendingChatroomIds, router],
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
          {groupName ?? t("inbox.header")}
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
        {sortedCompanions.length === 0 ? (
          <p className="text-body-m text-base-content/60 py-20 text-center">
            {t("inbox.empty")}
          </p>
        ) : (
          sortedCompanions.map((companion) => {
            const chatroom = chatroomMap.get(companion.id);
            const pending = chatroom
              ? pendingChatroomIds.has(chatroom.id)
              : false;
            const active =
              chatroom?.lastMessage !== null &&
              chatroom?.lastMessage !== undefined;
            return (
              <InboxBlock
                key={companion.id}
                name={companion.name ?? ""}
                imageUrl={companion.profilePictureUrl ?? null}
                active={active}
                pending={pending}
                activity={active || pending ? activity : undefined}
                lastMessage={chatroom?.lastMessage?.content ?? null}
                lastMessageAt={
                  pending
                    ? formatLastMessageAt(new Date().toISOString())
                    : formatLastMessageAt(
                        chatroom?.lastMessage?.createdAt ?? null,
                      )
                }
                onClick={() =>
                  handleCompanionClick(companion.id, chatroom?.id, active)
                }
              />
            );
          })
        )}
      </div>

      <LockedCompanionSheet
        isOpen={lockedCompanion !== null}
        onClose={() => setLockedCompanion(null)}
        companionName={lockedCompanion?.name ?? ""}
        companionImageUrl={lockedCompanion?.imageUrl}
      />
    </div>
  );
}
