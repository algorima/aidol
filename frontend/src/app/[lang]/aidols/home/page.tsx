"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { GroupCard } from "@/components/group/GroupCard";
import { GroupInfoBanner } from "@/components/group/GroupInfoBanner";
import { Loading } from "@/components/Loading";
import { BottomNavigationContainer } from "@/containers";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { HighlightRepository } from "@/repositories/HighlightRepository";
import type { AIdol, AIdolHighlight } from "@/schemas";
import { getApiService } from "@/services/ApiService";

export default function GroupsPage() {
  const { t } = useTranslation("aidol");
  const params = useParams<{ lang: string }>();
  const { lang } = params;
  const router = useRouter();
  const { showToast } = useToast();

  const aidolRepo = useMemo(() => new AIdolRepository(getApiService()), []);
  const companionRepo = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );
  const highlightRepo = useMemo(
    () => new HighlightRepository(getApiService()),
    [],
  );

  const [groups, setGroups] = useState<AIdol[]>([]);
  const [memberCountMap, setMemberCountMap] = useState<Record<string, number>>(
    {},
  );
  const [highlightMap, setHighlightMap] = useState<
    Record<string, AIdolHighlight>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aidolRes, companionRes, highlightRes] = await Promise.all([
          aidolRepo.getList(),
          companionRepo.getList({ pagination: { current: 1, pageSize: 100 } }),
          highlightRepo.getList({ pagination: { current: 1, pageSize: 100 } }),
        ]);

        setGroups(aidolRes.data);

        const countMap: Record<string, number> = {};
        for (const companion of companionRes.data) {
          if (companion.aidolId) {
            countMap[companion.aidolId] =
              (countMap[companion.aidolId] ?? 0) + 1;
          }
        }
        setMemberCountMap(countMap);

        // 그룹별 첫 번째 무료 하이라이트만 사용
        const freeHighlights = highlightRes.data.filter((h) => !h.isPremium);
        const hlMap: Record<string, AIdolHighlight> = {};
        for (const highlight of freeHighlights) {
          if (highlight.aidolId && !hlMap[highlight.aidolId]) {
            hlMap[highlight.aidolId] = highlight;
          }
        }
        setHighlightMap(hlMap);
      } catch (error) {
        console.error("Failed to fetch group list:", error);
        showToast(t("groupList.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, [aidolRepo, companionRepo, highlightRepo, showToast, t]);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col">
        <Loading />
        <BottomNavigationContainer lang={lang} />
      </div>
    );
  }

  return (
    <div className="max-w-mobile mx-auto flex min-h-dvh flex-col">
      <header className="h-header bg-base-100 flex shrink-0 items-center px-6 py-4">
        <Image src="/images/logo.svg" alt="AIdol" width={92} height={28} />
      </header>
      <div className="flex flex-1 flex-col gap-6 px-6 py-4">
        <GroupInfoBanner />
        <div className="flex flex-col gap-6">
          {groups.map((group) => {
            const highlight = highlightMap[group.id];
            return (
              <GroupCard
                key={group.id}
                avatarUrl={group.profileImageUrl}
                groupName={group.name ?? ""}
                memberCount={memberCountMap[group.id] ?? 0}
                highlightImageUrl={highlight?.thumbnailUrl}
                highlightTitle={highlight?.title}
                onClick={() =>
                  router.push(`/${lang}/aidols/${group.id}/detail`)
                }
              />
            );
          })}
        </div>
      </div>
      <BottomNavigationContainer lang={lang} />
    </div>
  );
}
