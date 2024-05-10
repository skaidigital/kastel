import { AMEXLogo } from '@/components/icons/AMEXLogo';
import { AmazonPayLogo } from '@/components/icons/AmazonPayLogo';
import { ApplePayLogo } from '@/components/icons/ApplePayLogo';
import { GooglePayLogo } from '@/components/icons/GooglePayLogo';
import { KlarnaLogo } from '@/components/icons/KlarnaLogo';
import { MasterCardLogo } from '@/components/icons/MasterCardLogo';
import { MobilePayLogo } from '@/components/icons/MobilePayLogo';
import { PayPalLogo } from '@/components/icons/PayPalLogo';
import { SamsungPayLogo } from '@/components/icons/SamsungPayLogo';
import { VippsLogo } from '@/components/icons/VippsLogo';
import { VisaLogo } from '@/components/icons/VisaLogo';
import { loadPaymentProviders } from '@/components/shared/PaymentProviders/hooks';
import { MarketValues, PaymentProviderType } from '@/data/constants';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  market: MarketValues;
  size?: 'sm' | 'md' | 'lg';
}

export async function PaymentProviders({ market, size = 'md' }: Props) {
  const paymentProviders = await loadPaymentProviders(market);

  if (!paymentProviders.data) return null;

  return (
    <div className={cn('flex', size === 'sm' ? 'gap-x-1' : 'gap-x-2')}>
      {paymentProviders.data.map((provider) => (
        <React.Fragment key={provider}>
          {getPaymentProvider(
            provider,
            'h-8 w-auto rounded-[4px] border border-brand-light-grey bg-white'
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function getPaymentProvider(provider: PaymentProviderType, className?: string) {
  switch (provider) {
    case 'amazonPay':
      return <AmazonPayLogo className={className} />;
    case 'amex':
      return <AMEXLogo className={className} />;
    case 'applePay':
      return <ApplePayLogo className={className} />;
    case 'googlePay':
      return <GooglePayLogo className={className} />;
    case 'klarna':
      return <KlarnaLogo className={className} />;
    case 'masterCard':
      return <MasterCardLogo className={className} />;
    case 'mobilePay':
      return <MobilePayLogo className={className} />;
    case 'payPal':
      return <PayPalLogo className={className} />;
    case 'samsungPay':
      return <SamsungPayLogo className={className} />;
    case 'vipps':
      return <VippsLogo className={className} />;
    case 'visa':
      return <VisaLogo className={className} />;
    default:
      return null;
  }
}
