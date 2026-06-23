import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, icon, type = 'text', id, ...props }, ref) => {
    // Generate random ID for accessibility if not provided
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wide text-charcoal-300 select-none uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3.5 text-charcoal-400 pointer-events-none flex items-center justify-center">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`w-full bg-charcoal-900 border ${
              error ? 'border-red-500/70 focus:ring-red-500/30' : 'border-charcoal-800 focus:ring-crimson-600/30 focus:border-crimson-600'
            } text-charcoal-100 placeholder-charcoal-500 rounded-lg text-sm transition-all duration-150 outline-none py-2.5 ${
              icon ? 'pl-10.5 pr-4' : 'px-4'
            } focus:ring-4`}
            {...props}
          />
        </div>
        {error && (
          <span
            id={errorId}
            className="text-xs font-medium text-red-400 mt-0.5"
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="text-xs text-charcoal-400 mt-0.5">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
