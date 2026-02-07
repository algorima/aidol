"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { GroupProfile } from "@/components/group/GroupProfile";
import { HighlightCard } from "@/components/group/HighlightCard";
import { HighlightSectionHeader } from "@/components/group/HighlightSectionHeader";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import type { AIdol } from "@/schemas";
import { getApiService } from "@/services/ApiService";

// TODO: HighlightRepository 구현 후 삭제
import { MOCK_HIGHLIGHTS } from "./__mocks__/group";

interface GroupDetailPageProps {
  params: { lang: string; aidolId: string };
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [aidol, setAidol] = useState<AIdol | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await aidolRepository.getOne({ id: aidolId });
        setAidol(response.data);
      } catch (error) {
        console.error("Failed to fetch group detail:", error);
        showToast(t("group.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, aidolRepository, showToast, t]);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-screen flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!aidol) {
    return (
      <div className="bg-base-100 flex h-screen flex-col items-center justify-center">
        <p className="text-body-m text-neutral">{t("aidol.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      <Header
        onBackClick={() => router.push(`/${lang}/aidols`)}
        title={aidol.name ?? ""}
      />

      <main className="flex-1">
        <GroupProfile
          name={t("group.title")}
          profileImageUrl={aidol.profileImageUrl}
          createdAt={aidol.createdAt}
          onChemistryClick={() =>
            router.push(`/${lang}/aidols/${aidolId}/chemistry`)
          }
          onFollowClick={() => router.push(`/${lang}/aidols/${aidolId}/follow`)}
        />

        <div className="px-6">
          <span className="text-label-l text-base-content border-base-content inline-block border-b-2 py-2">
            {t("group.highlightTab")}
          </span>
        </div>

        {/* TODO: HighlightRepository 구현 후 교체 */}
        <div className="flex flex-col gap-6 px-6 py-4">
          {MOCK_HIGHLIGHTS.map((section) => (
            <div key={section.id} className="flex flex-col gap-4">
              <HighlightSectionHeader
                title={section.title}
                subtitle={section.subtitle}
              />
              {section.contents.map((content) => (
                <HighlightCard
                  key={content.id}
                  imageUrl={content.imageUrl}
                  title={content.title}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
