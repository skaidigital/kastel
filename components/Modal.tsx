import { TouchTarget } from '@/components/TouchTarget';
import { Heading } from '@/components/base/Heading';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface ModalRootProps {
  children: ReactNode;
  isOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
}

// TODO get back Modal.Trigger etc. once the RSC bundler is fixed
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
  onClose?: () => void;
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
        forceMount
        aria-label={label}
        className={cn(
          'border-brand-border fixed left-[50%] top-[50%] z-30 w-full translate-x-[-50%] translate-y-[-50%] rounded-project  border bg-white transition-[transform,opacity] data-[state=closed]:animate-modal-hide data-[state=open]:animate-modal-show  focus:outline-none',
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
}

export function ModalHeader({ title, className }: ModalHeaderProps) {
  return (
    <div className={cn('mb-6 flex items-center justify-between', className)}>
      <Dialog.Title asChild>
        <Heading as="h2" size="xs">
          {title}
        </Heading>
      </Dialog.Title>
      <Dialog.Close>
        <button>
          <TouchTarget>
            <XMarkIcon className="transition-brand h-4 w-4 text-brand-mid-grey hover:text-brand-dark-grey focus:text-brand-dark-grey" />
          </TouchTarget>
        </button>
      </Dialog.Close>
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
