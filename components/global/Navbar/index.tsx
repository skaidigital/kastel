import { NavbarLayout } from '@/components/global/Navbar/NavbarLayout';
import { NavbarPayload, getNavbarQuery, navbarValidator } from '@/components/global/Navbar/hooks';
import Cart from '@/components/shared/Cart';
import { CrossSell } from '@/components/shared/Cart/CrossSell';
import { CrossSellSkeleton } from '@/components/shared/Cart/CrossSell/CrossSellSkeleton';
import OpenCart from '@/components/shared/Cart/open-cart';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { cn } from '@/lib/utils';
import { draftMode } from 'next/headers';
import { Suspense } from 'react';

async function loadNavbar(lang: LangValues) {
  const query = getNavbarQuery(lang);

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
  const initial = await loadNavbar(lang);
  const isDraftMode = draftMode().isEnabled;

  const withoutNullValues = nullToUndefined(initial.data);
  let validatedData;

  if (isDraftMode) {
    validatedData = navbarValidator.safeParse(withoutNullValues);
  }

  const navbar = isDraftMode ? validatedData?.data : withoutNullValues;

  return (
    <NavbarLayout
      data={navbar}
      className={cn(navbar?.hasAnnouncementBanner && 'mt-[--announcement-bar-height] ', className)}
    >
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
