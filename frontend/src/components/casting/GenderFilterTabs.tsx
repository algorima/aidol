import clsx from "clsx";
import { useTranslation } from "react-i18next";

export type GenderTab = "boy" | "girl" | "mixed";

interface GenderFilterTabsProps {
  activeTab: GenderTab;
  onTabChange: (tab: GenderTab) => void;
}

const TABS: GenderTab[] = ["mixed", "boy", "girl"];

export function GenderFilterTabs({
  activeTab,
  onTabChange,
}: GenderFilterTabsProps) {
  const { t } = useTranslation("aidol");

  return (
    <div role="tablist" className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          className={clsx(
            "bg-base-200 text-label-l rounded-lg border p-2",
            activeTab === tab
              ? "border-base-content text-base-content"
              : "border-base-400 text-base-400",
          )}
          onClick={() => onTabChange(tab)}
        >
          {t(`casting.tabs.${tab}`)}
        </button>
      ))}
    </div>
  );
}
