import { useLayoutEffect, useRef } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
  onKeyDown,
}: TextInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className="textarea border-base-400 bg-base-200 min-h-0 w-full resize-none overflow-hidden rounded-lg px-4 py-3"
      rows={1}
    />
  );
}
