import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Header";

import { ProgressBar } from "./ProgressBar";

interface CompanionCreateLayoutProps {
  step: number;
  totalSteps: number;
  children: ReactNode;
  bottomButton: ReactNode;
}

export function CompanionCreateLayout({
  step,
  totalSteps,
  children,
  bottomButton,
}: CompanionCreateLayoutProps) {
  const { t } = useTranslation();
  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-dvh flex-col">
      <Header title={t("aidol:companionCreate.title")} />
      <ProgressBar progress={progress} />
      <div className="flex flex-1 flex-col gap-6 p-6">{children}</div>
      <div className="sticky bottom-0 p-6">{bottomButton}</div>
    </div>
  );
}
