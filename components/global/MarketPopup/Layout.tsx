'use client';

import { Dictionary } from '@/app/dictionaries';
import { Modal, ModalContent, ModalHeader } from '@/components/Modal';
import { Sheet, SheetContent } from '@/components/Sheet';
import { NorwegianFlagIcon } from '@/components/icons/NorwegianFlagIcon';
import { MarketItem } from '@/components/shared/MarketItem';
import { handleHasChosenMarket } from '@/lib/actions';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import { parseAsBoolean, useQueryState } from 'nuqs';

interface Props {
  dictionary: Dictionary['market_selector'];
}

export function MarketLayout({ dictionary }: Props) {
  const [isOpen, setIsOpen] = useQueryState('market_popup', parseAsBoolean);
  const { market, lang } = useBaseParams();
  const router = useRouter();

  const onClose = (e: any) => {
    e.preventDefault();
    setIsOpen(null);
  };

  async function handleClick(href: string) {
    await handleHasChosenMarket();
    setIsOpen(null).then(() => router.push(href));
  }

  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen || undefined} onOpenChange={setIsOpen}>
        <ModalContent
          label="Select your preferred market"
          className="flex w-fit flex-col gap-y-8 rounded-[4px] p-8"
          size="none"
          onClose={onClose}
        >
          <ModalHeader title={dictionary.select_your_location} onClose={onClose} />
          <div className="grid grid-cols-3 gap-4">
            <MarketItem
              flag={<NorwegianFlagIcon />}
              market="Norway"
              language="Norwegian"
              href="/no/no"
              isSelected={market === 'no' && lang === 'no'}
              onClick={() => handleClick('/no/no')}
            />
            <MarketItem
              flag={<NorwegianFlagIcon />}
              market="Norway"
              language="English"
              href="/no/en"
              isSelected={market === 'no' && lang === 'en'}
              onClick={() => handleClick('/no/en')}
            />
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Sheet isOpen={isOpen || undefined} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col gap-y-8">
        <h2 className="text-center text-heading-xs font-bold uppercase">
          {dictionary.select_your_location}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <MarketItem
            flag={<NorwegianFlagIcon />}
            market="Norway"
            language="Norwegian"
            href="/no/no"
            isSelected={market === 'no' && lang === 'no'}
            onClick={() => handleClick('/no/no')}
          />
          <MarketItem
            flag={<NorwegianFlagIcon />}
            market="Norway"
            language="English"
            href="/no/en"
            isSelected={market === 'no' && lang === 'en'}
            onClick={() => handleClick('/no/en')}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
