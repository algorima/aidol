"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GroupCard } from "@/components/group/GroupCard";
import { GroupInfoBanner } from "@/components/group/GroupInfoBanner";
import { Loading } from "@/components/Loading";

import { type MockGroup, MOCK_GROUPS } from "./__mocks__/groups";

interface GroupsPageProps {
  params: {
    lang: string;
  };
}

export default function GroupsPage({ params }: GroupsPageProps) {
  const { lang } = params;
  const router = useRouter();
  const [groups, setGroups] = useState<MockGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API 구현 후 async + Repository 호출로 교체
    // const res = await aidolRepository.getList();
    setGroups(MOCK_GROUPS);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col items-center justify-center">
        <Loading />
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
              groupName={group.name}
              memberCount={group.memberCount}
              highlightImageUrl={group.highlight.thumbnailUrl}
              highlightTitle={group.highlight.title}
              onClick={() => router.push(`/${lang}/aidols/${group.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
