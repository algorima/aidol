"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { GenderTab } from "@/components/casting";
import { GenderFilterTabs } from "@/components/casting";
import { GroupCard } from "@/components/group/GroupCard";
import { GroupInfoBanner } from "@/components/group/GroupInfoBanner";

type GenderType = "boy" | "girl" | "mixed";

interface MockGroup {
  id: string;
  name: string;
  profileImageUrl: string;
  memberCount: number;
  gender: GenderType;
  highlight: {
    thumbnailUrl: string;
    title: string;
  };
}

const MOCK_GROUPS: MockGroup[] = [
  {
    id: "group-1",
    name: "르누아르",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
    memberCount: 4,
    gender: "boy",
    highlight: {
      thumbnailUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=345&h=230&fit=crop",
      title: "숙소생활 이야기 1",
    },
  },
  {
    id: "group-2",
    name: "스타라이트",
    profileImageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop",
    memberCount: 5,
    gender: "girl",
    highlight: {
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=345&h=230&fit=crop",
      title: "첫 무대 비하인드",
    },
  },
  {
    id: "group-3",
    name: "드리머즈",
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
    memberCount: 6,
    gender: "mixed",
    highlight: {
      thumbnailUrl:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=345&h=230&fit=crop",
      title: "연습실 브이로그",
    },
  },
  {
    id: "group-4",
    name: "네온",
    profileImageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=96&h=96&fit=crop",
    memberCount: 4,
    gender: "boy",
    highlight: {
      thumbnailUrl:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=345&h=230&fit=crop",
      title: "데뷔 준비 과정",
    },
  },
  {
    id: "group-5",
    name: "루미너스",
    profileImageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop",
    memberCount: 3,
    gender: "girl",
    highlight: {
      thumbnailUrl:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=345&h=230&fit=crop",
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

  const gender = TAB_TO_GENDER[activeTab];
  const filteredGroups = gender
    ? MOCK_GROUPS.filter((g) => g.gender === gender)
    : MOCK_GROUPS;

  return (
    <div className="max-w-mobile mx-auto flex min-h-screen flex-col">
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
              onClick={() => router.push(`/${lang}/${group.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
