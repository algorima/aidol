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
    <div role="tablist" className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          className={clsx(
            "text-label-l rounded-lg border p-2",
            activeTab === tab
              ? "border-base-content text-base-content"
              : "border-base-300 text-base-300",
          )}
          onClick={() => onTabChange(tab)}
        >
          {t(`aidol:casting.tabs.${tab}`)}
        </button>
      ))}
    </div>
  );
}
