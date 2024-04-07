import { NavbarLayout } from '@/components/global/Navbar/NavbarLayout';
import { NavbarPayload, getNavbarQuery } from '@/components/global/Navbar/hooks';
import Cart from '@/components/shared/Cart';
import { CrossSell } from '@/components/shared/Cart/CrossSell';
import { CrossSellSkeleton } from '@/components/shared/Cart/CrossSell/CrossSellSkeleton';
import OpenCart from '@/components/shared/Cart/open-cart';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Suspense } from 'react';

const NavbarPreview = dynamic(() => import('./NavbarPreview'));

async function loadNavbar(market: MarketValues) {
  const query = getNavbarQuery(market);

  return loadQuery<NavbarPayload>(query, {}, { next: { tags: [CACHE_TAGS.NAVBAR] } });
}

// TODO fix validator. Se hooks.ts for more
export async function Navbar() {
  const market = await getMarket();
  const initial = await loadNavbar(market);

  if (draftMode().isEnabled) {
    return <NavbarPreview initial={initial} market={market} />;
  }

  // const withoutNullValues = nullToUndefined(initial.data);
  // const validatedData = navbarValidator.parse(withoutNullValues);

  return (
    <NavbarLayout data={initial.data}>
      <Suspense fallback={<OpenCart />}>
        <Cart market={market}>
          <Suspense fallback={<CrossSellSkeleton className="p-5" />}>
            <CrossSell className="border-t border-brand-border p-5" />
          </Suspense>
        </Cart>
      </Suspense>
    </NavbarLayout>
  );
}
