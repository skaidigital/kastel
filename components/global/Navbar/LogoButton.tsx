import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function LogoButton({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center justify-center', className)}>
      <Image priority src="/images/logo.svg" height={28} width={92.51} alt="Logo" className="" />
    </Link>
  );
}
