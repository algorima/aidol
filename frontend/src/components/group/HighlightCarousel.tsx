import clsx from "clsx";
import Image from "next/image";

import { useDragScroll } from "@/hooks/useDragScroll";
import type { AIdolHighlight } from "@/schemas/highlight";

interface HighlightCarouselProps {
  items: AIdolHighlight[];
  onItemClick: (item: AIdolHighlight) => void;
}

export function HighlightCarousel({
  items,
  onItemClick,
}: HighlightCarouselProps) {
  const {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDragScroll();

  return (
    <div
      ref={scrollRef}
      className={clsx(
        "scrollbar-hide -mx-6 overflow-x-auto select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex gap-3.5 px-6">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item)}
            className="bg-base-300 relative h-81.5 w-70 shrink-0 cursor-pointer overflow-hidden rounded-lg"
          >
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              draggable={false}
              className="pointer-events-none object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
