'use client';

import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Modal, ModalContent, ModalHeader } from '@/components/Modal';
import { Sheet, SheetContent, SheetHeader } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { NorwegianFlagIcon } from '@/components/icons/NorwegianFlagIcon';
import { MarketItem } from '@/components/shared/MarketItem';
import countries from '@/data/countries';
import { handleHasChosenMarket } from '@/lib/actions';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

interface Props {
  requestCountry: string;
  reccommendedMarket: string;
  dictionary: Dictionary['market_suggestion_popup'];
}

// TODO make it more sophisticated once we have more markets
export function MarketSuggestionPopupLayout({ dictionary, requestCountry }: Props) {
  const [marketPopupIsOpen, setMarketPopupIsOpen] = useQueryState('market_popup', parseAsBoolean);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { market, lang } = useBaseParams();

  const onClose = () => setIsOpen(false);
  const router = useRouter();

  const isDesktop = useIsDesktop();

  function handleOpenMoreLocations() {
    onClose();
    setMarketPopupIsOpen(true).then(() => router.refresh());
  }

  async function handleClick(href: string) {
    await handleHasChosenMarket();
    router.push(href);
    onClose();
  }

  useEffect(() => {
    async function handleSetHasChosenMarket() {
      await handleHasChosenMarket();
    }
    if (!isOpen) {
      handleSetHasChosenMarket();
    }
  }, [isOpen]);

  const countryName = countries.find((country) => country.value === requestCountry)?.label;

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen || undefined} onOpenChange={setIsOpen}>
        <ModalContent
          label={dictionary.confirm_your_location}
          className="bottom-10 left-auto right-10 top-auto flex h-fit w-fit translate-x-0 translate-y-0 flex-col rounded-[4px] p-8"
          size="none"
        >
          <ModalHeader title={dictionary.confirm_your_location}>
            <div className="flex flex-col gap-y-1">
              <Text size="sm" className="text-brand-mid-grey">
                {dictionary.looks_like_you_are_in}{' '}
                <span className="font-medium text-brand-dark-grey">{countryName}</span>.
              </Text>
              <Text size="sm" className="text-brand-mid-grey">
                {dictionary.would_you_like_to_change_location}
              </Text>
            </div>
          </ModalHeader>
          <div className="flex gap-x-3">
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
              href="/no/en/"
              isSelected={market === 'no' && lang === 'en'}
              onClick={() => handleClick('/no/en')}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleOpenMoreLocations} className="mt-2">
            {dictionary.more_locations}
          </Button>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Sheet isOpen={isOpen || undefined} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader title={dictionary.confirm_your_location} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Text size="sm" className="text-brand-mid-grey">
              {dictionary.looks_like_you_are_in}{' '}
              <span className="font-medium text-brand-dark-grey">{countryName}</span>.
            </Text>
            <Text size="sm" className="text-brand-mid-grey">
              {dictionary.would_you_like_to_change_location}
            </Text>
          </div>
        </SheetHeader>
        <div className="flex flex-col items-center">
          <div className="flex w-full gap-x-3">
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
              href="/no/en/"
              isSelected={market === 'no' && lang === 'en'}
              onClick={() => handleClick('/no/en')}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleOpenMoreLocations} className="mt-2">
            {dictionary.more_locations}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
