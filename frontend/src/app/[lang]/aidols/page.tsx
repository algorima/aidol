"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GroupCard } from "@/components/group/GroupCard";
import { GroupInfoBanner } from "@/components/group/GroupInfoBanner";
import { Loading } from "@/components/Loading";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { AIdol } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface GroupsPageProps {
  params: {
    lang: string;
  };
}

export default function GroupsPage({ params }: GroupsPageProps) {
  const { lang } = params;
  const router = useRouter();
  const [groups, setGroups] = useState<AIdol[]>([]);
  const [memberCountMap, setMemberCountMap] = useState<Record<string, number>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiService = getApiService();
        const aidolRepo = new AIdolRepository(apiService);
        const companionRepo = new CompanionRepository(apiService);

        const [aidolRes, companionRes] = await Promise.all([
          aidolRepo.getList(),
          companionRepo.getList({ pagination: { current: 1, pageSize: 100 } }),
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
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col items-center justify-center">
        <p className="text-body-m text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-mobile mx-auto flex min-h-dvh flex-col">
      <header className="h-header bg-base-100 flex shrink-0 items-center px-6 py-4">
        <Image src="/images/logo.svg" alt="AIdol" width={92} height={28} />
      </header>
      <div className="flex flex-col gap-6 px-6 py-4">
        <GroupInfoBanner />
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              avatarUrl={group.profileImageUrl}
              groupName={group.name ?? ""}
              memberCount={memberCountMap[group.id] ?? 0}
              onClick={() => router.push(`/${lang}/aidols/${group.id}/detail`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
