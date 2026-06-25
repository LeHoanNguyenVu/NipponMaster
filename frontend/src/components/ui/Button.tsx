import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 outline-none select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]';

    // Variants config
    const variants = {
      primary: 'bg-primary hover:bg-primary-container text-on-primary shadow-sm border border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface',
      secondary: 'bg-surface-container-low border border-outline-variant hover:border-outline hover:bg-surface-container text-on-surface focus:ring-2 focus:ring-outline focus:ring-offset-2 focus:ring-offset-surface',
      ghost: 'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low focus:ring-2 focus:ring-outline-variant',
      danger: 'bg-error-container text-on-error-container hover:bg-error hover:text-on-error border border-error-container focus:ring-2 focus:ring-error',
    };

    // Sizes config
    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4.5 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="flex items-center shrink-0">{icon}</span>
        )}
        <span className="truncate leading-none">{children}</span>
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="flex items-center shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
