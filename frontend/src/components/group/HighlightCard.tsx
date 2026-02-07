import clsx from "clsx";
import Image from "next/image";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";

interface HighlightCardProps {
  imageUrl: string;
  title: string;
  onClick?: () => void;
}

export function HighlightCard({
  imageUrl,
  title,
  onClick,
}: HighlightCardProps) {
  return (
    <div
      className={clsx(
        "relative isolate h-[230px] w-full max-w-[345px] overflow-hidden rounded-lg",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleClickKeyDown(onClick) : undefined}
    >
      <Image src={imageUrl} alt={title} fill className="object-cover" />

      <div className="from-neutral absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent opacity-60" />

      <div className="absolute inset-x-4 bottom-4 z-10">
        <span className="text-headline-m text-neutral-content line-clamp-2">
          {title}
        </span>
      </div>
    </div>
  );
}
