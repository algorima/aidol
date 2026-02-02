"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { CompleteContent } from "@/components/complete/CompleteContent";
import { Loading } from "@/components/Loading";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { AIdol, Companion } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface CompletePageProps {
  params: { lang: string; aidolId: string };
}

export default function CompletePage({ params }: CompletePageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [aidol, setAidol] = useState<AIdol | null>(null);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
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
        const [aidolResponse, companionsResponse] = await Promise.all([
          aidolRepository.getOne({ id: aidolId }),
          companionRepository.getList({
            filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
          }),
        ]);
        setAidol(aidolResponse.data);
        setCompanions(companionsResponse.data);
      } catch (error) {
        console.error("Failed to fetch aidol:", error);
        showToast(t("aidol:complete.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, aidolRepository, companionRepository, showToast, t]);

  const handleCreateAnother = () => {
    router.push(`/${lang}/create`);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/${lang}/aidols/${aidolId}`;
    await navigator.clipboard.writeText(url);
    showToast(t("aidol:urlCopied"), "accent");
  };

  const handleNewsletter = () => {
    router.push(`/${lang}/aidols/${aidolId}/newsletter`);
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
        <p className="text-body-m text-neutral">{t("aidol:aidol.notFound")}</p>
      </div>
    );
  }

  return (
    <CompleteContent
      aidol={aidol}
      companions={companions}
      onCreateAnother={handleCreateAnother}
      onShare={() => void handleShare()}
      onNewsletter={handleNewsletter}
    />
  );
}
