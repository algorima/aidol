"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ChatroomRepository,
  CompanionRepository,
  LocalChatroomIdsRepository,
} from "@/repositories";
import type { ChatroomCreate } from "@/schemas/chatroom";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

interface CompanionProfilePageProps {
  params: {
    lang: string;
    companionId: string;
  };
}

/**
 * Companion 프로필 페이지 (Container)
 * - Companion 데이터 페칭 (useState + useEffect)
 * - 채팅 시작 버튼 클릭 시 localStorage 확인 후 채팅방으로 이동
 */
export default function CompanionProfilePage({
  params,
}: CompanionProfilePageProps): JSX.Element {
  const { lang, companionId } = params;
  const router = useRouter();

  const [companion, setCompanion] = useState<Companion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCreatingChatroom, setIsCreatingChatroom] = useState(false);
  const [createError, setCreateError] = useState<Error | null>(null);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const chatroomRepository = useMemo(
    () => new ChatroomRepository(getApiService()),
    [],
  );

  // Fetch companion on mount
  useEffect(() => {
    void (async () => {
      try {
        setIsLoading(true);
        const response = await companionRepository.getOne({ id: companionId });
        setCompanion(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [companionId, companionRepository]);

  const handleStartChat = useCallback(async () => {
    // Check localStorage for existing chatroom
    const existingChatroomId =
      LocalChatroomIdsRepository.getChatroomId(companionId);

    if (existingChatroomId) {
      // Navigate to existing chatroom
      router.push(`/${lang}/chatrooms/${existingChatroomId}/${companionId}`);
      return;
    }

    // Create new chatroom
    try {
      setIsCreatingChatroom(true);
      setCreateError(null);

      const response = await chatroomRepository.create<ChatroomCreate>({
        variables: { name: companion?.name ?? "Chat", language: lang },
      });

      // Save to localStorage
      LocalChatroomIdsRepository.setChatroomId(companionId, response.data.id);

      // Navigate to new chatroom
      router.push(`/${lang}/chatrooms/${response.data.id}/${companionId}`);
    } catch (err) {
      setCreateError(err as Error);
    } finally {
      setIsCreatingChatroom(false);
    }
  }, [chatroomRepository, companion?.name, companionId, lang, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error || !companion) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>{error?.message || "Companion not found"}</span>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-base-200 min-h-dvh px-6 py-20">
      <div className="mx-auto w-full max-w-md">
        {/* Companion Header */}
        <div className="mb-8 text-center">
          <div className="avatar mb-4">
            <div className="bg-base-300 w-24 rounded-full">
              {companion.profilePictureUrl ? (
                <Image
                  src={companion.profilePictureUrl}
                  alt={companion.name ?? companion.id}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl">
                  {(companion.name ?? companion.id).charAt(0)}
                </div>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            {companion.name ?? companion.id}
          </h1>
        </div>

        {/* Error Message */}
        {createError && (
          <div className="alert alert-error mb-4">
            <span>{createError.message}</span>
          </div>
        )}

        {/* Chat Start Button */}
        <button
          type="button"
          onClick={handleStartChat}
          disabled={isCreatingChatroom}
          className="btn btn-primary w-full"
        >
          {isCreatingChatroom ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Start Chat"
          )}
        </button>
      </div>
    </main>
  );
}
