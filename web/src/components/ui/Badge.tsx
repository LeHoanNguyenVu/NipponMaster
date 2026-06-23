import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'crimson';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'secondary', size = 'sm', children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full select-none';

    // Variants configuration
    const variants = {
      primary: 'bg-charcoal-900 text-charcoal-100 border border-charcoal-800',
      secondary: 'bg-charcoal-800 text-charcoal-200',
      outline: 'bg-transparent text-charcoal-300 border border-charcoal-800',
      crimson: 'bg-crimson-950/40 border border-crimson-800/40 text-crimson-200',
    };

    // Sizes configuration
    const sizes = {
      sm: 'px-2 py-0.5 text-[10px] tracking-wide',
      md: 'px-2.5 py-1 text-xs tracking-wide',
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
