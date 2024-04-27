import { PaymentProviders } from '@/components/shared/PaymentProviders';
import { MarketValues } from '@/data/constants';
import { Suspense } from 'react';

interface Props {
  market: MarketValues;
}

export function PaymentIcons({ market }: Props) {
  return (
    <div className="my-4 flex justify-center">
      <Suspense>
        <PaymentProviders market={market} size="sm" />
      </Suspense>
    </div>
  );
}
