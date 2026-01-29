"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { getMockCompanionService } from "@/services/MockCompanionService";

export default function CompanionCreatePage() {
  const params = useParams<{ lang: string; aidolId: string }>();
  const router = useRouter();

  useEffect(() => {
    const service = getMockCompanionService();
    const { id } = service.createCompanion(params.aidolId);
    router.replace(
      `/${params.lang}/aidols/${params.aidolId}/companions/${id}/gender`,
    );
  }, [params.lang, params.aidolId, router]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
