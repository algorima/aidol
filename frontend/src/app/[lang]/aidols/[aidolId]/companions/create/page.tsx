"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

export default function CompanionCreatePage() {
  const params = useParams<{ lang: string; aidolId: string }>();
  const router = useRouter();
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const run = async () => {
      const { data } = await companionRepository.create({
        variables: { name: "", aidolId: params.aidolId },
      });
      router.replace(
        `/${params.lang}/aidols/${params.aidolId}/companions/${data.id}/gender`,
      );
    };
    void run();
  }, [params.lang, params.aidolId, router, companionRepository]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
