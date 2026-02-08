"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { Card, Header } from "@/components";
import { SelectMemberStep, SetRelationshipStep } from "@/components/chemistry";
import {
  RELATIONSHIP_TYPE_TO_INTIMACY,
  type RelationshipType,
} from "@/constants/relationship";
import { getParticle } from "@/lib/koreanParticle";
import {
  CompanionRelationshipRepository,
  CompanionRepository,
} from "@/repositories";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companionRelationship";
import { getApiService } from "@/services/ApiService";

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

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );
  const relationshipRepository = useMemo(
    () => new CompanionRelationshipRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { data: groupCompanions } =
          await companionRepository.getByAidolId(aidolId);
        setCompanions(groupCompanions);

        const { data: relationshipData } =
          await relationshipRepository.getList();
        setRelationships(relationshipData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }

      setIsLoading(false);
    };

    void fetchData();
  }, [aidolId, companionRepository, relationshipRepository]);

  const fromCompanion = companions.find((c) => c.id === fromCompanionId);
  const targetCompanion = companions.find((c) => c.id === targetCompanionId);
  const otherCompanions = companions.filter((c) => c.id !== fromCompanionId);

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

    try {
      await relationshipRepository.create({
        variables: {
          fromCompanionId,
          toCompanionId: targetCompanionId,
          intimacy,
          nickname: nickname || null,
        },
      });

      showToast(t("aidol:common.saved"), "accent");
      router.push(`/${lang}/aidols/my-group/${aidolId}/chemistry`);
    } catch (error) {
      console.error("Failed to create relationship:", error);
      showToast(t("aidol:common.error.save"), "error");
    }
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
          <SelectMemberStep
            companions={otherCompanions}
            relationships={relationships}
            fromCompanionId={fromCompanionId!}
            selectedCompanionId={targetCompanionId}
            onSelect={setTargetCompanionId}
          />
        )}

        {/* Step 2: 관계 설정 */}
        {step === 2 && (
          <SetRelationshipStep
            selectedType={selectedType}
            nickname={nickname}
            onTypeChange={setSelectedType}
            onNicknameChange={setNickname}
          />
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
