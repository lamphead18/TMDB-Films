import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
    
    const variantClasses = {
      default: 'bg-gradient-primary hover:opacity-90 text-white',
      ghost: 'text-gray-300 hover:text-white hover:bg-white/10'
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';