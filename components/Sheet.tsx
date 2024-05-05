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
  noPadding?: boolean;
  onClose?: (e: any) => void;
  layer?: 1 | 2 | 3;
}

export function SheetContent({
  children,
  title,
  className,
  overlayClassName,
  noPadding,
  layer = 1
}: Props) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay
        className={cn(
          overlayClasses,
          layer === 1 && 'z-30',
          layer === 2 && 'z-40',
          layer === 3 && 'z-50'
        )}
      />
      <Drawer.Content
        forceMount
        className={cn(
          'fixed bottom-0 left-0 flex w-full flex-col rounded-project  rounded-t-[12px] border-t border-brand-light-grey/50 bg-white transition-[transform,opacity] will-change-[transform,opacity] focus:outline-none',
          layer === 1 && 'z-30',
          layer === 2 && 'z-40',
          layer === 3 && 'z-50'
        )}
      >
        <div className="mx-auto mb-4 mt-1.5 h-1.5 w-12 rounded-full bg-brand-light-grey" />
        <div className={cn('rounded-t-[12px]', !noPadding && 'px-4 pb-4')}>
          {title && <SheetHeader title={title} className="mb-4" />}
          <div className={cn('max-h-[90vh]', className)}>{children}</div>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

interface SheetRootProps {
  isOpen?: boolean;
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
  children?: ReactNode;
}

export function SheetHeader({ title, className, children }: SheetHeaderProps) {
  return (
    <div className={cn('mb-8 ', className)}>
      <div className="flex items-center justify-between">
        <Drawer.Title asChild>
          <Heading as="h2" size="xs">
            {title}
          </Heading>
        </Drawer.Title>
        <Drawer.Close asChild>
          <button>
            <TouchTarget>
              <XMarkIcon className="transition-brand h-4 w-4 text-brand-mid-grey hover:text-brand-dark-grey" />
            </TouchTarget>
          </button>
        </Drawer.Close>
      </div>
      {children && <div className="mt-4"> {children}</div>}
    </div>
  );
}

Drawer.Trigger.displayName = 'SheetTrigger';
Drawer.Close.displayName = 'SheetClose';

const DrawerTrigger = Drawer.Trigger;
const DrawerClose = Drawer.Close;

export { DrawerClose as SheetClose, DrawerTrigger as SheetTrigger };
