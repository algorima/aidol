"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { Loading } from "@/components/Loading";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { LeadsRepository } from "@/repositories/LeadsRepository";
import type { Companion } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface NewsletterPageProps {
  params: { lang: string; aidolId: string };
}

export default function NewsletterPage({ params }: NewsletterPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [companion, setCompanion] = useState<Companion | undefined>(undefined);

  const leadsRepository = useMemo(
    () => new LeadsRepository(getApiService()),
    [],
  );
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const loadCompanion = async () => {
      try {
        const response = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
        });
        if (response.data.length > 0) {
          setCompanion(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to load companion:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    void loadCompanion();
  }, [aidolId, companionRepository]);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);
    try {
      await leadsRepository.create({ aidolId, email });
      showToast(t("aidol:newsletter.success"), "accent");
      router.push(`/${lang}/${aidolId}/complete`);
    } catch (error) {
      console.error("Failed to subscribe:", error);
      showToast(t("aidol:newsletter.error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isDataLoading) {
    return <Loading />;
  }

  return (
    <NewsletterForm
      companion={companion}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
