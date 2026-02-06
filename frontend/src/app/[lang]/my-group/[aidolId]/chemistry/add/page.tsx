"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { Card, Header } from "@/components";
import {
  RELATIONSHIP_TYPE_TO_INTIMACY,
  type RelationshipType,
} from "@/constants/relationship";
import { getParticle } from "@/lib/koreanParticle";
import { mockCompanions } from "@/mocks/companions";
import { getMockRelationshipRepository } from "@/repositories/MockRelationshipRepository";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companionRelationship";

const RELATIONSHIP_TYPES = Object.keys(
  RELATIONSHIP_TYPE_TO_INTIMACY,
) as RelationshipType[];

interface AddRelationshipPageProps {
  params: {
    lang: string;
    aidolId: string;
  };
}

export default function AddRelationshipPage({
  params,
}: AddRelationshipPageProps) {
  const { lang, aidolId } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const fromCompanionId = searchParams.get("from");

  const [step, setStep] = useState<1 | 2>(1);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [relationships, setRelationships] = useState<CompanionRelationship[]>(
    [],
  );
  const [targetCompanionId, setTargetCompanionId] = useState<string | null>(
    null,
  );
  const [selectedType, setSelectedType] = useState<RelationshipType>("awkward");
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const groupCompanions = mockCompanions.filter(
        (c) => c.aidolId === aidolId,
      );
      setCompanions(groupCompanions);

      const repo = getMockRelationshipRepository();
      const { data } = await repo.getList();
      setRelationships(data);

      setIsLoading(false);
    };

    void fetchData();
  }, [aidolId]);

  const fromCompanion = companions.find((c) => c.id === fromCompanionId);
  const targetCompanion = companions.find((c) => c.id === targetCompanionId);
  const otherCompanions = companions.filter((c) => c.id !== fromCompanionId);

  // 단방향: from → to 방향의 관계만 확인
  const getRelationshipFrom = (
    fromId: string,
    toId: string,
  ): CompanionRelationship | undefined => {
    return relationships.find(
      (rel) => rel.fromCompanionId === fromId && rel.toCompanionId === toId,
    );
  };

  const intimacy = RELATIONSHIP_TYPE_TO_INTIMACY[selectedType];

  const handleNext = () => {
    if (targetCompanionId) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setTargetCompanionId(null);
    setSelectedType("awkward");
    setNickname("");
    setStep(1);
  };

  const handleSave = async () => {
    if (!fromCompanionId || !targetCompanionId) return;

    const repo = getMockRelationshipRepository();
    await repo.create({
      fromCompanionId,
      toCompanionId: targetCompanionId,
      intimacy,
      nickname: nickname || null,
    });

    showToast(t("aidol:common.saved"), "success");
    router.push(`/${lang}/my-group/${aidolId}/chemistry`);
  };

  if (isLoading) {
    return (
      <div className="bg-base-100 flex min-h-screen flex-col">
        <Header
          title={t("aidol:chemistry.add.header")}
          onCloseClick={() => router.back()}
        />
        <div className="flex flex-1 items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </div>
    );
  }

  if (!fromCompanion) {
    return (
      <div className="bg-base-100 flex min-h-screen flex-col">
        <Header
          title={t("aidol:chemistry.add.header")}
          onCloseClick={() => router.back()}
        />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-base-content/60">
            {t("aidol:chemistry.add.memberNotFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      <Header
        title={t("aidol:chemistry.add.header")}
        onCloseClick={() => router.back()}
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* 안내 메시지 (공통) */}
        <p className="text-headline-s mb-6">
          ✨
          {t("aidol:chemistry.add.createRelationshipWith", {
            name: fromCompanion.name,
            particle: getParticle(fromCompanion.name ?? "", "과", "와"),
          })}
        </p>

        {/* 선택된 멤버 표시 영역 (공통) */}
        <div className="bg-base-200 mb-6 flex items-center justify-center gap-4 rounded-lg p-2">
          <Card
            companion={fromCompanion}
            variant="position"
            className="h-46 w-33.5"
          />

          <ArrowLongRightIcon className="text-base-content size-6" />

          {targetCompanion ? (
            <Card
              companion={targetCompanion}
              variant="position"
              className="h-46 w-33.5"
            />
          ) : (
            <div className="bg-base-300 text-base-400 border-base-400 flex h-46 w-33.5 flex-col items-center justify-center gap-2 rounded-lg border">
              <SparklesIcon className="size-6" />
              <span className="text-body-s text-center whitespace-pre-line">
                {t("aidol:chemistry.add.selectedMemberPlaceholder")}
              </span>
            </div>
          )}
        </div>

        {/* Step 1: 멤버 선택 */}
        {step === 1 && (
          <>
            <p className="text-title-s mb-4">
              {t("aidol:chemistry.add.selectMember")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {otherCompanions.map((member) => {
                const relationship = getRelationshipFrom(
                  fromCompanionId!,
                  member.id,
                );
                const hasRelationship =
                  relationship && relationship.intimacy > 0;
                const isSelected = member.id === targetCompanionId;

                return (
                  <Card
                    key={member.id}
                    companion={member}
                    variant="position"
                    className={clsx(
                      "h-50 w-full",
                      isSelected && "border-primary ring-primary ring-2",
                    )}
                    disabled={hasRelationship}
                    overlayText={
                      hasRelationship
                        ? relationship.nickname ?? undefined
                        : undefined
                    }
                    onClick={
                      !hasRelationship
                        ? () => setTargetCompanionId(member.id)
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Step 2: 관계 설정 */}
        {step === 2 && (
          <>
            {/* 관계 유형 */}
            <p className="text-title-s mb-4">
              {t("aidol:chemistry.add.relationshipType")}
            </p>
            <div className="text-label-l mb-6 grid grid-flow-col grid-cols-2 grid-rows-4 gap-2">
              {RELATIONSHIP_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={clsx(
                    "btn flex-1 rounded-lg p-2.5",
                    selectedType === type
                      ? "bg-primary/20 text-primary border-primary"
                      : "btn-outline border-base-300 text-base-content",
                  )}
                >
                  {t(`aidol:chemistry.add.types.${type}`)}
                </button>
              ))}
            </div>

            {/* 친밀도 */}
            <p className="text-title-s mb-2">
              {t("aidol:chemistry.add.intimacy")}
            </p>
            <p className="text-label-l mb-4">
              {t("aidol:chemistry.add.startsAt", { intimacy })}
            </p>
            <div className="bg-base-300 mb-6 h-2 w-full overflow-hidden rounded-full">
              <div
                className="to-secondary from-primary h-full rounded-full bg-linear-to-r transition-all"
                style={{ width: `${intimacy}%` }}
              />
            </div>

            {/* 관계 별칭 */}
            <p className="text-title-s mb-4">
              {t("aidol:chemistry.add.relationshipNickname")}
            </p>
            <input
              type="text"
              placeholder={t("aidol:chemistry.add.nicknamePlaceholder")}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input border-base-400 bg-base-200 text-body-s placeholder:text-base-400 w-full rounded-lg border px-4 py-3"
            />
          </>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="p-4">
        {step === 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!targetCompanionId}
            className="btn btn-primary text-label-l btn-lg w-full rounded-lg"
          >
            {t("aidol:creation.next")}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="btn bg-base-300 text-label-l btn-lg rounded-lg px-10"
            >
              {t("aidol:creation.back")}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary text-label-l btn-lg flex-1 rounded-lg"
            >
              {t("aidol:common.save")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
