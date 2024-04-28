'use client';

import { TouchProvider } from '@/components/HybridTooltip';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <TouchProvider>{children}</TouchProvider>
      <Toaster position="top-right" richColors expand closeButton />
    </>
  );
}
