import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariants =
  | "primary"
  | "outline"
  | "secondary"
  | "danger"
  | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variants?: ButtonVariants;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variants = "primary",
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:translate-y-0",

    outline:
      "border border-primary-500 text-primary-500 hover:bg-primary-500/10 ",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    danger: "bg-red-500 text-white hover:brightness-90",
    success: "bg-green-500 text-white hover:brightness-90",
  };
  return (
    <div>
      <button
        type="button"
        className={`px-5 py-2.5 rounded-xl font-medium transition-all  flex items-center justify-center gap-1  ${
          variantClasses[variants]
        } ${fullWidth ? "w-full" : ""} ${className}
          ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
          
          `}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading ? (
          <>
            <Loader2
              className="animate-spin"
              width={16}
              height={16}
              color="currentColor"
            />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    </div>
  );
}
