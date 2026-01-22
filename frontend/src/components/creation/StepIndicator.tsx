"use client";

import clsx from "clsx";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

/**
 * Step indicator for multi-step creation flow.
 * Uses DaisyUI steps component.
 */
export function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  return (
    <ul className="steps w-full">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <li
            key={stepNumber}
            className={clsx(
              "step",
              (isCompleted || isCurrent) && "step-primary",
            )}
          >
            {labels?.[index] ?? ""}
          </li>
        );
      })}
    </ul>
  );
}
