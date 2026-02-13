"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { Loading } from "@/components/Loading";
import { BottomNavigationContainer } from "@/containers";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { getApiService } from "@/services/ApiService";

export default function ExplorePage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const isCreating = useRef(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    if (isCreating.current) return;
    isCreating.current = true;

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
        router.replace(`/${params.lang}/aidols/home`);
      }
    };

    void createAndRedirect();
  }, [aidolRepository, params.lang, router, showToast, t]);

  return (
    <div className="bg-base-100 flex min-h-dvh flex-col">
      <Loading />
      <BottomNavigationContainer lang={params.lang} />
    </div>
  );
}
