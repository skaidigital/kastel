import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface Props {
  type?: 'dark' | 'blur';
}

export const Backdrop = forwardRef<HTMLDivElement, Props>(({ type = 'dark' }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 z-20 bg-gray-100 bg-opacity-10',
        type === 'blur' && 'backdrop-blur',
        type === 'dark' && 'bg-black'
      )}
    />
  );
});

Backdrop.displayName = 'Backdrop';
