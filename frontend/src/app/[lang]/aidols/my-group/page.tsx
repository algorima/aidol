"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { AIdolRepository } from "@/repositories/AIdolRepository";
import { getApiService } from "@/services/ApiService";

export default function MyGroupRedirectPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const { data: myGroups } = await aidolRepository.getMy();
        const firstGroup = myGroups[0];
        if (firstGroup) {
          router.replace(`/${params.lang}/aidols/my-group/${firstGroup.id}`);
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    void fetchAndRedirect();
  }, [aidolRepository, params.lang, router]);

  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}
