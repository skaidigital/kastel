import { Icon } from '@/components/Icon';
import { loadPaymentProviders } from '@/components/shared/PaymentProviders/hooks';
import { MarketValues } from '@/data/constants';

interface Props {
  market: MarketValues;
}

export async function PaymentProviders({ market }: Props) {
  const paymentProviders = await loadPaymentProviders(market);

  if (!paymentProviders.data) return null;

  return (
    <div className="flex gap-x-2">
      {paymentProviders.data.map((provider, index) => (
        <div className="inline-block" key={index}>
          <Icon viewBox="0 0 70 48" className="h-auto w-12" name={provider} id={provider} />
        </div>
      ))}
    </div>
  );
}
