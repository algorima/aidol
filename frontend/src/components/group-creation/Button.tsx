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

const variantStyles: Record<ButtonVariant, string> = {
  neutral: "btn-neutral",
  primary: "btn-primary",
};

export function Button({
  onClick,
  disabled = false,
  isLoading = false,
  variant = "primary",
  children,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        "btn btn-lg text-label-l rounded-lg",
        variantStyles[variant],
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
