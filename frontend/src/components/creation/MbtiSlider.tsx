interface MbtiSliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export function MbtiSlider({
  label,
  leftLabel,
  rightLabel,
  value,
  onChange,
}: MbtiSliderProps) {
  return (
    <div className="flex flex-col">
      <span className="text-label-l text-neutral mb-4">{label}</span>
      <div className="flex flex-col px-6">
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range range-primary range-sm mb-2"
        />
        <div className="text-primary text-label-m mx-2 flex justify-between">
          <div className="flex w-0 flex-col items-center gap-1.5">
            <div className="bg-primary h-2 w-px"></div>
            <span className="whitespace-nowrap">{leftLabel}</span>
          </div>
          <div className="flex w-0 flex-col items-center gap-1.5">
            <div className="bg-primary h-2 w-px"></div>
            <span className="whitespace-nowrap">{rightLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
