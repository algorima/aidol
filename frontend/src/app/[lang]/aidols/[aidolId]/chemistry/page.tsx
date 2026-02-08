"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import {
  ChemistryContent,
  type ChemistryRelation,
} from "@/components/group/ChemistryContent";
import { Loading } from "@/components/Loading";
import { CompanionRelationshipRepository } from "@/repositories/CompanionRelationshipRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companion-relationship";
import { getApiService } from "@/services/ApiService";

interface ChemistryPageProps {
  params: { lang: string; aidolId: string };
}

export default function ChemistryPage({ params }: ChemistryPageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  const { showToast } = useToast();
  const { aidolId } = params;

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [relations, setRelations] = useState<ChemistryRelation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

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
        const companionsResponse = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
          pagination: { current: 1, pageSize: 100 },
        });
        const fetchedCompanions = companionsResponse.data;
        setCompanions(fetchedCompanions);

        if (fetchedCompanions.length > 0) {
          setSelectedMemberId(fetchedCompanions[0].id);

          const companionIds = fetchedCompanions.map((c) => c.id);
          const relationshipsResponse = await relationshipRepository.getList({
            filters: [
              {
                field: "fromCompanionId",
                operator: "in",
                value: companionIds,
              },
            ],
            pagination: { current: 1, pageSize: 100 },
          });

          const companionMap = new Map(fetchedCompanions.map((c) => [c.id, c]));
          const chemistryRelations = buildChemistryRelations(
            relationshipsResponse.data,
            companionMap,
            t,
          );
          setRelations(chemistryRelations);
        }
      } catch (error) {
        console.error("Failed to fetch chemistry page data:", error);
        showToast(t("chemistry.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, companionRepository, relationshipRepository, showToast, t]);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  const selectedMember = companions.find((c) => c.id === selectedMemberId);

  if (!selectedMember) return null;

  const filteredRelations = relations.filter(
    (r) => r.fromId === selectedMemberId,
  );

  return (
    <ChemistryContent
      companions={companions}
      relations={filteredRelations}
      selectedMember={selectedMember}
      onSelectMember={setSelectedMemberId}
      onBack={() => router.push(`/${params.lang}/aidols/${aidolId}/detail`)}
    />
  );
}

/**
 * API 관계 데이터를 ChemistryRelation으로 변환
 * A→B 관계를 설정하면 A 선택 시에만 B와의 관계가 표시됨
 */
const buildChemistryRelations = (
  relationships: CompanionRelationship[],
  companionMap: Map<string, Companion>,
  t: (key: string, options?: Record<string, unknown>) => string,
): ChemistryRelation[] => {
  const results: ChemistryRelation[] = [];

  for (const rel of relationships) {
    if (!rel.fromCompanionId || !rel.toCompanionId) continue;

    const fromCompanion = companionMap.get(rel.fromCompanionId);
    const toCompanion = companionMap.get(rel.toCompanionId);
    if (!fromCompanion || !toCompanion) continue;

    const fromLabel = fromCompanion.position
      ? t(`position.${fromCompanion.position}`)
      : "";
    const toLabel = toCompanion.position
      ? t(`position.${toCompanion.position}`)
      : "";

    results.push({
      fromId: rel.fromCompanionId,
      toId: rel.toCompanionId,
      fromLabel,
      toLabel,
    });
  }

  return results;
};
