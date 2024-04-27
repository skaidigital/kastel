import { Icon } from '@/components/Icon';
import { loadPaymentProviders } from '@/components/shared/PaymentProviders/hooks';
import { MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';

interface Props {
  market: MarketValues;
  size?: 'sm' | 'md' | 'lg';
}

export async function PaymentProviders({ market, size = 'md' }: Props) {
  const paymentProviders = await loadPaymentProviders(market);

  if (!paymentProviders.data) return null;

  return (
    <div className={cn('flex', size === 'sm' ? 'gap-x-1' : 'gap-x-2')}>
      {paymentProviders.data.map((provider, index) => (
        <div className="inline-block" key={index}>
          <Icon
            viewBox="0 0 70 48"
            className={cn(
              'h-auto',
              size === 'sm' && 'w-8',
              size === 'md' && 'w-12',
              size === 'lg' && 'w-16'
            )}
            name={provider}
            id={provider}
          />
        </div>
      ))}
    </div>
  );
}
