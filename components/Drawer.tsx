'use client';

import { Overlay } from '@/components/Overlay';
import { TouchTarget } from '@/components/TouchTarget';
import { Heading } from '@/components/base/Heading';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface Props {
  children: React.ReactNode;
  placement?: 'left' | 'right' | 'bottom';
  className?: string;
}

export function DrawerContent({ children, placement = 'right', className }: Props) {
  return (
    <Dialog.Portal>
      <Overlay />
      <Dialog.Content
        forceMount
        className={cn(
          'border-brand-border fixed z-30 flex h-screen w-full max-w-md flex-col rounded-project bg-white transition-[transform,opacity]  will-change-[transform,opacity] focus:outline-none',
          placement === 'bottom' &&
            'bottom-0 left-0 border-t data-[state=closed]:animate-drawer-bottom-hide data-[state=open]:animate-drawer-bottom-show',
          placement === 'left' &&
            'left-0 top-0 border-r data-[state=closed]:animate-drawer-left-hide data-[state=open]:animate-drawer-left-show',
          placement === 'right' &&
            'right-0 top-0 border-l data-[state=closed]:animate-drawer-right-hide data-[state=open]:animate-drawer-right-show',
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

interface DrawerRootProps {
  isOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Drawer({ children, isOpen, onOpenChange }: DrawerRootProps) {
  const isControlled = isOpen !== undefined;

  return (
    <Dialog.Root
      open={isControlled ? isOpen : undefined}
      onOpenChange={isControlled ? onOpenChange : undefined}
    >
      {children}
    </Dialog.Root>
  );
}

interface DrawerTriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function DrawerTrigger({ children, className, asChild = true }: DrawerTriggerProps) {
  return (
    <Dialog.Trigger asChild={asChild} className={className}>
      {children}
    </Dialog.Trigger>
  );
}

interface DrawerCloseProps {
  children: ReactNode;
}

export function DrawerClose({ children }: DrawerCloseProps) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}

interface DrawerHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DrawerHeader({ children, className }: DrawerHeaderProps) {
  return (
    <div className={cn('border-brand-border mb-8 border-b', className)}>
      <div className="flex items-center justify-between px-6 py-4">
        <Dialog.Title asChild>
          <Heading as="h3" size="xs">
            {children}
          </Heading>
        </Dialog.Title>
        <DrawerClose>
          <button>
            <TouchTarget>
              <XMarkIcon className="transition-brand h-4 w-4 text-brand-mid-grey hover:text-brand-dark-grey" />
            </TouchTarget>
          </button>
        </DrawerClose>
      </div>
    </div>
  );
}
