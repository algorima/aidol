"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { getMockCompanionRepository } from "@/repositories/MockCompanionRepository";

export default function CompanionCreatePage() {
  const params = useParams<{ lang: string; aidolId: string }>();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const repository = getMockCompanionRepository();
      const { data } = await repository.create({
        variables: { name: "", aidolId: params.aidolId },
      });
      router.replace(
        `/${params.lang}/aidols/${params.aidolId}/companions/${data.id}/gender`,
      );
    };
    void run();
  }, [params.lang, params.aidolId, router]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
