import type { ReactNode } from "react";

interface SlideProps {
  /** Slide number (1-based) */
  slideNumber: number;
  /** Slide title */
  title: string;
  /** Slide content */
  children: ReactNode;
  /** Whether this slide is currently visible */
  isActive?: boolean;
}

/**
 * Individual slide component for onboarding.
 * Uses StepCard-inspired styling with bg-base-200 and rounded corners.
 */
export function Slide({
  slideNumber,
  title,
  children,
  isActive = true,
}: SlideProps) {
  const formattedNumber = slideNumber.toString().padStart(2, "0");

  if (!isActive) {
    return null;
  }

  return (
    <article
      className="bg-base-200 flex min-h-[400px] flex-col gap-6 rounded-lg p-6"
      role="region"
      aria-label={`Slide ${slideNumber}: ${title}`}
    >
      <span className="text-title-s text-primary">{formattedNumber}</span>
      <h2 className="text-title-s text-base-content">{title}</h2>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </article>
  );
}
