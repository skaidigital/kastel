import { getDictionary } from '@/app/dictionaries';
import { CartLayout } from '@/components/shared/Cart/CartLayout';
import { getCheckoutUrl } from '@/components/shared/Cart/actions';
import { loadFreeShippingAmount } from '@/components/shared/Cart/hooks';
import { MarketValues } from '@/data/constants';
import { getCart } from '@/lib/shopify';
import { useUser } from '@/lib/useUser';
import { cookies } from 'next/headers';

interface Props {
  children: React.ReactNode;
  market: MarketValues;
}

export default async function Cart({ children, market }: Props) {
  const { cart_drawer: dictionary } = await getDictionary();

  const { isLoggedIn } = useUser();

  const checkoutUrl = await getCheckoutUrl(isLoggedIn);

  const cartId = cookies().get('cartId')?.value;

  let cart;
  const freeShippingAmount = await loadFreeShippingAmount(market);

  if (cartId) {
    cart = await getCart(cartId);
  }

  console.log('cart in Cart', cart);

  return (
    <CartLayout
      cart={cart}
      checkoutUrl={checkoutUrl}
      dictionary={dictionary}
      freeShippingAmount={freeShippingAmount?.data}
    >
      {children}
    </CartLayout>
  );
}
