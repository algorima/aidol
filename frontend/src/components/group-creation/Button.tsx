import clsx from "clsx";

type ButtonVariant = "neutral" | "primary";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  ButtonVariant,
  { enabled: string; disabled: string }
> = {
  neutral: {
    enabled: "bg-neutral text-neutral-content",
    disabled: "bg-neutral/20 text-neutral-content",
  },
  primary: {
    enabled: "bg-primary text-primary-content",
    disabled: "bg-primary/20 text-primary-content",
  },
};

export function Button({
  onClick,
  disabled = false,
  isLoading = false,
  variant = "neutral",
  children,
  className,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const styles = variantStyles[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        "btn btn-lg text-label-l rounded-lg border-0 shadow-none",
        isDisabled ? styles.disabled : styles.enabled,
        className,
      )}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        children
      )}
    </button>
  );
}
