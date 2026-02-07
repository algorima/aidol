"use client";

import { useRouter } from "next/navigation";

import { MarketingEmail } from "@/components/marketing";

interface MarketingPageProps {
  params: { lang: string; aidolId: string };
}

export default function MarketingPage({ params }: MarketingPageProps) {
  const router = useRouter();
  const { lang, aidolId } = params;

  // TODO: API 연동 후 동적으로 그룹명 가져오기
  const groupName = "데이프레임";

  const handleCtaClick = () => {
    router.push(`/${lang}/aidols/my-group/${aidolId}`);
  };

  return <MarketingEmail groupName={groupName} onCtaClick={handleCtaClick} />;
}
