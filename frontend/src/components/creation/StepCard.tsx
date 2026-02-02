import type { ReactNode } from "react";

interface StepCardProps {
  step: number;
  title: string;
  children: ReactNode;
}

export function StepCard({ step, title, children }: StepCardProps) {
  const formattedStep = step.toString().padStart(2, "0");

  return (
    <div className="bg-base-200 flex w-full flex-col gap-6 rounded-lg p-6">
      <span className="text-title-s text-primary">{formattedStep}</span>
      <h3 className="text-title-s text-base-content">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
