'use client';

import { SiblingProduct } from '@/components/pages/ProductPage/hooks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Props {
  products: SiblingProduct[];
  colorText: string;
}

export function ColorSelector({ products, colorText }: Props) {
  const { slug } = useParams();
  const selectedColor = products.find((p) => p.slug === slug)?.title;

  return (
    <dl className="flex flex-col gap-y-3">
      <dt className="text-eyebrow uppercase">
        {colorText}
        {selectedColor && `: ${selectedColor}`}
      </dt>
      <dd className="flex flex-wrap gap-x-2">
        {products.map((p) => {
          const productIsCurrent = slug === p.slug;
          return (
            <Link
              href={`/products/${p.slug}`}
              scroll={false}
              key={p.slug}
              aria-disabled={productIsCurrent}
              className={cn(
                'flex h-8 w-16 items-center gap-x-2 rounded-project border border-brand-border',
                productIsCurrent && 'cursor-not-allowed border-brand-dark-grey'
              )}
              style={{ backgroundColor: p.color }}
            >
              <span className="sr-only">{p.title}</span>
            </Link>
          );
        })}
      </dd>
    </dl>
  );
}
