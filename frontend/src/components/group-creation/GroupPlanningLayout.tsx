import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Header";

interface GroupPlanningLayoutProps {
  step: number;
  totalSteps: number;
  children: ReactNode;
  bottomButton: ReactNode;
}

export function GroupPlanningLayout({
  step,
  totalSteps,
  children,
  bottomButton,
}: GroupPlanningLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base-100 flex h-screen flex-col">
      <Header title={t("aidol:groupPlanning.header")} />
      <div className="flex flex-1 flex-col gap-6">
        <div className="px-6 py-4">
          <progress
            className="progress progress-primary h-3 w-full"
            value={step}
            max={totalSteps}
          />
        </div>
        <div className="flex w-full flex-1 flex-col items-center gap-6 overflow-y-auto px-6 pb-24">
          {children}
        </div>
        <div className="max-w-mobile fixed inset-x-0 bottom-0 z-10 mx-auto px-6 pb-6">
          <div className="bg-base-100">{bottomButton}</div>
        </div>
      </div>
    </div>
  );
}
