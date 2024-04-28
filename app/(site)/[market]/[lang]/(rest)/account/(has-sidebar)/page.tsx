import { AccountPage } from '@/components/pages/AccountPage';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { logIn } from '@/lib/shopify/customer/actions';
import { useUser } from '@/lib/useUser';
import { Metadata } from 'next';
import { AccountPageValidator, getAccountQuery } from './hooks';

function loadAccountPage({ lang, market }: { lang: LangValues; market: MarketValues }) {
  const query = getAccountQuery({ lang, market });

  return loadQuery<any | null>(query, {}, { next: { tags: [`${CACHE_TAGS.PRODUCT}`] } });
}

interface Props {
  params: { market: MarketValues; lang: LangValues };
}

export default async function Page({ params }: Props) {
  const { lang, market } = params;
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    await logIn();
  }
  const inital = await loadAccountPage({ lang, market });

  const nonNullData = nullToUndefined(inital.data);

  const validatedData = AccountPageValidator.parse(nonNullData);

  return <AccountPage data={validatedData} lang={lang} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

// TODO get market from params
function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Konto';
    case 'sv':
      return 'Account';
  }
}
