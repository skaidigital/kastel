'use client';

import { overlayClasses } from '@/components/Overlay';
import { TouchTarget } from '@/components/TouchTarget';
import { Heading } from '@/components/base/Heading';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ReactNode } from 'react';
import { Drawer } from 'vaul';

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
  overlayClassName?: string;
}

export function SheetContent({ children, title, className, overlayClassName }: Props) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className={cn(overlayClasses, overlayClassName)} />
      <Drawer.Content
        forceMount
        className={cn(
          'fixed bottom-0 left-0 z-30 flex w-full flex-col rounded-project bg-white transition-[transform,opacity]  will-change-[transform,opacity] focus:outline-none',
          className
        )}
      >
        <div className="mx-auto mb-4 mt-1.5 h-1.5 w-12 rounded-full bg-brand-light-grey" />
        <div className="rounded-t-[12px] px-4 pb-4">
          {title && <SheetHeader title={title} className="mb-4" />}
          {children}
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

interface SheetRootProps {
  isOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ children, isOpen, onOpenChange }: SheetRootProps) {
  const isControlled = isOpen !== undefined;

  return (
    <Drawer.Root
      open={isControlled ? isOpen : undefined}
      onOpenChange={isControlled ? onOpenChange : undefined}
    >
      {children}
    </Drawer.Root>
  );
}

interface SheetHeaderProps {
  title: string;
  className?: string;
}

export function SheetHeader({ title, className }: SheetHeaderProps) {
  return (
    <div className={cn('mb-8 flex items-center justify-between', className)}>
      <Drawer.Title asChild>
        <Heading as="h2" size="xs">
          {title}
        </Heading>
      </Drawer.Title>
      <Drawer.Close>
        <button>
          <TouchTarget>
            <XMarkIcon className="transition-brand h-4 w-4 text-brand-mid-grey hover:text-brand-dark-grey" />
          </TouchTarget>
        </button>
      </Drawer.Close>
    </div>
  );
}

Drawer.Trigger.displayName = 'SheetTrigger';
Drawer.Close.displayName = 'SheetClose';

const DrawerTrigger = Drawer.Trigger;
const DrawerClose = Drawer.Close;

export { DrawerClose as SheetClose, DrawerTrigger as SheetTrigger };
