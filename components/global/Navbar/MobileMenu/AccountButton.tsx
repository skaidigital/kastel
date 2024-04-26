'use client';

import { CustomLink } from '@/components/CustomLink';
import { LangValues, ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';

export function AccountButton() {
  const { lang } = useBaseParams();
  const accountString = getAccountString(lang);

  return (
    <CustomLink href={ROUTES.ACCOUNT} className="text-sm font-medium text-brand-mid-grey">
      {accountString}
    </CustomLink>
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
