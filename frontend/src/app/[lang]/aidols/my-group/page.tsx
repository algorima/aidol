"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AIdolRepository } from "@/repositories/AIdolRepository";
import { getApiService } from "@/services/ApiService";

export default function MyGroupRedirectPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const [error, setError] = useState<Error | null>(null);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const { data: myGroups } = await aidolRepository.getMy();
      const firstGroup = myGroups[0];
      if (firstGroup) {
        router.replace(`/${params.lang}/aidols/my-group/${firstGroup.id}`);
      }
    };

    fetchAndRedirect().catch(setError);
  }, [aidolRepository, params.lang, router]);

  if (error) {
    throw error;
  }

  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}
