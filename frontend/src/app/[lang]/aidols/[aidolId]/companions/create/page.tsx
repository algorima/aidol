"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { getMockCompanionRepository } from "@/repositories/MockCompanionRepository";

export default function CompanionCreatePage() {
  const params = useParams<{ lang: string; aidolId: string }>();
  const router = useRouter();

  useEffect(() => {
    const repository = getMockCompanionRepository();
    const { id } = repository.createCompanion(params.aidolId);
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
