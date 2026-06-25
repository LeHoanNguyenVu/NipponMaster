import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, interactive = false, padding = 'md', ...props }, ref) => {
    // Base card styling
    const baseStyles = 'bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm';
    
    // Hover animation states for interactive variant
    const hoverStyles = interactive
      ? 'hover:border-primary/50 hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 ease-out cursor-pointer'
      : 'transition-all duration-200';

    // Padding settings
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
