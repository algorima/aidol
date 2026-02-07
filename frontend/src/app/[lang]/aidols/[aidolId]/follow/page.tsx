"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import bubbleProfile from "@/assets/newsletter/bubble-profile.png";
import { FollowForm } from "@/components/follow";
import { LeadsRepository } from "@/repositories/LeadsRepository";
import { getApiService } from "@/services/ApiService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: API 연동 후 삭제
// AIdolRepository.getOne({ id: aidolId }) → aidol.name
// CompanionRepository.getList({ filters: [{ field: "aidolId", ... }] }) → companions[0].profilePictureUrl
// 참고: /aidols/[aidolId]/page.tsx 패턴 참조
const MOCK_GROUP_NAME = "르누아르";
const MOCK_COMPANION_PROFILE_URL = bubbleProfile.src;

interface FollowPageProps {
  params: { lang: string; aidolId: string };
}

export default function FollowPage({ params }: FollowPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { aidolId } = params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const isValidEmail = EMAIL_REGEX.test(email);

  const leadsRepository = useMemo(
    () => new LeadsRepository(getApiService()),
    [],
  );

  const handleSubmit = async () => {
    if (!email.trim() || !isValidEmail) return;

    setIsSubmitting(true);
    try {
      await leadsRepository.create({ aidolId, email });
      showToast(t("aidol:group.follow.success"), "accent");
      router.push(`/${params.lang}/aidols/${aidolId}/detail`);
    } catch (error) {
      console.error("Failed to follow:", error);
      showToast(t("aidol:group.follow.error"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FollowForm
      groupName={MOCK_GROUP_NAME}
      companionProfileUrl={MOCK_COMPANION_PROFILE_URL}
      email={email}
      onEmailChange={setEmail}
      onSubmit={() => void handleSubmit()}
      onClose={() => router.push(`/${params.lang}/aidols/${aidolId}/detail`)}
      isLoading={isSubmitting}
      isValidEmail={isValidEmail}
    />
  );
}
