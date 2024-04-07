import { Text } from '@/components/base/Text';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function BackButton({ children, href, className }: Props) {
  return (
    <Link href={href} className={cn('group flex items-center gap-x-1', className)}>
      <ArrowLeftIcon className="h-5 w-5 text-brand-mid-grey" />
      <Text className="transition-all duration-200 ease-in-out group-hover:ml-1">{children}</Text>
    </Link>
  );
}
