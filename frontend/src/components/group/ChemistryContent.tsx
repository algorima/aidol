import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { INTIMACY_TO_RELATIONSHIP_TYPE } from "@/constants/relationship";
import { handleClickKeyDown } from "@/lib/handleClickKeyDown";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companion-relationship";

import { ChemistryRelationCard } from "./ChemistryRelationCard";
import { MemberProfileCard } from "./MemberProfileCard";

interface ChemistryContentProps {
  companions: Companion[];
  relationships: CompanionRelationship[];
  selectedMember: Companion;
  onSelectMember: (id: string) => void;
  onBack: () => void;
}

export function ChemistryContent({
  companions,
  relationships,
  selectedMember,
  onSelectMember,
  onBack,
}: ChemistryContentProps) {
  const { t } = useTranslation("aidol");

  const otherCompanions = companions.filter((c) => c.id !== selectedMember.id);

  const getRelationshipTo = (toId: string) => {
    return relationships.find(
      (rel) =>
        rel.fromCompanionId === selectedMember.id && rel.toCompanionId === toId,
    );
  };

  const getPositionLabel = (position: string | null | undefined) => {
    if (!position) return t("position.unassigned");
    return t(`position.${position}`);
  };

  return (
    <div className="bg-base-100 max-w-mobile min-w-mobile mx-auto flex min-h-dvh flex-col">
      <header className="h-header bg-base-100 flex shrink-0 items-center gap-2 px-6 py-4">
        <button type="button" onClick={onBack} aria-label="Back">
          <ArrowLeftIcon className="text-base-content size-6" />
        </button>
        <h1 className="text-headline-s text-base-content">
          {t("chemistry.header")}
        </h1>
      </header>

      <div className="flex flex-col px-4">
        {/* Member thumbnail list */}
        <div className="mt-6 flex gap-3 overflow-x-auto p-1">
          {companions.map((companion) => (
            <div
              key={companion.id}
              role="button"
              tabIndex={0}
              aria-label={companion.name ?? ""}
              className="flex shrink-0 flex-col items-center gap-3"
              onClick={() => onSelectMember(companion.id)}
              onKeyDown={handleClickKeyDown(() => onSelectMember(companion.id))}
            >
              <div
                className={clsx(
                  "relative size-17.5 overflow-hidden rounded-lg",
                  companion.id === selectedMember.id
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
                  <div className="bg-base-200 flex size-full items-center justify-center">
                    <UserIcon className="text-neutral size-8" />
                  </div>
                )}
              </div>
              <span className="text-label-l text-base-content text-center">
                {companion.name ?? ""}
              </span>
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
            <span className="text-title-s text-base-content">
              {t("chemistry.sectionTitle")}
            </span>
            <span className="text-body-s text-neutral">
              {t("chemistry.sectionSubtitle")}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* 커스텀 관계 */}
            {otherCompanions
              .map((target) => {
                const customRel = getRelationshipTo(target.id);
                if (!customRel) return null;

                const relationshipType =
                  INTIMACY_TO_RELATIONSHIP_TYPE[customRel.intimacy ?? 0];

                return (
                  <ChemistryRelationCard
                    key={`custom-${target.id}`}
                    fromName={selectedMember.name ?? ""}
                    toName={target.name ?? ""}
                    relationshipType={customRel.nickname ?? undefined}
                    description={relationshipType}
                  />
                );
              })
              .filter(Boolean)}

            {/* 포지션 (프리셋) */}
            {otherCompanions.map((target) => (
              <ChemistryRelationCard
                key={`position-${target.id}`}
                fromName={selectedMember.name ?? ""}
                toName={target.name ?? ""}
                fromLabel={getPositionLabel(selectedMember.position)}
                toLabel={getPositionLabel(target.position)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
