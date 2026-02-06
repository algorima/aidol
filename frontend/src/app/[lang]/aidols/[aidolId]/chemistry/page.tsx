"use client";

import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ChemistryRelationCard } from "@/components/group/ChemistryRelationCard";
import { MemberProfileCard } from "@/components/group/MemberProfileCard";
import { handleClickKeyDown } from "@/lib/handleClickKeyDown";
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

interface MockRelation {
  fromId: string;
  toId: string;
  fromLabel: string;
  toLabel: string;
}

const MOCK_RELATIONS: MockRelation[] = [
  { fromId: "c1", toId: "c2", fromLabel: "메인보컬", toLabel: "메인댄서" },
  { fromId: "c1", toId: "c3", fromLabel: "리더", toLabel: "래퍼" },
];

export default function ChemistryPage() {
  const { t } = useTranslation("aidol");
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
    <div className="bg-base-100 max-w-mobile min-w-mobile mx-auto flex min-h-dvh flex-col">
      <header className="h-header bg-base-100 flex shrink-0 items-center gap-2 px-6 py-4">
        <button type="button" onClick={() => router.back()} aria-label="Back">
          <ArrowLeftIcon className="text-base-content size-6" />
        </button>
        <h1 className="text-headline-s text-base-content">
          {t("chemistry.header")}
        </h1>
      </header>

      <div className="flex flex-col px-4">
        {/* Member thumbnail list */}
        <div className="mt-6 flex gap-3 overflow-x-auto">
          {MOCK_COMPANIONS.map((companion) => (
            <div
              key={companion.id}
              role="button"
              tabIndex={0}
              aria-label={companion.name ?? ""}
              className={clsx(
                "relative size-[70px] shrink-0 overflow-hidden rounded-lg border-2",
                companion.id === selectedMemberId
                  ? "border-primary"
                  : "border-base-300",
              )}
              onClick={() => setSelectedMemberId(companion.id)}
              onKeyDown={handleClickKeyDown(() =>
                setSelectedMemberId(companion.id),
              )}
            >
              {companion.profilePictureUrl ? (
                <Image
                  src={companion.profilePictureUrl}
                  alt={companion.name ?? ""}
                  fill
                  draggable={false}
                  className="object-cover"
                />
              ) : (
                <div className="bg-base-200 flex size-full items-center justify-center">
                  <UserIcon className="text-neutral size-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected member profile */}
        <div className="mt-14">
          <MemberProfileCard companion={selectedMember} />
        </div>

        {/* Chemistry relations section */}
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-title-s text-base-content font-bold">
              {t("chemistry.relationTitle")}
            </span>
            <span className="text-body-s text-neutral">
              {t("chemistry.relationSubtitle")}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {filteredRelations.map((relation) => {
              const toMember = MOCK_COMPANIONS.find(
                (c) => c.id === relation.toId,
              );
              if (!toMember) return null;
              return (
                <ChemistryRelationCard
                  key={`${relation.fromId}-${relation.toId}`}
                  fromName={selectedMember.name ?? ""}
                  toName={toMember.name ?? ""}
                  fromLabel={relation.fromLabel}
                  toLabel={relation.toLabel}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
