"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { getApiService } from "@/services/ApiService";

export default function ExplorePage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [error, setError] = useState(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const createAndRedirect = async () => {
      try {
        const aidol = await aidolRepository.createAIdol({
          name: "",
          profileImageUrl: "",
        });
        router.replace(`/${params.lang}/aidols/${aidol.id}/casting`);
      } catch (err) {
        console.error("Failed to create AIdol:", err);
        showToast(t("aidol:landing.error.create"), "error");
        setError(true);
        router.replace(`/${params.lang}/aidols/home`);
      }
    };

    void createAndRedirect();
  }, [aidolRepository, params.lang, router, showToast, t]);

  if (error) {
    return null;
  }

  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}
