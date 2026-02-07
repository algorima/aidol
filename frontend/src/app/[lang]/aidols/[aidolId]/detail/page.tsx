"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { GroupProfile } from "@/components/group/GroupProfile";
import { HighlightCard } from "@/components/group/HighlightCard";
import { HighlightSectionHeader } from "@/components/group/HighlightSectionHeader";
import { Header } from "@/components/Header";

// TODO: API 구현 후 삭제. AIdolRepository.getOne()로 교체
import { MOCK_GROUP_DETAIL } from "./__mocks__/group";

interface GroupDetailPageProps {
  params: { lang: string; aidolId: string };
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  // TODO: API 구현 후 useToast() 추가하여 에러 핸들링
  const group = MOCK_GROUP_DETAIL;

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      <Header
        onBackClick={() => router.push(`/${params.lang}/aidols`)}
        title={group.name}
      />

      <main className="flex-1">
        <GroupProfile
          name={group.groupTitle}
          profileImageUrl={group.profileImageUrl}
          createdAt={group.createdAt}
          onChemistryClick={() =>
            router.push(`/${params.lang}/aidols/${params.aidolId}/chemistry`)
          }
          onFollowClick={() =>
            router.push(`/${params.lang}/aidols/${params.aidolId}/follow`)
          }
        />

        <div className="px-6">
          <span className="text-label-l text-base-content border-base-content inline-block border-b-2 py-2">
            {t("group.highlightTab")}
          </span>
        </div>

        <div className="flex flex-col gap-6 px-6 py-4">
          {group.highlights.map((section) => (
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
