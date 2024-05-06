import { getDictionary } from '@/app/dictionaries';
import { CartLayout } from '@/components/shared/Cart/CartLayout';
import { loadFreeShippingAmount } from '@/components/shared/Cart/hooks';
import { LangValues, MarketValues } from '@/data/constants';

interface Props {
  children: React.ReactNode;
  lang: LangValues;
  market: MarketValues;
}

export default async function Cart({ children, market, lang }: Props) {
  const { cart_drawer: dictionary } = await getDictionary({ lang });
  const freeShippingAmount = await loadFreeShippingAmount(market);

  return (
    <CartLayout dictionary={dictionary} freeShippingAmount={freeShippingAmount.data}>
      {children}
    </CartLayout>
  );
}
