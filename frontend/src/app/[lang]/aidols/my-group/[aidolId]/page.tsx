"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  ChatTooltipButton,
  GroupDropdown,
  GroupProfile,
  HighlightCarousel,
} from "@/components/group";
import { Header } from "@/components/Header";
import { HighlightDetailModal } from "@/components/highlight";
import { AIdolRepository } from "@/repositories/AIdolRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import { HighlightRepository } from "@/repositories/HighlightRepository";
import type { AIdol } from "@/schemas/aidol";
import type { Companion } from "@/schemas/companion";
import type {
  AIdolHighlight,
  HighlightMessage,
  MyGroupHighlightSection,
} from "@/schemas/highlight";
import { getApiService } from "@/services/ApiService";

const groupMyGroupHighlights = (
  highlights: AIdolHighlight[],
): MyGroupHighlightSection[] => {
  const sectionMap = new Map<string, MyGroupHighlightSection>();

  for (const highlight of highlights) {
    const key = `${highlight.title}::${highlight.subtitle}`;

    if (!sectionMap.has(key)) {
      sectionMap.set(key, {
        title: highlight.title,
        subtitle: highlight.subtitle,
        items: [],
      });
    }

    sectionMap.get(key)!.items.push(highlight);
  }

  return Array.from(sectionMap.values());
};

export default function GroupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const params = useParams<{ lang: string; aidolId: string }>();

  const aidolRepository = useMemo(
    () => new AIdolRepository(getApiService()),
    [],
  );
  const highlightRepository = useMemo(
    () => new HighlightRepository(getApiService()),
    [],
  );
  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  // 그룹 상태
  const [groups, setGroups] = useState<AIdol[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<AIdol | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 하이라이트 상태
  const [highlightSections, setHighlightSections] = useState<
    MyGroupHighlightSection[]
  >([]);

  // 하이라이트 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [highlightMessages, setHighlightMessages] = useState<
    HighlightMessage[]
  >([]);
  const [companions, setCompanions] = useState<Companion[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data: myGroups } = await aidolRepository.getMy();
        setGroups(myGroups);

        const currentGroup = myGroups.find((g) => g.id === params.aidolId);
        if (currentGroup) {
          setSelectedGroup(currentGroup);
        } else {
          // 해당 그룹이 없으면 첫 번째 그룹으로 redirect
          const firstGroup = myGroups[0];
          if (firstGroup) {
            router.replace(`/${params.lang}/aidols/my-group/${firstGroup.id}`);
          } else {
            router.replace(`/${params.lang}/aidols/my-group`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        showToast(t("aidol:error.load.group"), "error");
      }
    };

    void fetchGroups();
  }, [aidolRepository, params.aidolId, params.lang, router]);

  useEffect(() => {
    if (!selectedGroup) return;

    const fetchGroupData = async () => {
      try {
        const [highlightsResult, companionsResult] = await Promise.all([
          highlightRepository.getByAidolId(selectedGroup.id),
          companionRepository.getByAidolId(selectedGroup.id),
        ]);

        setHighlightSections(groupMyGroupHighlights(highlightsResult.data));
        setCompanions(companionsResult.data);
      } catch (error) {
        console.error("Failed to fetch group data:", error);
        showToast(t("aidol:error.load.group"), "error");
      }
    };

    void fetchGroupData();
  }, [highlightRepository, companionRepository, selectedGroup]);

  const handleSelectGroup = (group: AIdol) => {
    setIsDropdownOpen(false);
    router.push(`/${params.lang}/aidols/my-group/${group.id}`);
  };

  const handleHighlightClick = async (highlight: AIdolHighlight) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const { data: messagesData } = await highlightRepository.getMessages(
        highlight.id,
      );

      const companionIds = new Set(companions.map((c) => c.id));
      const invalid = messagesData.filter(
        (msg) => msg.companionId !== null && !companionIds.has(msg.companionId),
      );
      if (invalid.length > 0) {
        console.error(
          "Unknown companionIds:",
          invalid.map((msg) => msg.companionId),
        );
      }
      setHighlightMessages(
        messagesData.filter(
          (msg) =>
            msg.companionId === null || companionIds.has(msg.companionId),
        ),
      );
    } catch (error) {
      console.error("Failed to fetch highlight messages:", error);
      showToast(t("aidol:highlight.error.load"), "error");
      setIsModalOpen(false);
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header
        title={selectedGroup?.name ?? ""}
        onDropdownClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <ChatTooltipButton />
        <button
          type="button"
          className="text-label-l text-base-content/20 px-2"
        >
          {t("aidol:myGroup.settings")}
        </button>
      </Header>

      {/* 그룹 선택 드롭다운 */}
      {isDropdownOpen && (
        <GroupDropdown
          groups={groups}
          selectedGroupId={selectedGroup?.id ?? null}
          onSelect={handleSelectGroup}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}

      <div className="bg-base-100 text-base-content flex flex-1 flex-col">
        {selectedGroup && (
          <GroupProfile
            name={t("aidol:group.title")}
            profileImageUrl={selectedGroup.profileImageUrl}
            createdAt={selectedGroup.createdAt}
            onChemistryClick={() =>
              router.push(
                `/${params.lang}/aidols/my-group/${params.aidolId}/chemistry`,
              )
            }
          />
        )}

        {/* 탭 */}
        <div className="px-6 pb-12">
          <p className="border-base-content text-label-l w-fit border-b-2 py-2">
            {t("aidol:myGroup.highlights")}
          </p>

          {/* 하이라이트 섹션들 */}
          {highlightSections.map((section) => (
            <div
              key={`${section.title}-${section.subtitle}`}
              className="mt-6 flex flex-col gap-4"
            >
              <div>
                <p className="text-title-s">{section.title}</p>
                <p className="text-body-s text-neutral">{section.subtitle}</p>
              </div>

              <HighlightCarousel
                items={section.items}
                onItemClick={(item) => void handleHighlightClick(item)}
              />
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation lang={params.lang} />

      <HighlightDetailModal
        isOpen={isModalOpen}
        isLoading={isModalLoading}
        messages={highlightMessages}
        companions={companions}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
