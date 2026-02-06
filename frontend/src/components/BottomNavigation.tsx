"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  HiMiniHome,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineUserCircle,
  HiSparkles,
  HiUserCircle,
} from "react-icons/hi2";
import type { IconType } from "react-icons/lib";

type TabKey = "home" | "explore" | "myGroup";

interface TabConfig {
  key: TabKey;
  path: string;
  labelKey: string;
  IconOutline: IconType;
  IconSolid: IconType;
}

const tabs: TabConfig[] = [
  {
    key: "home",
    path: "home",
    labelKey: "navigation.home",
    IconOutline: HiOutlineHome,
    IconSolid: HiMiniHome,
  },
  {
    key: "explore",
    path: "casting",
    labelKey: "navigation.explore",
    IconOutline: HiOutlineSparkles,
    IconSolid: HiSparkles,
  },
  {
    key: "myGroup",
    path: "my-group",
    labelKey: "navigation.myGroup",
    IconOutline: HiOutlineUserCircle,
    IconSolid: HiUserCircle,
  },
];

interface BottomNavigationProps {
  aidolId: string;
  lang: string;
}

export function BottomNavigation({ aidolId, lang }: BottomNavigationProps) {
  const { t } = useTranslation("aidol");
  const pathname = usePathname();

  const getActiveTab = (): TabKey => {
    const DEFAULT_TAB: TabKey = "explore";
    const activeTab = tabs.find((tab) =>
      pathname.startsWith(`/${lang}/aidols/${aidolId}/${tab.path}`),
    );
    return activeTab?.key ?? DEFAULT_TAB;
  };

  const activeTab = getActiveTab();

  return (
    <nav className="bg-base-100 border-base-300 h-header flex shrink-0 items-center justify-between border-t px-10 py-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = isActive ? tab.IconSolid : tab.IconOutline;

        return (
          <Link
            key={tab.key}
            href={`/${lang}/aidols/${aidolId}/${tab.path}`}
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
