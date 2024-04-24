'use client';

import { Dictionary } from '@/app/dictionaries';
import { Modal, ModalContent, ModalHeader } from '@/components/Modal';
import { Sheet, SheetContent } from '@/components/Sheet';
import { NorwegianFlagIcon } from '@/components/icons/NorwegianFlagIcon';
import { MarketItem } from '@/components/shared/MarketItem';
import { useDeviceType } from '@/lib/useDeviceType';
import { useState } from 'react';

interface Props {
  requestCountry: string;
  reccommendedMarket: string;
  dictionary: Dictionary['market_selector'];
}

// TODO find better flag icons
export function MarketSuggestionPopupLayout({
  requestCountry,
  reccommendedMarket,
  dictionary
}: Props) {
  console.log({ requestCountry });
  console.log({ reccommendedMarket });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isDesktop } = useDeviceType();
  const onClose = () => setIsOpen(false);

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent
          label="Select your preferred market"
          className="flex w-fit flex-col gap-y-8 rounded-[4px] p-8"
          size="none"
        >
          <ModalHeader title={dictionary.select_your_location} />
          <div className="grid grid-cols-3 gap-4">
            <MarketItem
              flag={<NorwegianFlagIcon />}
              market="Norway"
              language="Norwegian"
              href="/no/no"
              onClose={onClose}
            />
            <MarketItem
              flag={<NorwegianFlagIcon />}
              market="Norway"
              language="English"
              href="/no/en"
              onClose={onClose}
            />
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
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
            onClose={onClose}
          />
          <MarketItem
            flag={<NorwegianFlagIcon />}
            market="Norway"
            language="English"
            href="/no/en"
            onClose={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
