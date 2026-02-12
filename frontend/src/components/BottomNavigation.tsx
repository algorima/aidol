"use client";

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
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

type TabKey = "home" | "explore" | "myGroup";

interface TabConfig {
  key: TabKey;
  getHref: (lang: string) => string;
  matchPath: (pathname: string, lang: string) => boolean;
  labelKey: string;
  IconOutline: HeroIcon;
  IconSolid: HeroIcon;
}

const tabs: TabConfig[] = [
  {
    key: "home",
    getHref: (lang) => `/${lang}/aidols/home`,
    matchPath: (pathname, lang) => pathname === `/${lang}/aidols/home`,
    labelKey: "navigation.home",
    IconOutline: HomeOutline,
    IconSolid: HomeSolid,
  },
  {
    key: "explore",
    getHref: (lang) => `/${lang}/aidols/explore`,
    matchPath: (pathname, lang) =>
      pathname.startsWith(`/${lang}/aidols/explore`),
    labelKey: "navigation.explore",
    IconOutline: SparklesOutline,
    IconSolid: SparklesSolid,
  },
  {
    key: "myGroup",
    getHref: (lang) => `/${lang}/aidols/my-group`,
    matchPath: (pathname, lang) =>
      pathname.startsWith(`/${lang}/aidols/my-group`),
    labelKey: "navigation.myGroup",
    IconOutline: UserCircleOutline,
    IconSolid: UserCircleSolid,
  },
];

interface BottomNavigationProps {
  lang: string;
}

export function BottomNavigation({ lang }: BottomNavigationProps) {
  const { t } = useTranslation("aidol");
  const pathname = usePathname();

  const activeTab =
    tabs.find((tab) => tab.matchPath(pathname, lang))?.key ?? "explore";

  return (
    <nav className="bg-base-100 border-base-300 h-header flex shrink-0 items-center justify-between border-t px-10 py-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = isActive ? tab.IconSolid : tab.IconOutline;

        return (
          <Link
            key={tab.key}
            href={tab.getHref(lang)}
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
