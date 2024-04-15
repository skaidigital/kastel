import { NavbarLayout } from '@/components/global/Navbar/NavbarLayout';
import { NavbarPayload, getNavbarQuery, navbarValidator } from '@/components/global/Navbar/hooks';
import Cart from '@/components/shared/Cart';
import { CrossSellSkeleton } from '@/components/shared/Cart/CrossSell/CrossSellSkeleton';
import OpenCart from '@/components/shared/Cart/open-cart';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { Suspense } from 'react';

async function loadNavbar(market: MarketValues) {
  const query = getNavbarQuery(market);

  return loadQuery<NavbarPayload>(query, {}, { next: { tags: [CACHE_TAGS.NAVBAR] } });
}

interface Props {
  market: MarketValues;
}
export async function Navbar({ market }: Props) {
  const initial = await loadNavbar(market);

  const withoutNullValues = nullToUndefined(initial.data);
  const validatedData = navbarValidator.safeParse(withoutNullValues);

  if (!validatedData.success) {
    console.error('Failed to validate navbar data', validatedData.error);
    return null;
  }

  return (
    <NavbarLayout data={validatedData.data}>
      <Suspense fallback={<OpenCart />}>
        <Cart market={market}>
          <Suspense fallback={<CrossSellSkeleton className="p-5" />}>{/* <CrossSell />*/}</Suspense>
        </Cart>
      </Suspense>
    </NavbarLayout>
  );
}
