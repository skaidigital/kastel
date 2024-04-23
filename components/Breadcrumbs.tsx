'use client';

import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  BreadcrumbProps,
  BreadcrumbsProps,
  Link
} from 'react-aria-components';

interface Props<T extends object> extends BreadcrumbsProps<T> {
  children: React.ReactNode;
  className?: string;
}

// TODO translate home and shop
// TODO add correct slugs for shop based on market
export function Breadcrumbs<T extends object>(props: Props<T>) {
  const params = useParams();
  const slug = params?.slug;

  return (
    <AriaBreadcrumbs {...props} className={cn('flex gap-2', props.className)}>
      {props.children}
      {slug && <Breadcrumb>{slug}</Breadcrumb>}
    </AriaBreadcrumbs>
  );
}

interface AriaBreadcrumbProps extends BreadcrumbProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function Breadcrumb(props: AriaBreadcrumbProps) {
  return (
    <AriaBreadcrumb {...props}>
      <Link
        href={props.href}
        className={cn(
          'text-eyebrow flex items-center gap-1 text-overline-md uppercase',
          props.className
        )}
      >
        {props.children}
        {props.href && <ChevronRightIcon className="h-3 w-3" />}
      </Link>
    </AriaBreadcrumb>
  );
}
