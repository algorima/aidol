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
import { getApiService } from "@/services/ApiService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FollowPageProps {
  params: { lang: string; aidolId: string };
}

export default function FollowPage({ params }: FollowPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [groupName, setGroupName] = useState("");
  const [companionProfileUrl, setCompanionProfileUrl] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const isValidEmail = EMAIL_REGEX.test(email.trim());

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
      setIsLoading(true);
      try {
        const [aidolResponse, companionsResponse] = await Promise.all([
          aidolRepository.getOne({ id: aidolId }),
          companionRepository.getList({
            filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
            pagination: { current: 1, pageSize: 100 },
          }),
        ]);
        setGroupName(aidolResponse.data.name ?? "");
        const firstCompanion = companionsResponse.data[0];
        setCompanionProfileUrl(firstCompanion?.profilePictureUrl ?? null);
      } catch (error) {
        console.error("Failed to fetch follow page data:", error);
        showToast(t("aidol:group.follow.error"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, aidolRepository, companionRepository, showToast, t]);

  const handleSubmit = async () => {
    if (!isValidEmail) return;

    setIsSubmitting(true);
    try {
      await leadsRepository.create({ aidolId, email: email.trim() });
      showToast(t("aidol:group.follow.success"), "accent");
      router.push(`/${lang}/aidols/${aidolId}/detail`);
    } catch (error) {
      console.error("Failed to follow:", error);
      showToast(t("aidol:group.follow.error"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-screen flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <FollowForm
      groupName={groupName}
      companionProfileUrl={companionProfileUrl ?? ""}
      email={email}
      onEmailChange={setEmail}
      onSubmit={() => void handleSubmit()}
      onClose={() => router.push(`/${lang}/aidols/${aidolId}/detail`)}
      isLoading={isSubmitting}
      isValidEmail={isValidEmail}
    />
  );
}
