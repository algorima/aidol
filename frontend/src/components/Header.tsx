import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  rightContent?: ReactNode;
}

export function Header({ title, rightContent }: HeaderProps) {
  return (
    <header className="h-header bg-base-100 flex shrink-0 items-center justify-between px-6 py-4">
      <h1 className="text-headline-s text-base-content">{title}</h1>
      {rightContent && <div className="flex items-center">{rightContent}</div>}
    </header>
  );
}
