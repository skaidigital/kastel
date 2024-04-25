import { getFooterDictionary } from '@/app/dictionaries/footer';
import { FooterLayout } from '@/components/global/Footer/FooterLayout';
import { FooterPayload, footerValidator, getFooterQuery } from '@/components/global/Footer/hooks';
import { PaymentProviders } from '@/components/shared/PaymentProviders';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { draftMode } from 'next/headers';

function loadFooter(lang: LangValues) {
  const query = getFooterQuery(lang);

  return loadQuery<FooterPayload>(query, {}, { next: { tags: [CACHE_TAGS.FOOTER, 'home'] } });
}

interface Props {
  market: MarketValues;
  lang: LangValues;
}

export async function Footer({ market, lang }: Props) {
  const initial = await loadFooter(lang);
  const dictionary = await getFooterDictionary(lang);
  const isDraftMode = draftMode().isEnabled;

  const footerWithoutNullValues = nullToUndefined(initial.data);
  let validatedFooter;

  if (isDraftMode) {
    validatedFooter = footerValidator.safeParse(footerWithoutNullValues);

    if (!validatedFooter.success) {
      console.error('Failed to validate footer data', validatedFooter.error);
      return null;
    }
  }

  const footer = isDraftMode ? validatedFooter?.data : footerWithoutNullValues;

  return (
    <FooterLayout data={footer} dictionary={dictionary} market={market}>
      <PaymentProviders market={market} />
    </FooterLayout>
  );
}
