"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { BottomNavigationContainer } from "@/containers";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { getApiService } from "@/services/ApiService";

export default function MyGroupRedirectPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const { data: myGroups } = await aidolRepository.getMy();
      const firstGroup = myGroups.find((g) => g.status === "PUBLISHED");
      if (firstGroup) {
        router.replace(`/${params.lang}/aidols/my-group/${firstGroup.id}`);
      } else {
        setIsEmpty(true);
      }
    };

    fetchAndRedirect().catch(setError);
  }, [aidolRepository, params.lang, router]);

  if (error) {
    throw error;
  }

  if (isEmpty) {
    return (
      <div className="bg-base-100 flex min-h-dvh flex-col">
        <Header title={t("aidol:myGroup.header")} />
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
          <p className="text-headline-s text-base-content text-center">
            {t("aidol:myGroup.empty.title")}
          </p>
          <p className="text-body-m text-neutral text-center">
            {t("aidol:myGroup.empty.description")}
          </p>
          <Link
            href={`/${params.lang}`}
            className="btn btn-primary text-label-l btn-lg rounded-lg"
          >
            {t("aidol:myGroup.empty.cta")}
          </Link>
        </div>
        <BottomNavigationContainer lang={params.lang} />
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex min-h-dvh flex-col">
      <Loading />
      <BottomNavigationContainer lang={params.lang} />
    </div>
  );
}
