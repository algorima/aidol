import type { ReactNode } from "react";

interface HighlightSectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function HighlightSectionHeader({
  title,
  subtitle,
  children,
}: HighlightSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-headline-s text-base-content">{title}</h3>
        {subtitle && (
          <p className="text-body-s text-base-content/70">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
