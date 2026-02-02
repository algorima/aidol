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
    <div className="flex flex-col gap-2">
      <span className="text-label-l text-base-content">{label}</span>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range range-primary range-sm"
      />
      <div className="flex justify-between">
        <span className="text-label-m text-primary">{leftLabel}</span>
        <span className="text-label-m text-primary">{rightLabel}</span>
      </div>
    </div>
  );
}
