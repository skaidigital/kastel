'use client';

import { ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import Link from 'next/link';

export const AccountButton = () => {
  const { market, lang } = useBaseParams();

  return (
    <Link
      href={`/${market}/${lang}${ROUTES.ACCOUNT}`}
      aria-label="Go to account"
      className="text-text-sm text-brand-dark-grey"
    >
      Account
    </Link>
  );
};
