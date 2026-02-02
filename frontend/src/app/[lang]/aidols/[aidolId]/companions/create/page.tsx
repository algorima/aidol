"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { CompanionRepository } from "@/repositories";
import { getApiService } from "@/services/ApiService";

interface CompanionCreatePageProps {
  params: {
    lang: string;
    aidolId: string;
  };
}

export default function CompanionCreatePage({
  params,
}: CompanionCreatePageProps) {
  const router = useRouter();
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );
  const [error, setError] = useState<Error | null>(null);
  const isCreatingRef = useRef(false);

  useEffect(() => {
    if (isCreatingRef.current) return;
    isCreatingRef.current = true;

    const run = async () => {
      try {
        const { data } = await companionRepository.create({
          variables: { name: "", aidolId: params.aidolId },
        });
        router.replace(
          `/${params.lang}/aidols/${params.aidolId}/companions/${data.id}/gender`,
        );
      } catch (err) {
        setError(err as Error);
        isCreatingRef.current = false;
      }
    };
    void run();
  }, [params.lang, params.aidolId, router, companionRepository]);

  if (error) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
