'use client';

import { CustomLink } from '@/components/CustomLink';
import { LangValues, ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { logIn } from '@/lib/shopify/customer/actions';
import { useUser } from '@/lib/useUser';

export function AccountButton() {
  const { lang } = useBaseParams();
  const accountString = getAccountString(lang);
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return (
      <CustomLink href={ROUTES.ACCOUNT} className="text-sm font-medium text-brand-mid-grey">
        {accountString}
      </CustomLink>
    );
  }

  async function handleClick() {
    await logIn();
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Go to account"
      className="text-sm font-medium text-brand-mid-grey"
    >
      {accountString}
    </button>
  );
}

function getAccountString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Account';
    case 'no':
      return 'Konto';
    default:
      return 'Account';
  }
}
