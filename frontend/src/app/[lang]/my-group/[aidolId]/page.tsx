"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { useDragScroll } from "@/hooks/useDragScroll";
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
  const {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDragScroll();

  // 그룹 상태
  const [groups, setGroups] = useState<AIdol[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<AIdol | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 하이라이트 상태
  const [highlightSections, setHighlightSections] = useState<
    MyGroupHighlightSection[]
  >([]);

  // TODO: API 연동 시 AIdolRepository.getMy() 사용
  useEffect(() => {
    setGroups(mockAIdols);
    if (mockAIdols.length > 0) {
      setSelectedGroup(mockAIdols[0]);
    }
  }, []);

  // TODO: API 연동 시 HighlightRepository 사용
  useEffect(() => {
    if (!selectedGroup) return;

    const highlights = getMockHighlightsByAidolId(selectedGroup.id);
    const sections = groupMyGroupHighlights(highlights);
    setHighlightSections(sections);
  }, [selectedGroup]);

  const handleSelectGroup = (group: AIdol) => {
    setSelectedGroup(group);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <Header
        title={selectedGroup?.name ?? "그룹 선택"}
        onDropdownClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="relative">
          <button
            type="button"
            className="flex size-10 items-center justify-center"
          >
            <ChatBubbleLeftEllipsisIcon className="text-base-content size-6" />
          </button>
          <div className="absolute top-full right-0 mt-2 w-fit">
            <div className="border-b-neutral absolute -top-2 right-3 size-0 border-x-8 border-b-8 border-x-transparent" />
            <div className="bg-neutral text-neutral-content text-label-m rounded-lg px-4 py-3 whitespace-nowrap">
              멤버들과 채팅 준비중👋
            </div>
          </div>
        </div>
        <button type="button" className="text-label-l text-base-content px-2">
          설정
        </button>
      </Header>

      {/* 그룹 선택 드롭다운 */}
      {isDropdownOpen && (
        <>
          {/* 바깥 클릭 감지용 오버레이 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="bg-base-100 border-base-400 absolute top-15 left-6 z-50 w-49.5 overflow-hidden rounded-lg border shadow-md">
            {groups.map((group, index) => (
              <button
                key={group.id}
                type="button"
                onClick={() => handleSelectGroup(group)}
                className={`flex w-full items-center gap-2.5 p-2 ${
                  index !== groups.length - 1 ? "border-base-400 border-b" : ""
                } ${
                  selectedGroup?.id === group.id
                    ? "bg-base-400"
                    : "hover:bg-base-200"
                }`}
              >
                {/* 그룹 이미지 */}
                <div className="border-base-300 bg-base-200 size-10 shrink-0 overflow-hidden rounded-lg border">
                  {group.profileImageUrl && (
                    <Image
                      src={group.profileImageUrl}
                      alt={group.name ?? ""}
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  )}
                </div>
                {/* 그룹 이름 */}
                <span className="text-body-s text-base-content truncate">
                  {group.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="bg-base-100 text-base-content flex flex-col px-6">
        {/* TODO: 프로필 컴포넌트 추가 예정 */}

        {/* 탭 */}
        <p className="border-base-content text-label-l w-fit border-b-2 py-2">
          하이라이트
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

            {/* 캐러셀 */}
            <div
              ref={scrollRef}
              className={`scrollbar-hide -mx-6 overflow-x-auto select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="flex gap-3.5 px-6">
                {section.items.map((item) => (
                  // TODO: 클릭 시 하이라이트 상세 모달 표시
                  <div
                    key={item.id}
                    className="bg-base-300 relative h-81.5 w-70 shrink-0 cursor-pointer overflow-hidden rounded-lg"
                  >
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.thumbnailTitle}
                      fill
                      draggable={false}
                      className="pointer-events-none object-cover"
                    />
                    {/* 그라데이션 오버레이 */}
                    <div className="absolute inset-x-0 bottom-0 h-40.75 bg-linear-to-t from-black/50 to-transparent" />
                    {/* 타이틀 */}
                    <p className="text-headline-m absolute bottom-4 left-4 text-white">
                      {item.thumbnailTitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
