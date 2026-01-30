import { LottiePlayer } from "@aioia/core/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/companion/Card";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { Modal } from "@/components/Modal";
import type { AIdol, Companion } from "@/schemas";

const CONFETTI_LOTTIE =
  "https://lottie.host/a70b93b6-03dc-4d9a-940f-00ed2dac7606/it1zaaxfmb.json";

interface CompleteContentProps {
  aidol: AIdol;
  companions: Companion[];
  onCreateAnother: () => void;
  onShare: () => void;
  onNewsletter: () => void;
}

export function CompleteContent({
  aidol,
  companions,
  onCreateAnother,
  onShare,
  onNewsletter,
}: CompleteContentProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    setHasDragged(true);
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (companion: Companion) => {
    if (!hasDragged) {
      setSelectedCompanion(companion);
    }
  };

  // 초기 로드 시 중앙 카드로 스크롤
  useEffect(() => {
    if (scrollRef.current && companions.length > 1) {
      const firstCard = scrollRef.current.querySelector("[data-card]");
      if (firstCard instanceof HTMLElement) {
        const cardWidth = firstCard.offsetWidth;
        const gap = parseFloat(getComputedStyle(scrollRef.current).gap) || 16;
        const centerIndex = Math.floor(companions.length / 2);
        scrollRef.current.scrollLeft = centerIndex * (cardWidth + gap);
      }
    }
  }, [companions.length]);

  return (
    <div className="bg-base-100 relative flex min-h-screen flex-col items-center gap-8 px-6 py-12">
      {/* Lottie 배경 효과 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <LottiePlayer
          src={CONFETTI_LOTTIE}
          autoplay
          loop={false}
          className="size-full"
          {...({ keepLastFrame: true } as object)}
        />
      </div>

      {/* 상단: 엠블럼 + 그룹 이름 + 인사말 */}
      <div className="flex w-full flex-col items-center gap-3">
        <div className="border-base-300 relative size-20 overflow-hidden rounded-lg border">
          {aidol.profileImageUrl && (
            <Image
              src={aidol.profileImageUrl}
              alt={aidol.name}
              fill
              className="object-contain"
            />
          )}
        </div>
        <h1 className="text-display-s text-base-content text-center">
          {aidol.name}
        </h1>
        <div className="text-headline-s text-center">
          <p className="text-neutral">{t("aidol:complete.greeting1")}</p>
          <p className="text-base-content">
            {t("aidol:complete.greeting2", { name: aidol.name })}
          </p>
          <p className="text-base-content">{t("aidol:complete.greeting3")}</p>
        </div>
      </div>

      {/* 멤버 카드 가로 스크롤 (드래그 지원, 중앙 정렬) */}
      {companions.length > 0 && (
        <div
          ref={scrollRef}
          className={`scrollbar-hide bg-base-100 w-full overflow-x-auto select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="bg-base-100 flex gap-4 px-[calc(50%-127px)]">
            {companions.map((companion) => (
              <div key={companion.id} data-card className="w-card shrink-0">
                <Card
                  companion={companion}
                  variant="position"
                  onClick={() => handleCardClick(companion)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="flex w-full gap-4">
        <button
          type="button"
          onClick={onCreateAnother}
          className="text-label-l bg-neutral text-neutral-content flex-1 cursor-pointer rounded-lg border-0 p-4 shadow-none"
        >
          {t("aidol:complete.createAnother")}
        </button>
        <button
          type="button"
          onClick={onShare}
          className="text-label-l bg-primary text-primary-content flex-1 cursor-pointer rounded-lg border-0 p-4 shadow-none"
        >
          {t("aidol:complete.share")}
        </button>
      </div>

      {/* 그라데이션 버튼 */}
      <button
        type="button"
        onClick={onNewsletter}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-[#e70051] to-[#9e54ff] p-4"
      >
        <p className="text-label-l text-white">{t("aidol:complete.banner")}</p>
      </button>

      {/* 멤버 프로필 모달 */}
      <Modal
        isOpen={selectedCompanion !== null}
        onClose={() => setSelectedCompanion(null)}
      >
        {selectedCompanion && <ProfileContent companion={selectedCompanion} />}
      </Modal>
    </div>
  );
}
