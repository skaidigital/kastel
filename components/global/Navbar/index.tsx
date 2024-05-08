import { NavbarLayout } from '@/components/global/Navbar/NavbarLayout';
import { NavbarPayload, getNavbarQuery } from '@/components/global/Navbar/hooks';
import Cart from '@/components/shared/Cart';
import { CrossSell } from '@/components/shared/Cart/CrossSell';
import { CrossSellSkeleton } from '@/components/shared/Cart/CrossSell/CrossSellSkeleton';
import OpenCart from '@/components/shared/Cart/open-cart';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { Suspense } from 'react';

async function loadNavbar({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = getNavbarQuery({ market, lang });

  return loadQuery<NavbarPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.NAVBAR, CACHE_TAGS.ANNOUNCEMENT_BANNER] } }
  );
}

interface Props {
  market: MarketValues;
  lang: LangValues;
  className?: string;
}
export async function Navbar({ market, lang, className }: Props) {
  const initial = await loadNavbar({ market, lang });
  // const isDraftMode = draftMode().isEnabled;

  const withoutNullValues = nullToUndefined(initial.data);
  // let validatedData;

  // if (!isDraftMode) {
  //   validatedData = navbarValidator.safeParse(withoutNullValues);
  // }

  // const navbar = isDraftMode ? withoutNullValues : validatedData?.data;

  return (
    <NavbarLayout data={withoutNullValues} className={className}>
      <Suspense fallback={<OpenCart />}>
        <Cart market={market} lang={lang}>
          <Suspense fallback={<CrossSellSkeleton className="px-4 lg:px-6 lg:py-4" />}>
            <CrossSell
              market={market}
              lang={lang}
              className="border-t border-brand-light-grey px-4 pt-2 lg:px-6 lg:py-4"
              crossSellItemClassName="px-3 py-2"
            />
          </Suspense>
        </Cart>
      </Suspense>
    </NavbarLayout>
  );
}
