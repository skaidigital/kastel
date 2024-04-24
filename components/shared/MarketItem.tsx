import { handleHasChosenMarket } from '@/components/global/MarketPopup/actions';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  flag: React.ReactNode;
  market: string;
  language: string;
  href: string;
  onClose: () => void;
}

export function MarketItem({ flag, market, language, href, onClose }: Props) {
  const isSelected = false;
  const router = useRouter();

  async function handleClick() {
    await handleHasChosenMarket();
    onClose();
    router.push(href);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'rounded-[4px] p-4',
        isSelected
          ? 'bg-brand-primary text-white'
          : 'bg-brand-sand text-brand-mid-grey hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white'
      )}
    >
      <div className={cn('flex min-w-48 gap-x-4 ')}>
        <div className="w-10">{flag}</div>
        <div className="flex flex-col items-start justify-start text-sm">
          <span className="font-medium">{market}</span>
          <span>{language}</span>
        </div>
      </div>
    </button>
  );
}
