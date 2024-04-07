'use client';

import { Backdrop } from '@/components/Backdrop';
import { Container } from '@/components/base/Container';
import { bottomDrawerAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  initialState?: boolean;
}

export function ControlledAlertDrawer({ initialState, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState || false);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay asChild>
              <Backdrop type="blur" />
            </AlertDialog.Overlay>
            <AlertDialog.Content asChild forceMount>
              <motion.div
                variants={bottomDrawerAnimation}
                initial="hide"
                animate={isOpen ? 'show' : 'hide'}
                exit="hide"
                className={cn(
                  'fixed bottom-0 z-50 w-full rounded-project border-t  border-brand-border bg-white px-5 py-10 lg:p-10'
                )}
              >
                <Container className="flex space-x-10">{children}</Container>
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}

interface ControlledAlertDrawerCancelProps {
  children: React.ReactNode;
}

export function ControlledAlertDrawerCancel({ children }: ControlledAlertDrawerCancelProps) {
  return <AlertDialog.Cancel asChild>{children}</AlertDialog.Cancel>;
}

// ControlledAlertDrawer.Cancel = ControlledAlertDrawerCancel;
