import clsx from "clsx";
import Image from "next/image";

import { handleClickKeyDown } from "@/lib/handleClickKeyDown";

interface HighlightCardProps {
  imageUrl: string;
  title: string;
  size?: "full" | "compact";
  onClick?: () => void;
}

const sizeStyles = {
  full: "h-[230px] w-full max-w-[345px]",
  compact: "h-[326px] w-full max-w-[280px]",
} as const;

export function HighlightCard({
  imageUrl,
  title,
  size = "full",
  onClick,
}: HighlightCardProps) {
  return (
    <div
      className={clsx(
        "relative isolate overflow-hidden rounded-lg",
        sizeStyles[size],
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
        <span className="text-title-s text-neutral-content line-clamp-2">
          {title}
        </span>
      </div>
    </div>
  );
}
