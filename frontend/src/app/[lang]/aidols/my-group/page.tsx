"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { mockAIdols } from "@/mocks/aidols";

export default function MyGroupRedirectPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  useEffect(() => {
    // TODO: API 연동 시 AIdolRepository.getMy() 사용
    const firstGroup = mockAIdols[0];
    if (firstGroup) {
      router.replace(`/${params.lang}/aidols/my-group/${firstGroup.id}`);
    }
  }, [params.lang, router]);

  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}
