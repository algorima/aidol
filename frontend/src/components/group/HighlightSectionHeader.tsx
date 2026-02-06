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
        <h3 className="text-title-s text-base-content break-keep">{title}</h3>
        {subtitle && <p className="text-body-s text-neutral break-keep">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
