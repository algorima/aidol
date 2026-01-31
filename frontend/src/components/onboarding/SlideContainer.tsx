"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { ProgressIndicator } from "./ProgressIndicator";

interface SlideContainerProps {
  /** Total number of slides */
  totalSlides: number;
  /** Render function for slides */
  children: (currentIndex: number) => ReactNode;
  /** Optional callback when slide changes */
  onSlideChange?: (index: number) => void;
}

/**
 * Container for slide navigation.
 * Supports keyboard navigation (left/right arrows) and button controls.
 */
export function SlideContainer({
  totalSlides,
  children,
  onSlideChange,
}: SlideContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    },
    [totalSlides, onSlideChange],
  );

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Slide content */}
      <div className="min-h-[400px]">{children(currentIndex)}</div>

      {/* Progress indicator */}
      <ProgressIndicator
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        onNavigate={goToSlide}
      />

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={isFirstSlide}
          className="btn btn-outline btn-sm flex-1"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={goToNext}
          disabled={isLastSlide}
          className="btn btn-primary btn-sm flex-1"
        >
          {isLastSlide ? "Done" : "Next"}
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-body-s text-base-content/40 text-center">
        Use ← → arrow keys to navigate
      </p>
    </div>
  );
}
