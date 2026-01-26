import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  rightContent?: ReactNode;
}

export function Header({ title, rightContent }: HeaderProps) {
  return (
    <header className="h-header flex items-center justify-between bg-base-100 px-6 py-4">
      <h1 className="text-headline-s text-base-content">{title}</h1>
      {rightContent && <div className="flex items-center">{rightContent}</div>}
    </header>
  );
}
