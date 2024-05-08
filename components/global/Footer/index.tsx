import { getFooterDictionary } from '@/app/dictionaries/footer';
import { FooterLayout } from '@/components/global/Footer/FooterLayout';
import { FooterPayload, getFooterQuery } from '@/components/global/Footer/hooks';
import { PaymentProviders } from '@/components/shared/PaymentProviders';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

function loadFooter({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = getFooterQuery({ market, lang });

  return loadQuery<FooterPayload>(query, {}, { next: { tags: [CACHE_TAGS.FOOTER, 'home'] } });
}

interface Props {
  market: MarketValues;
  lang: LangValues;
}

export async function Footer({ market, lang }: Props) {
  const initial = await loadFooter({ market, lang });
  const dictionary = await getFooterDictionary(lang);
  // const isDraftMode = draftMode().isEnabled;

  const footerWithoutNullValues = nullToUndefined(initial.data);
  // let validatedFooter;

  // if (!isDraftMode) {
  //   validatedFooter = footerValidator.safeParse(footerWithoutNullValues);

  //   if (!validatedFooter.success) {
  //     console.error('Failed to validate footer data', validatedFooter.error);
  //     return null;
  //   }
  // }

  // const footer = isDraftMode ? footerWithoutNullValues : validatedFooter?.data;

  return (
    <FooterLayout data={footerWithoutNullValues} dictionary={dictionary} market={market}>
      <PaymentProviders market={market} />
    </FooterLayout>
  );
}
