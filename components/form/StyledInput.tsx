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
            'w-full rounded-[2px] border border-brand-light-grey bg-white p-3 text-sm outline-none placeholder:text-sm focus:border-brand-dark-grey disabled:cursor-not-allowed disabled:bg-gray-50',
            error
              ? 'border-red-300 text-red-900 placeholder:text-red-300 focus:border-red-500'
              : '',
            className
          )}
        />
        {error && (
          <p className="mt-2 text-xs text-red-500" id="email-error">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

StyledInput.displayName = 'StyledInput';
