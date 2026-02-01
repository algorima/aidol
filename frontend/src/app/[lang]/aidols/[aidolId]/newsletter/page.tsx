"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { LeadsRepository } from "@/repositories/LeadsRepository";
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

  const leadsRepository = useMemo(
    () => new LeadsRepository(getApiService()),
    [],
  );

  const handleSubmit = async (email: string) => {
    setIsLoading(true);
    try {
      await leadsRepository.create({ aidolId, email });
      showToast(t("aidol:newsletter.success"), "accent");
      router.push(`/${lang}/aidols/${aidolId}`);
    } catch (error) {
      console.error("Failed to subscribe:", error);
      showToast(t("aidol:newsletter.error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return <NewsletterForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
