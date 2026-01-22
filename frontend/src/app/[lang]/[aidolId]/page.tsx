"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CompanionGrid } from "@/components/aidol/CompanionGrid";
import { GroupHeader } from "@/components/aidol/GroupHeader";
import { ShareButton } from "@/components/ShareButton";
import { AIDOL_NS } from "@/i18n";
import { AIdolRepository, CompanionRepository } from "@/repositories";
import type { AIdol } from "@/schemas/aidol";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

interface AIdolProfilePageProps {
  params: {
    lang: string;
    aidolId: string;
  };
}

/**
 * AIdol 그룹 프로필 페이지 (Container)
 * - 데이터 페칭
 * - 라우팅
 * - UI는 GroupHeader, CompanionGrid에 위임
 */
export default function AIdolProfilePage({
  params,
}: AIdolProfilePageProps): JSX.Element {
  const { lang, aidolId } = params;
  const router = useRouter();
  const { t } = useTranslation();

  const [aidol, setAidol] = useState<AIdol | null>(null);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch AIdol and Companions
  useEffect(() => {
    void (async () => {
      try {
        setIsLoading(true);

        // Fetch AIdol
        const aidolResponse = await aidolRepository.getOne({ id: aidolId });
        setAidol(aidolResponse.data);

        // Fetch Companions
        const companionsResponse = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
        });
        setCompanions(companionsResponse.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [aidolId, aidolRepository, companionRepository]);

  const handleCompanionClick = (companionId: string) => {
    router.push(`/${lang}/companions/${companionId}`);
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${lang}/${aidolId}`
      : "";

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error || !aidol) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>{error?.message || t("aidol.notFound", { ns: AIDOL_NS })}</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-base-200 px-6 py-20">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-start justify-between">
          <GroupHeader aidol={aidol} />
          <ShareButton url={shareUrl} />
        </div>
        <CompanionGrid
          companions={companions}
          onCompanionClick={handleCompanionClick}
        />
      </div>
    </main>
  );
}
