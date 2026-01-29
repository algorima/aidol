import clsx from "clsx";
import { useTranslation } from "react-i18next";

export type GenderTab = "boy" | "girl" | "mixed";

interface GenderFilterTabsProps {
  activeTab: GenderTab;
  onTabChange: (tab: GenderTab) => void;
}

const TABS: GenderTab[] = ["boy", "girl", "mixed"];

export function GenderFilterTabs({
  activeTab,
  onTabChange,
}: GenderFilterTabsProps) {
  const { t } = useTranslation();

  return (
    <div role="tablist" className="tabs tabs-box">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          className={clsx("tab", activeTab === tab && "tab-active")}
          onClick={() => onTabChange(tab)}
        >
          {t(`aidol:casting.tabs.${tab}`)}
        </button>
      ))}
    </div>
  );
}
