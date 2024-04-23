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

async function loadNavbar(lang: LangValues) {
  const query = getNavbarQuery(lang);

  return loadQuery<NavbarPayload>(query, {}, { next: { tags: [CACHE_TAGS.NAVBAR] } });
}

interface Props {
  market: MarketValues;
  lang: LangValues;
}
export async function Navbar({ market, lang }: Props) {
  const initial = await loadNavbar(lang);

  const withoutNullValues = nullToUndefined(initial.data);
  // const validatedData = navbarValidator.safeParse(withoutNullValues);

  // if (!validatedData.success) {
  //   console.error('Failed to validate navbar data', validatedData.error);
  //   return null;
  // }

  return (
    <NavbarLayout data={withoutNullValues}>
      <Suspense fallback={<OpenCart />}>
        <Cart market={market}>
          <Suspense fallback={<CrossSellSkeleton className="px-6 py-4" />}>
            <CrossSell lang={lang} className="px-6 py-4" />
          </Suspense>
        </Cart>
      </Suspense>
    </NavbarLayout>
  );
}
