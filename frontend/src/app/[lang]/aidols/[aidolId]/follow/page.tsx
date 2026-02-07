"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { FollowForm } from "@/components/follow";
import { Loading } from "@/components/Loading";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { LeadsRepository } from "@/repositories/LeadsRepository";
import type { AIdol, Companion } from "@/schemas";
import { getApiService } from "@/services/ApiService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FollowPageProps {
  params: { lang: string; aidolId: string };
}

export default function FollowPage({ params }: FollowPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { aidolId } = params;

  const [aidol, setAidol] = useState<AIdol | null>(null);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const isValidEmail = EMAIL_REGEX.test(email);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );
  const leadsRepository = useMemo(
    () => new LeadsRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsPageLoading(true);
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
        console.error("Failed to fetch group data:", error);
        showToast(t("aidol:group.follow.loadError"), "error");
      } finally {
        setIsPageLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, aidolRepository, companionRepository, showToast, t]);

  const handleSubmit = async () => {
    if (!email.trim() || !isValidEmail) return;

    setIsSubmitting(true);
    try {
      await leadsRepository.create({ aidolId, email });
      showToast(t("aidol:group.follow.success"), "accent");
      router.back();
    } catch (error) {
      console.error("Failed to follow:", error);
      showToast(t("aidol:group.follow.error"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPageLoading) {
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
    <FollowForm
      groupName={aidol.name ?? ""}
      companionProfileUrl={companions[0]?.profilePictureUrl ?? undefined}
      email={email}
      onEmailChange={setEmail}
      onSubmit={() => void handleSubmit()}
      onClose={() => router.back()}
      isLoading={isSubmitting}
      isValidEmail={isValidEmail}
    />
  );
}
