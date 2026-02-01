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
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className="border-base-300 text-body-m placeholder:text-base-300 w-full rounded-lg border bg-white px-4 py-3 text-black focus:outline-none"
    />
  );
}
