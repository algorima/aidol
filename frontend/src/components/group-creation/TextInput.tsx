interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
}: TextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className="textarea border-base-400 bg-base-200 min-h-0 w-full resize-none overflow-hidden rounded-lg px-4 py-3"
      rows={1}
    />
  );
}
