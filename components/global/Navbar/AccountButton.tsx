import { ROUTES } from '@/data/constants';
import Link from 'next/link';

export const AccountButton = () => {
  return (
    <Link
      href={ROUTES.ACCOUNT}
      aria-label="Go to account"
      className="text-text-sm text-brand-dark-grey"
    >
      Account
    </Link>
  );
};
