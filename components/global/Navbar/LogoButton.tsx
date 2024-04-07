import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function LogoButton({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center justify-center', className)}>
      <Image priority src="/images/logo.webp" width={40} height={40} alt="Logo" />
    </Link>
  );
}
