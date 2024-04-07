'use client';

import { ROUTES } from '@/data/constants';
import { UserIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export const AccountButton = () => {
  const router = useRouter();

  function handleGoToAccount() {
    router.push(ROUTES.ACCOUNT);
  }

  return (
    <>
      <button
        aria-label="Go to account"
        onClick={handleGoToAccount}
        className="relative flex h-11 w-11 items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey"
      >
        <UserIcon className={'transition-brand h-4'} />
      </button>
    </>
  );
};
