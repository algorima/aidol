"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components";
import {
  ChemistryRelationCard,
  HighlightSectionHeader,
  MemberProfileCard,
} from "@/components/group";
import { INTIMACY_TO_RELATIONSHIP_TYPE } from "@/constants/relationship";
import { mockCompanions } from "@/mocks/companions";
import { getMockRelationshipRepository } from "@/repositories/MockRelationshipRepository";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companionRelationship";

interface GroupChemistryPageProps {
  params: {
    lang: string;
    aidolId: string;
  };
}

export default function GroupChemistryPage({
  params,
}: GroupChemistryPageProps) {
  const { lang, aidolId } = params;
  const router = useRouter();
  const { t } = useTranslation();
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [relationships, setRelationships] = useState<CompanionRelationship[]>(
    [],
  );
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const groupCompanions = mockCompanions.filter(
        (c) => c.aidolId === aidolId,
      );
      setCompanions(groupCompanions);

      if (groupCompanions.length > 0) {
        setSelectedCompanionId(groupCompanions[0].id);
      }

      const repo = getMockRelationshipRepository();
      const { data } = await repo.getList();
      setRelationships(data);

      setIsLoading(false);
    };

    void fetchData();
  }, [aidolId]);

  // 선택된 멤버
  const selectedCompanion = companions.find(
    (c) => c.id === selectedCompanionId,
  );

  // 선택된 멤버 외 다른 멤버들
  const otherCompanions = companions.filter(
    (c) => c.id !== selectedCompanionId,
  );

  // 선택된 멤버의 커스텀 관계 수
  const customRelationshipCount = relationships.filter(
    (rel) => rel.fromCompanionId === selectedCompanionId,
  ).length;

  // 모든 멤버와 관계가 형성되었는지
  const isAllRelationshipsCreated =
    customRelationshipCount >= otherCompanions.length;

  // 단방향: from → to 관계 찾기
  const getRelationshipTo = (toId: string) => {
    return relationships.find(
      (rel) =>
        rel.fromCompanionId === selectedCompanionId &&
        rel.toCompanionId === toId,
    );
  };

  const getPositionLabel = (position: string | null | undefined) => {
    if (!position) return t("aidol:position.unassigned");
    return t(`aidol:position.${position}`);
  };

  const getRelationshipType = (intimacy: number) => {
    return INTIMACY_TO_RELATIONSHIP_TYPE[intimacy];
  };

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      <Header title={t("aidol:chemistry.header")} onBackClick={() => router.back()} />

      <div className="flex-1 p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="flex flex-col">
            {/* 멤버 선택 */}
            {/* TODO: useDragScroll hook 적용 */}
            <div className="scrollbar-hide mb-6 flex gap-4 overflow-x-auto p-1">
              {companions.map((companion) => {
                const isSelected = selectedCompanionId === companion.id;
                return (
                  <button
                    key={companion.id}
                    type="button"
                    onClick={() => setSelectedCompanionId(companion.id)}
                    className="flex shrink-0 cursor-pointer flex-col items-center gap-3"
                  >
                    <div
                      className={clsx(
                        "relative size-17.5 overflow-hidden rounded-lg",
                        isSelected
                          ? "ring-primary ring-2"
                          : "border-base-300 border",
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
                        <div className="bg-base-200 size-full" />
                      )}
                    </div>
                    <span
                      className={clsx(
                        "text-label-l",
                        isSelected ? "text-base-content" : "text-base-content",
                      )}
                    >
                      {companion.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 선택된 멤버 프로필 */}
            {selectedCompanion && (
              <div className="mb-8">
                <MemberProfileCard companion={selectedCompanion} />
              </div>
            )}

            {/* 멤버와의 케미 정리 */}
            <div className="mb-4">
              <HighlightSectionHeader
                title={t("aidol:chemistry.sectionTitle")}
                subtitle={t("aidol:chemistry.sectionSubtitle")}
              >
                <Link
                  href={`/${lang}/my-group/${aidolId}/chemistry/add?from=${selectedCompanionId}`}
                  className={clsx(
                    "btn text-label-l rounded-lg",
                    isAllRelationshipsCreated
                      ? "btn-disabled pointer-events-none"
                      : "btn-primary",
                  )}
                  aria-disabled={isAllRelationshipsCreated}
                >
                  {t("aidol:chemistry.addRelationship")} <PlusIcon className="size-5" />
                </Link>
              </HighlightSectionHeader>
            </div>

            {/* 관계 목록 */}
            <div className="flex flex-col gap-4">
              {/* 커스텀 관계 */}
              {otherCompanions
                .map((target) => {
                  const from = companions.find(
                    (c) => c.id === selectedCompanionId,
                  );
                  const customRel = getRelationshipTo(target.id);
                  if (!customRel) return null;

                  const relationshipType = getRelationshipType(
                    customRel.intimacy,
                  );
                  return (
                    <ChemistryRelationCard
                      key={`custom-${target.id}`}
                      fromName={from?.name ?? ""}
                      toName={target.name ?? ""}
                      nickname={customRel.nickname ?? undefined}
                      relationshipType={relationshipType}
                    />
                  );
                })
                .filter(Boolean)}

              {/* 포지션 (프리셋) */}
              {otherCompanions.map((target) => {
                const from = companions.find(
                  (c) => c.id === selectedCompanionId,
                );
                return (
                  <ChemistryRelationCard
                    key={`position-${target.id}`}
                    fromName={from?.name ?? ""}
                    toName={target.name ?? ""}
                    fromLabel={getPositionLabel(from?.position)}
                    toLabel={getPositionLabel(target.position)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
