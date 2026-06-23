import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, interactive = false, padding = 'md', ...props }, ref) => {
    // Base card styling
    const baseStyles = 'bg-charcoal-900/35 border border-charcoal-800/60 rounded-xl overflow-hidden';
    
    // Hover animation states for interactive variant
    const hoverStyles = interactive
      ? 'hover:border-charcoal-700/80 hover:bg-charcoal-900/50 hover:translate-y-[-1px] transition-all duration-150 ease-out cursor-pointer'
      : 'transition-colors duration-150';

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
