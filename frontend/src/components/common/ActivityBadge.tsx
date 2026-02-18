import clsx from "clsx";
import { useTranslation } from "react-i18next";

import type { Activity } from "@/constants/activity";

interface ActivityBadgeProps {
  activity: Activity;
  className?: string;
}

export function ActivityBadge({ activity, className }: ActivityBadgeProps) {
  const { t } = useTranslation("aidol");

  return (
    <span
      className={clsx(
        "bg-accent text-accent-content text-label-m rounded-lg p-1",
        className,
      )}
    >
      {t(`companion.activity.${activity}`)}
    </span>
  );
}
