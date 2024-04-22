import { LangValues, MarketValues } from '@/data/constants';
import { Metadata } from 'next';

interface Props {
  params: { lang: LangValues };
}

export default async function Page({ params }: Props) {
  const lang = params.lang;

  return null;
  // return <WishlistPage lang={lang} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Ønskeliste';
    case 'sv':
      return 'Önskelista';
  }
}
