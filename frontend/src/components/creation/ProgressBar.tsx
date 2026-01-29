interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="bg-base-300 h-2 w-full overflow-hidden rounded-full">
      <div
        className="from-primary to-secondary h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
