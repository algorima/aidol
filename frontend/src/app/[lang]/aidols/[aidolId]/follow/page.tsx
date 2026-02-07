"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { FollowForm } from "@/components/follow";
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
  const { aidolId } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const isValidEmail = EMAIL_REGEX.test(email);

  // TODO: API 연동 후 동적으로 그룹명 가져오기
  const groupName = "데이프레임";

  const leadsRepository = useMemo(
    () => new LeadsRepository(getApiService()),
    [],
  );

  const handleSubmit = async () => {
    if (!email.trim() || !isValidEmail) return;

    setIsLoading(true);
    try {
      await leadsRepository.create({ aidolId, email });
      showToast(t("aidol:group.follow.success"), "accent");
      router.back();
    } catch (error) {
      console.error("Failed to follow:", error);
      showToast(t("aidol:group.follow.error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <FollowForm
      groupName={groupName}
      email={email}
      onEmailChange={setEmail}
      onSubmit={() => void handleSubmit()}
      onClose={handleClose}
      isLoading={isLoading}
      isValidEmail={isValidEmail}
    />
  );
}
