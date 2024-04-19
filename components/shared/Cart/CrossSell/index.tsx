'use server';

import { getDictionary } from '@/app/dictionaries';
import { CrossSellItem } from '@/components/shared/Cart/CrossSell/CrossSellItem';
import {
  CrossSellPayload,
  crossSellValidator,
  getCrossSellQuery
} from '@/components/shared/Cart/CrossSell/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { env } from '@/env';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { getCart } from '@/lib/shopify';
import { cookies } from 'next/headers';

async function loadCrossSellProduct(lang: LangValues) {
  const query = getCrossSellQuery(lang);

  return loadQuery<CrossSellPayload>(query, {}, { next: { tags: [CACHE_TAGS.MERCHANDISING] } });
}

interface Props {
  lang: LangValues;
}

export async function CrossSell({ lang }: Props) {
  const cartId = cookies().get('cartId')?.value;

  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cart) {
    return null;
  }

  const currencyCode = env.NEXT_PUBLIC_SHOPIFY_CURRENCY;

  const dict = await getDictionary();
  const dictionary = dict.cart_drawer.cross_sell;
  const initial = await loadCrossSellProduct(lang);

  if (!initial.data) {
    return null;
  }

  const formattedProductId = `gid://shopify/Product/${initial.data.product.id}`;

  const productAlreadyInCart = cart?.lines?.some(
    (line) => line.merchandise.product.id === formattedProductId
  );

  if (productAlreadyInCart) {
    return null;
  }

  const dataWithoutNullValues = nullToUndefined(initial.data);
  const validatedData = crossSellValidator.parse(dataWithoutNullValues);

  return (
    <CrossSellItem
      product={validatedData.product}
      currencyCode={currencyCode}
      dictionary={dictionary}
      className="p-5"
    />
  );
}
