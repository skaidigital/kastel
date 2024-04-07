import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

/**
 * StyledInput is a component that wraps the native input element.
 */
export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ error, className, name, ...otherProps }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={name}
          name={name}
          {...otherProps}
          className={cn(
            'w-full rounded-project border border-brand-border bg-white px-3 py-1.5 text-paragraph-sm outline-none placeholder:text-paragraph-sm focus:border-brand-dark-grey disabled:cursor-not-allowed disabled:bg-gray-50',
            error
              ? 'border-red-300 text-red-900 placeholder:text-red-300 focus:border-red-500'
              : '',
            className
          )}
        />
        {error && (
          <p className="mt-2 text-paragraph-sm text-red-500" id="email-error">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

StyledInput.displayName = 'StyledInput';
