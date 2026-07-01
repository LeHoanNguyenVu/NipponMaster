import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'crimson';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'secondary', size = 'sm', children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full select-none uppercase';

    // Variants configuration
    const variants = {
      primary: 'bg-primary/10 text-primary border border-primary/20',
      secondary: 'bg-surface-container-high text-on-surface-variant',
      outline: 'bg-transparent text-on-surface-variant border border-outline-variant',
      crimson: 'bg-primary text-on-primary',
    };

    // Sizes configuration
    const sizes = {
      sm: 'px-2 py-0.5 text-[10px] tracking-wider',
      md: 'px-3 py-1 text-xs tracking-wider',
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
