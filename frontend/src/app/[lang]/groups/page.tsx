"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { GenderTab } from "@/components/casting";
import { GenderFilterTabs } from "@/components/casting";
import { GroupCard } from "@/components/group/GroupCard";
import { GroupInfoBanner } from "@/components/group/GroupInfoBanner";
import { Loading } from "@/components/Loading";

type GenderType = "boy" | "girl" | "mixed";

interface MockGroup {
  id: string;
  name: string;
  profileImageUrl: string | null;
  memberCount: number;
  gender: GenderType;
  highlight: {
    thumbnailUrl: string;
    title: string;
  };
}

// TODO: API 구현 후 Repository로 교체
const MOCK_GROUPS: MockGroup[] = [
  {
    id: "group-1",
    name: "르누아르",
    profileImageUrl: "https://placehold.co/96x96/EEE/31343C?text=RN",
    memberCount: 4,
    gender: "boy",
    highlight: {
      thumbnailUrl: "https://placehold.co/345x230/EEE/31343C?text=Highlight+1",
      title: "숙소생활 이야기 1",
    },
  },
  {
    id: "group-2",
    name: "스타라이트",
    profileImageUrl: "https://placehold.co/96x96/EEE/31343C?text=SL",
    memberCount: 5,
    gender: "girl",
    highlight: {
      thumbnailUrl: "https://placehold.co/345x230/EEE/31343C?text=Highlight+2",
      title: "첫 무대 비하인드",
    },
  },
  {
    id: "group-3",
    name: "드리머즈",
    profileImageUrl: "https://placehold.co/96x96/EEE/31343C?text=DR",
    memberCount: 6,
    gender: "mixed",
    highlight: {
      thumbnailUrl: "https://placehold.co/345x230/EEE/31343C?text=Highlight+3",
      title: "연습실 브이로그",
    },
  },
  {
    id: "group-4",
    name: "네온",
    profileImageUrl: "https://placehold.co/96x96/EEE/31343C?text=NE",
    memberCount: 4,
    gender: "boy",
    highlight: {
      thumbnailUrl: "https://placehold.co/345x230/EEE/31343C?text=Highlight+4",
      title: "데뷔 준비 과정",
    },
  },
  {
    id: "group-5",
    name: "루미너스",
    profileImageUrl: "https://placehold.co/96x96/EEE/31343C?text=LM",
    memberCount: 3,
    gender: "girl",
    highlight: {
      thumbnailUrl: "https://placehold.co/345x230/EEE/31343C?text=Highlight+5",
      title: "멤버 소개 영상",
    },
  },
];

const TAB_TO_GENDER: Record<GenderTab, GenderType | undefined> = {
  boy: "boy",
  girl: "girl",
  mixed: undefined,
};

interface GroupsPageProps {
  params: {
    lang: string;
  };
}

export default function GroupsPage({ params }: GroupsPageProps) {
  const { lang } = params;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<GenderTab>("mixed");
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

  const gender = TAB_TO_GENDER[activeTab];
  const filteredGroups = gender
    ? groups.filter((g) => g.gender === gender)
    : groups;

  return (
    <div className="max-w-mobile mx-auto flex min-h-dvh flex-col">
      <div className="flex flex-col gap-6 px-6 py-4">
        <GroupInfoBanner />
        <GenderFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex flex-col gap-6">
          {filteredGroups.map((group) => (
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
