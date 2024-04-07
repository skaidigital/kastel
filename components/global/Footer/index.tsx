import { getFooterDictionary } from '@/app/dictionaries/footer';
import { FooterLayout } from '@/components/global/Footer/FooterLayout';
import { FooterPayload, footerValidator, getFooterQuery } from '@/components/global/Footer/hooks';
import { PaymentProviders } from '@/components/shared/PaymentProviders';
import { LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const FooterPreview = dynamic(() => import('./FooterPreview'));

function loadFooter(market: MarketValues) {
  const query = getFooterQuery(market);

  return loadQuery<FooterPayload>(query, {}, { next: { tags: ['footer', 'home'] } });
}

export async function Footer({
  params: { market, lang }
}: {
  params: { market: MarketValues; lang: LangValues };
}) {
  const initial = await loadFooter(market);
  const dictionary = await getFooterDictionary(lang);

  if (draftMode().isEnabled) {
    return <FooterPreview initial={initial} market={market} dictionary={dictionary} />;
  }

  const footerWithoutNullValues = nullToUndefined(initial.data);
  const validatedFooter = footerValidator.parse(footerWithoutNullValues);

  return (
    <FooterLayout data={validatedFooter} dictionary={dictionary} market={market}>
      <PaymentProviders market={market} />
    </FooterLayout>
  );
}
