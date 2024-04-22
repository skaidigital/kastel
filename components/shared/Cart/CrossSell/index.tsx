'use server';

import { getDictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/Carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CrossSellProducts, getCrossSellQuery } from '@/components/shared/Cart/CrossSell/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { env } from '@/env';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { getCart } from '@/lib/shopify';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';

// TODO should take in both lang and market
async function loadCrossSellProducts(lang: LangValues) {
  const query = getCrossSellQuery(lang);

  return loadQuery<CrossSellProducts>(query, {}, { next: { tags: [CACHE_TAGS.MERCHANDISING] } });
}

interface Props {
  lang: LangValues;
  className?: string;
}

// TODO make it use the same query as the product page?
export async function CrossSell({ lang, className }: Props) {
  const cartId = cookies().get('cartId')?.value;

  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  // if (!cart) {
  //   console.log('no cart');

  //   return null;
  // }

  const currencyCode = env.NEXT_PUBLIC_SHOPIFY_CURRENCY;

  const dict = await getDictionary();
  const dictionary = dict.cart_drawer.cross_sell;
  const initial = await loadCrossSellProducts(lang);

  if (!initial.data) {
    return null;
  }

  // const formattedProductId = `gid://shopify/Product/${initial.data.product.id}`;
  const formattedProductId = `gid://shopify/Product/${123}`;

  // const productAlreadyInCart = cart?.lines?.some(
  //   (line) => line.merchandise.product.id === formattedProductId
  // );
  const productAlreadyInCart = false;

  if (productAlreadyInCart) {
    return null;
  }

  const dataWithoutNullValues = nullToUndefined(initial.data);
  console.log('dataWithoutNullValues', dataWithoutNullValues);

  // const validatedData = crossSellProductsValidator.safeParse(dataWithoutNullValues);
  // console.log('validatedData', validatedData);

  // if (!validatedData.success) {
  //   console.error('Error validating cross sell products', validatedData.error);
  //   return null;
  // }
  // console.log('validatedData', validatedData);

  return (
    <div className={cn('flex flex-col gap-y-3', className)}>
      <h3 className="text-sm font-medium">Pairs well with</h3>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className="relative"
      >
        <CarouselContent className="-ml-2">
          {initial?.data?.map((item) => (
            <CarouselItem key={item.title} className="basis-[80%] bg-white pl-2">
              <div className="flex gap-x-3 p-3">
                <div className="relative h-20 w-20 rounded-[2px] bg-gray-50">
                  <SanityImage image={item.image} fill className="absolute object-cover" />
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="text-balance text-sm font-medium">{item.title}</h4>
                  <div className="flex gap-x-1">
                    <Select>
                      <SelectTrigger className="h-full px-2 py-1.5 text-xs">
                        <SelectValue placeholder="Choose option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Value 1</SelectItem>
                        <SelectItem value="2">Value 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="primary"
                      size="icon"
                      className="h-fit w-fit shrink-0 px-3 py-1.5"
                    >
                      <ShoppingBagIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext
          size="icon"
          className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 items-center lg:block"
        />
      </Carousel>
    </div>
  );
}
