"use client";

import { usePathname } from "next/navigation";

import {
  BottomNavigation,
  TAB_ICONS,
  type TabItem,
  type TabKey,
} from "@/components/BottomNavigation";

interface BottomNavigationContainerProps {
  lang: string;
}

const getActiveTab = (pathname: string, lang: string): TabKey => {
  // Home 탭: /aidols/home
  if (pathname === `/${lang}/aidols/home`) {
    return "home";
  }

  // Explore 탭: /aidols/explore 또는 모든 casting 페이지
  if (
    pathname.startsWith(`/${lang}/aidols/explore`) ||
    pathname.endsWith("/casting")
  ) {
    return "explore";
  }

  // My Group 탭: /aidols/my-group/*
  if (pathname.startsWith(`/${lang}/aidols/my-group`)) {
    return "myGroup";
  }

  // Fallback
  return "explore";
};

export function BottomNavigationContainer({
  lang,
}: BottomNavigationContainerProps) {
  const pathname = usePathname();

  const tabs: TabItem[] = [
    {
      key: "home",
      href: `/${lang}/aidols/home`,
      labelKey: "navigation.home",
      ...TAB_ICONS.home,
    },
    {
      key: "explore",
      href: `/${lang}/aidols/explore`,
      labelKey: "navigation.explore",
      ...TAB_ICONS.explore,
    },
    {
      key: "myGroup",
      href: `/${lang}/aidols/my-group`,
      labelKey: "navigation.myGroup",
      ...TAB_ICONS.myGroup,
    },
  ];

  const activeTab = getActiveTab(pathname, lang);

  return <BottomNavigation tabs={tabs} activeTab={activeTab} />;
}
