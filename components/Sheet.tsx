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
  title: string;
  className?: string;
}

export function SheetContent({ children, title, className }: Props) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className={overlayClasses} />
      <Drawer.Content
        forceMount
        className={cn(
          'fixed bottom-0 left-0 z-30 flex w-full flex-col rounded-project rounded-t-[10px] border-t border-black bg-white transition-[transform,opacity]  will-change-[transform,opacity] focus:outline-none',
          className
        )}
      >
        {title && <SheetHeader title={title} />}
        {children}
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
}

export function SheetHeader({ title }: SheetHeaderProps) {
  return (
    <div className="border-brand-border border-b">
      <div className="flex items-center justify-between p-5">
        <Heading as="h3" size="sm">
          {title}
        </Heading>
        <Drawer.Close>
          <button>
            <TouchTarget>
              <XMarkIcon className="transition-brand h-4 w-4 text-brand-mid-grey hover:text-brand-dark-grey" />
            </TouchTarget>
          </button>
        </Drawer.Close>
      </div>
    </div>
  );
}

Drawer.Trigger.displayName = 'SheetTrigger';
Drawer.Close.displayName = 'SheetClose';

const DrawerTrigger = Drawer.Trigger;
const DrawerClose = Drawer.Close;

export { DrawerClose as SheetClose, DrawerTrigger as SheetTrigger };
