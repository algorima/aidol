import { HomeIcon as HomeSolid } from "@heroicons/react/20/solid";
import {
  HomeIcon as HomeOutline,
  SparklesIcon as SparklesOutline,
  UserCircleIcon as UserCircleOutline,
} from "@heroicons/react/24/outline";
import {
  SparklesIcon as SparklesSolid,
  UserCircleIcon as UserCircleSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type TabKey = "home" | "explore" | "myGroup";

export interface TabItem {
  key: TabKey;
  href: string;
  labelKey: string;
  IconOutline: HeroIcon;
  IconSolid: HeroIcon;
}

export const TAB_ICONS = {
  home: { IconOutline: HomeOutline, IconSolid: HomeSolid },
  explore: { IconOutline: SparklesOutline, IconSolid: SparklesSolid },
  myGroup: { IconOutline: UserCircleOutline, IconSolid: UserCircleSolid },
} as const;

interface BottomNavigationProps {
  tabs: TabItem[];
  activeTab: TabKey;
}

export function BottomNavigation({ tabs, activeTab }: BottomNavigationProps) {
  const { t } = useTranslation("aidol");

  return (
    <nav className="bg-base-100 border-base-300 h-header sticky bottom-0 flex shrink-0 items-center justify-between border-t px-10 py-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = isActive ? tab.IconSolid : tab.IconOutline;

        return (
          <Link
            key={tab.key}
            href={tab.href}
            className="flex flex-col items-center justify-center gap-1"
          >
            <Icon className="text-base-content size-6" />
            <span className="text-label-m text-base-content">
              {t(tab.labelKey)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
