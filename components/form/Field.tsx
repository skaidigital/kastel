import { textProps } from '@/components/base/Text';
import { composeTailwindRenderProps, focusRing } from '@/lib/rac';
import { cn } from '@/lib/utils';
import {
  FieldErrorProps,
  Group,
  GroupProps,
  InputProps,
  LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text,
  TextProps,
  composeRenderProps
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={cn(
        'w-fit cursor-default dark:text-zinc-400',
        textProps({ size: 'eyebrow' }),
        props.className
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={cn('text-paragraph-sm text-gray-600', props.className)}
    />
  );
}

// TODO make into text-eyebrow once we can get it to work in tailwind.config
export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={cn('!text-paragraph-sm text-red-600 forced-colors:text-[Mark]', props.className)}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: 'border-brand-border dark:border-zinc-500 forced-colors:border-[ButtonBorder]',
      true: 'border-brand-dark-grey dark:border-zinc-300 forced-colors:border-[Highlight]'
    },
    isInvalid: {
      true: 'border-red-600 dark:border-red-600 forced-colors:border-[Mark]'
    },
    isDisabled: {
      true: 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]'
    }
  }
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: 'group flex items-center h-9 bg-white dark:bg-zinc-900 forced-colors:bg-[Field] border rounded-project overflow-hidden',
  variants: fieldBorderStyles.variants
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className })
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'min-w-0 flex-1 bg-white px-2 py-1.5 !text-paragraph-sm text-gray-800 outline outline-0 disabled:text-gray-200 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600'
      )}
    />
  );
}
