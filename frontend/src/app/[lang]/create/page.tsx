"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  GroupCreation,
  type GroupCreationFormData,
} from "@/components/creation/GroupCreation";
import { AIdolRepository, CompanionRepository } from "@/repositories";
import type { AIdolCreate, ImageGenerationRequest } from "@/schemas/aidol";
import type { CompanionCreate } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

interface AIdolCreatePageProps {
  params: {
    lang: string;
  };
}

/**
 * AIdol 생성 페이지 (Container)
 * - Repository 및 mutation 관리
 * - 라우팅
 * - UI는 GroupCreation에 위임
 */
export default function AIdolCreatePage({
  params,
}: AIdolCreatePageProps): JSX.Element {
  const { lang } = params;
  const router = useRouter();

  const [createdAIdolId, setCreatedAIdolId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Repositories (fancall pattern: singleton ApiService)
  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const handleGenerateImage = useCallback(
    async (prompt: string): Promise<string | null> => {
      setIsGeneratingImage(true);
      setError(null);
      try {
        const request: ImageGenerationRequest = { prompt };
        const response = await aidolRepository.generateImage(request);
        return response.data.imageUrl;
      } catch (err) {
        setError(err as Error);
        return null;
      } finally {
        setIsGeneratingImage(false);
      }
    },
    [aidolRepository],
  );

  const handleSubmit = useCallback(
    async (data: GroupCreationFormData) => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Create AIdol group (profileImageUrl is now required)
        const claimToken = uuidv4();
        const aidolData: AIdolCreate = {
          name: data.groupName,
          concept: data.concept || null,
          profileImageUrl: data.profileImageUrl,
          claimToken,
        };

        const { data: aidol } = await aidolRepository.create({
          variables: aidolData,
        });

        // Store claimToken in localStorage for ownership
        const storedTokens = JSON.parse(
          localStorage.getItem("aidol_claim_tokens") || "{}",
        ) as Record<string, string>;
        storedTokens[aidol.id] = claimToken;
        localStorage.setItem(
          "aidol_claim_tokens",
          JSON.stringify(storedTokens),
        );

        // 2. Create companions
        for (const member of data.members) {
          const companionData: CompanionCreate = {
            aidolId: aidol.id,
            name: member.name,
            systemPrompt: member.systemPrompt || null,
          };
          await companionRepository.create({ variables: companionData });
        }

        setCreatedAIdolId(aidol.id);
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [aidolRepository, companionRepository],
  );

  const handleComplete = useCallback(() => {
    if (createdAIdolId) {
      router.push(`/${lang}/${createdAIdolId}`);
    }
  }, [createdAIdolId, lang, router]);

  return (
    <>
      {error && (
        <div className="mb-4 alert alert-error">
          <span>{error.message}</span>
        </div>
      )}
      <GroupCreation
        onSubmit={handleSubmit}
        onComplete={handleComplete}
        onGenerateImage={handleGenerateImage}
        isLoading={isLoading}
        isGeneratingImage={isGeneratingImage}
        isCompleted={createdAIdolId !== null}
      />
    </>
  );
}
