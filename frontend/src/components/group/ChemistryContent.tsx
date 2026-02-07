import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";
import type { Companion } from "@/schemas/companion";

import { ChemistryRelationCard } from "./ChemistryRelationCard";
import { MemberProfileCard } from "./MemberProfileCard";

export interface ChemistryRelation {
  fromId: string;
  toId: string;
  fromLabel: string;
  toLabel: string;
}

interface ChemistryContentProps {
  companions: Companion[];
  relations: ChemistryRelation[];
  selectedMember: Companion;
  onSelectMember: (id: string) => void;
  onBack: () => void;
}

export function ChemistryContent({
  companions,
  relations,
  selectedMember,
  onSelectMember,
  onBack,
}: ChemistryContentProps) {
  const { t } = useTranslation("aidol");

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
        <div className="mt-6 flex gap-3 overflow-x-auto">
          {companions.map((companion) => (
            <div
              key={companion.id}
              role="button"
              tabIndex={0}
              aria-label={companion.name ?? ""}
              className={clsx(
                "relative size-[70px] shrink-0 overflow-hidden rounded-lg",
                companion.id === selectedMember.id
                  ? "border-primary border-2"
                  : "border-base-300 border",
              )}
              onClick={() => onSelectMember(companion.id)}
              onKeyDown={handleClickKeyDown(() => onSelectMember(companion.id))}
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
            {relations.map((relation) => {
              const toMember = companions.find((c) => c.id === relation.toId);
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
