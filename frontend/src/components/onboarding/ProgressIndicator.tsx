"use client";

import clsx from "clsx";

interface ProgressIndicatorProps {
  /** Current slide index (0-based) */
  currentIndex: number;
  /** Total number of slides */
  totalSlides: number;
  /** Callback when dot is clicked */
  onNavigate?: (index: number) => void;
}

/**
 * Progress indicator for slides.
 * Shows clickable dots representing each slide.
 */
export function ProgressIndicator({
  currentIndex,
  totalSlides,
  onNavigate,
}: ProgressIndicatorProps) {
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <div className="flex flex-col gap-2">
      {/* Progress bar */}
      <div className="bg-base-300 h-1 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onNavigate?.(index)}
            className={clsx(
              "size-2 rounded-full transition-colors",
              index === currentIndex
                ? "bg-primary"
                : "bg-base-300 hover:bg-base-content/30",
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "step" : undefined}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-body-s text-base-content/60 text-center">
        {currentIndex + 1} / {totalSlides}
      </p>
    </div>
  );
}
