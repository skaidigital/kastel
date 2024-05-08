import { TouchTarget } from '@/components/TouchTarget';
import { Heading } from '@/components/base/Heading';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface ModalRootProps {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ children, isOpen, onOpenChange }: ModalRootProps) {
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

interface ModalContentProps {
  children: ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg' | 'none';
  onClose?: (e: any) => void;
  className?: string;
}

export function ModalContent({
  children,
  size = 'sm',
  onClose,
  label,
  className
}: ModalContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={onClose}
        className="transform-opacity fixed inset-0 z-20 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
      />
      <Dialog.Content
        onInteractOutside={onClose}
        onEscapeKeyDown={onClose}
        forceMount
        aria-label={label}
        className={cn(
          'sm:rounded-lg ease-out-quad fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          size === 'sm' && 'max-w-[420px]',
          size === 'md' && 'max-w-4xl',
          size === 'lg' && '',
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

interface ModalTriggerProps {
  children: ReactNode;
}

export function ModalTrigger({ children }: ModalTriggerProps) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

interface ModalHeaderProps {
  title: string;
  className?: string;
  children?: ReactNode;
  onClose?: (e: any) => void;
}

export function ModalHeader({ title, className, children, onClose }: ModalHeaderProps) {
  return (
    <div className={cn('items-between mb-6 flex flex-col justify-center gap-y-4', className)}>
      <div className="flex items-center justify-between">
        <Dialog.Title asChild>
          <Heading as="h2" size="xs">
            {title}
          </Heading>
        </Dialog.Title>
        <Dialog.Close onClick={onClose}>
          <button>
            <TouchTarget>
              <XMarkIcon className="transition-brand h-4 w-4 text-brand-mid-grey hover:text-brand-dark-grey focus:text-brand-dark-grey" />
            </TouchTarget>
          </button>
        </Dialog.Close>
      </div>
      {children}
    </div>
  );
}

export function ModalClose({ children }: ModalTriggerProps) {
  return (
    <Dialog.Close asChild>
      <button>{children}</button>
    </Dialog.Close>
  );
}
