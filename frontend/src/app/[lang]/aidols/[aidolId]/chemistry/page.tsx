"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ChemistryContent,
  type ChemistryRelation,
} from "@/components/group/ChemistryContent";
import type { Companion } from "@/schemas/companion";

const MOCK_COMPANIONS: Companion[] = [
  {
    id: "c1",
    name: "이안",
    grade: "A",
    mbti: "ENFJ",
    position: "mainVocal",
    biography:
      "키 187, 몸무게 78. 수영을 좋아해서 바다가 보이는 곳에 가면 행복해한다. 그룹의 분위기 메이커.",
    profilePictureUrl: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "c2",
    name: "서윤",
    grade: "A",
    mbti: "ISTP",
    position: "mainDancer",
    biography:
      "키 175, 몸무게 62. 춤에 대한 열정이 가득한 완벽주의자. 연습벌레라는 별명을 가지고 있다.",
    profilePictureUrl: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "c3",
    name: "태오",
    grade: "B",
    mbti: "ENTP",
    position: "mainRapper",
    biography:
      "키 180, 몸무게 70. 자유로운 영혼의 래퍼. 작사 작곡을 즐기며 그룹의 크리에이티브를 담당한다.",
    profilePictureUrl: null,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

const MOCK_RELATIONS: ChemistryRelation[] = [
  { fromId: "c1", toId: "c2", fromLabel: "메인보컬", toLabel: "메인댄서" },
  { fromId: "c1", toId: "c3", fromLabel: "리더", toLabel: "래퍼" },
];

export default function ChemistryPage() {
  const router = useRouter();
  const [selectedMemberId, setSelectedMemberId] = useState(
    MOCK_COMPANIONS[0].id,
  );

  const selectedMember = MOCK_COMPANIONS.find((c) => c.id === selectedMemberId);

  if (!selectedMember) return null;

  const filteredRelations = MOCK_RELATIONS.filter(
    (r) => r.fromId === selectedMemberId,
  );

  return (
    <ChemistryContent
      companions={MOCK_COMPANIONS}
      relations={filteredRelations}
      selectedMember={selectedMember}
      onSelectMember={setSelectedMemberId}
      onBack={() => router.back()}
    />
  );
}
