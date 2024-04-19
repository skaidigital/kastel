'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

export function LinkItem({ href, children, className }: Props) {
  const pathname = usePathname();

  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={cn(
        'border-brand-border !text-eyebrow transition-brand w-full rounded-project border px-5 py-2 uppercase',
        isActive
          ? 'bg-brand-dark-grey text-white hover:border-brand-dark-grey hover:bg-white hover:text-brand-dark-grey'
          : 'bg-white text-brand-dark-grey hover:bg-brand-dark-grey hover:text-white',
        className
      )}
    >
      {children}
    </Link>
  );
}
