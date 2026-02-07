import type { KeyboardEvent } from "react";

export const handleClickKeyDown =
  (onClick: () => void) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };
