'use client';

import { Dictionary } from '@/app/dictionaries';
import { ProductPagePreviewLayout } from '@/components/pages/ProductPage/ProductPagePreviewLayout';
import { Product, getProductQuery } from '@/components/pages/ProductPage/hooks';
import { MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { SearchParams } from '@/lib/types';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

interface Props {
  market: MarketValues;
  initial: QueryResponseInitial<Product | null>;
  params: { slug: string };
  dictionary: Dictionary['product_page'];
  searchParams?: SearchParams;
}

export default function ProductPreview({
  params,
  initial,
  market,
  dictionary,
  searchParams
}: Props) {
  const query = getProductQuery(market);

  const { data } = useQuery<Product | null>(query, params, {
    initial
  });

  if (!data) return null;

  const productWithoutNullValues = nullToUndefined(data);

  return (
    <ProductPagePreviewLayout
      data={productWithoutNullValues}
      dictionary={dictionary}
      searchParams={searchParams}
    />
  );
}
