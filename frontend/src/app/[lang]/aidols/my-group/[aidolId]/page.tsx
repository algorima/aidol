"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  GroupDropdown,
  GroupProfile,
  HighlightCarousel,
} from "@/components/group";
import { Header } from "@/components/Header";
import { mockAIdols } from "@/mocks/aidols";
import { getMockHighlightsByAidolId } from "@/mocks/highlights";
import type { AIdol } from "@/schemas/aidol";
import type { Highlight, MyGroupHighlightSection } from "@/schemas/highlight";

const groupMyGroupHighlights = (
  highlights: Highlight[],
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
  const params = useParams<{ lang: string; aidolId: string }>();

  // 그룹 상태
  const [groups, setGroups] = useState<AIdol[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<AIdol | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 하이라이트 상태
  const [highlightSections, setHighlightSections] = useState<
    MyGroupHighlightSection[]
  >([]);

  // 채팅 툴팁 상태
  const [showChatTooltip, setShowChatTooltip] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const handleTooltipDismiss = () => {
    setShowChatTooltip(false);
    setIsFirstVisit(false);
  };

  // TODO: API 연동 시 AIdolRepository.getMy() 사용
  useEffect(() => {
    setGroups(mockAIdols);
    const currentGroup = mockAIdols.find((g) => g.id === params.aidolId);
    if (currentGroup) {
      setSelectedGroup(currentGroup);
    }
  }, [params.aidolId]);

  // TODO: API 연동 시 HighlightRepository 사용
  useEffect(() => {
    if (!selectedGroup) return;

    const highlights = getMockHighlightsByAidolId(selectedGroup.id);
    const sections = groupMyGroupHighlights(highlights);
    setHighlightSections(sections);
  }, [selectedGroup]);

  const handleSelectGroup = (group: AIdol) => {
    setIsDropdownOpen(false);
    router.push(`/${params.lang}/my-group/${group.id}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header
        title={selectedGroup?.name ?? ""}
        onDropdownClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div
          className="relative"
          onMouseEnter={() => !isFirstVisit && setShowChatTooltip(true)}
          onMouseLeave={() => !isFirstVisit && setShowChatTooltip(false)}
        >
          <button
            type="button"
            className="relative z-50 flex size-10 items-center justify-center"
            onClick={() => !isFirstVisit && setShowChatTooltip((prev) => !prev)}
          >
            <ChatBubbleLeftEllipsisIcon className="text-base-content/20 size-6" />
          </button>
          {showChatTooltip && (
            <>
              {isFirstVisit && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={handleTooltipDismiss}
                />
              )}
              <div className="absolute top-full right-0 z-50 mt-2 w-fit">
                <div className="border-b-neutral absolute -top-2 right-3 size-0 border-x-8 border-b-8 border-x-transparent" />
                <div className="bg-neutral text-neutral-content text-label-m rounded-lg px-4 py-3 whitespace-nowrap">
                  {t("aidol:myGroup.chatComingSoon")}
                </div>
              </div>
            </>
          )}
        </div>
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
        <GroupProfile
          profileImageUrl={selectedGroup?.profileImageUrl ?? null}
          createdAt={selectedGroup?.createdAt ?? new Date().toISOString()}
          onChemistryClick={() =>
            router.push(`/${params.lang}/my-group/${params.aidolId}/chemistry`)
          }
        />

        {/* 탭 */}
        <div className="px-6">
          <p className="border-base-content text-label-l w-fit border-b-2 py-2">
            {t("aidol:myGroup.highlights")}
          </p>

          {/* 하이라이트 섹션들 */}
          {highlightSections.map((section, sectionIndex) => (
            <div
              key={`${section.title}-${sectionIndex}`}
              className="mt-6 flex flex-col gap-4"
            >
              <div>
                <p className="text-title-s">{section.title}</p>
                <p className="text-body-s text-neutral">{section.subtitle}</p>
              </div>

              {/* TODO: 클릭 시 하이라이트 상세 모달 표시 */}
              <HighlightCarousel items={section.items} onItemClick={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
