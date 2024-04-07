'use client';

import { NavbarLayout } from '@/components/global/Navbar/NavbarLayout';
import { NavbarPayload, getNavbarQuery } from '@/components/global/Navbar/hooks';
import OpenCart from '@/components/shared/Cart/open-cart';
import { MarketValues } from '@/data/constants';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

interface Props {
  market: MarketValues;
  initial: QueryResponseInitial<NavbarPayload | null>;
}

export default function NavbarPreview({ initial, market }: Props) {
  const query = getNavbarQuery(market);

  const { data } = useQuery<NavbarPayload | null>(query, {}, { initial });

  if (!data) return null;

  return (
    <NavbarLayout data={data}>
      <OpenCart />
    </NavbarLayout>
  );
}
