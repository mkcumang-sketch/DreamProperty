import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0231c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070a] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#e0231c] text-white hover:bg-[#ff3b34] hover:shadow-[0_8px_24px_rgba(224,35,28,0.35)]',
      secondary:
        'bg-[#0a0e12]/80 text-[#dfe7e0] border border-[rgba(223,231,224,0.15)] hover:border-[#e0231c] hover:bg-[#0a0e12] hover:text-white',
      outline:
        'bg-transparent text-[#dfe7e0] border border-[rgba(223,231,224,0.2)] hover:border-white hover:text-white',
      whatsapp:
        'bg-[#25D366]/15 text-[#55ef8e] border border-[#25D366]/40 hover:bg-[#25D366]/25 hover:border-[#25D366] hover:text-white',
      ghost: 'bg-transparent text-[#aab4ad] hover:text-white hover:bg-white/5',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
