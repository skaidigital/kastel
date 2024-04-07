'use client';

import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React from 'react';

const RadixSelect = Select.Root;

const RadixSelectValue = Select.Value;

const RadixSelectTrigger = React.forwardRef<
  React.ElementRef<typeof Select.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select.Trigger>
>(({ className, children, ...props }, ref) => (
  <Select.Trigger
    ref={ref}
    className={cn(
      'ring-offset-background group flex h-9 w-full items-center justify-between whitespace-nowrap rounded-project border border-brand-border bg-transparent px-3 py-2 text-paragraph-sm placeholder:text-brand-mid-grey hover:border-brand-mid-grey focus:border-brand-mid-grey focus:outline-none focus:ring-1 focus:ring-brand-dark-grey disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <Select.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50 group-hover:text-brand-dark-grey group-focus:text-brand-dark-grey" />
    </Select.Icon>
  </Select.Trigger>
));
RadixSelectTrigger.displayName = Select.Trigger.displayName;

const RadixSelectContent = React.forwardRef<
  React.ElementRef<typeof Select.Content>,
  React.ComponentPropsWithoutRef<typeof Select.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <Select.Portal>
    <Select.Content
      ref={ref}
      className={cn(
        'text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-project border bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      {/* <SelectScrollUpButton /> */}
      <Select.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </Select.Viewport>
      {/* <SelectScrollDownButton /> */}
    </Select.Content>
  </Select.Portal>
));

RadixSelectContent.displayName = Select.Content.displayName;

const RadixSelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ className, children, ...props }, ref) => (
  <Select.Item
    ref={ref}
    className={cn(
      'focus:text-text-white group relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-brand-dark-grey hover:text-white focus:bg-brand-dark-grey focus:text-white',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Select.ItemIndicator>
        <CheckIcon className="h-4 w-4 text-brand-dark-grey group-hover:text-white" />
      </Select.ItemIndicator>
    </span>
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
));
RadixSelectItem.displayName = Select.Item.displayName;

export { RadixSelect, RadixSelectContent, RadixSelectItem, RadixSelectTrigger, RadixSelectValue };
