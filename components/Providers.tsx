'use client';

import { TouchProvider } from '@/components/HybridTooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TouchProvider>{children}</TouchProvider>
      <Toaster position="top-right" richColors expand closeButton />
    </QueryClientProvider>
  );
}
