import { Loader2Icon } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
}
const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary:
      'bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:translate-y-0',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 active:translate-y-0',
    outline:
      'border border-primary-500 text-primary-500 hover:bg-primary-500/10',
    success: 'bg-green-500 text-[#051626] hover:brightness-90',
    danger: 'bg-red-500 text-white hover:brightness-90',
  };
  return (
    <div>
      <button
        type="button"
        className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center ${variantClasses[variant]} ${className} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2Icon className="animate-spin mr-2 h-4 w-4" />}
        {children}
      </button>
    </div>
  );
};

export default Button;
