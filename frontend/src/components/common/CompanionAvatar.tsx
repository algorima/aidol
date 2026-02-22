import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

const sizeConfig = {
  sm: {
    container: "size-10",
    icon: "size-5",
    lock: "size-5",
    badge: "size-3.5 border-[3px]",
  },
  md: {
    container: "size-12",
    icon: "size-6",
    lock: "size-6",
    badge: "size-4.5 border-4",
  },
  lg: {
    container: "size-20",
    icon: "size-10",
    lock: "size-8",
    badge: "size-6 border-4",
  },
};

interface CompanionAvatarProps {
  imageUrl?: string | null;
  name: string;
  active?: boolean;
  size?: AvatarSize;
  className?: string;
}

export function CompanionAvatar({
  imageUrl,
  name,
  active = true,
  size = "md",
  className,
}: CompanionAvatarProps) {
  const config = sizeConfig[size];

  return (
    <div className={clsx("relative w-fit shrink-0", className)}>
      <div
        className={clsx(
          "border-base-300 bg-base-200 relative overflow-hidden rounded-lg border",
          config.container,
        )}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center">
            <UserIcon className={clsx("text-base-content/50", config.icon)} />
          </div>
        )}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LockClosedIcon className={clsx("text-white", config.lock)} />
          </div>
        )}
      </div>
      {active && (
        <span
          className={clsx(
            "bg-primary border-base-100 absolute -right-1 -bottom-1 rounded-full",
            config.badge,
          )}
        />
      )}
    </div>
  );
}
