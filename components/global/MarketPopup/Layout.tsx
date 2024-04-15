'use client';

import { Dictionary } from '@/app/dictionaries';
import { Modal, ModalContent } from '@/components/Modal';
import { Sheet, SheetContent } from '@/components/Sheet';
import countries from '@/data/countries';
import { useDeviceType } from '@/lib/useDeviceType';
import { useState } from 'react';

interface Props {
  requestCountry: string;
  reccommendedMarket: string;
  dictionary: Dictionary['market_selector'];
  country: string;
}

export function MarketLayout({ dictionary, country, reccommendedMarket, requestCountry }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { isDesktop } = useDeviceType();

  const basedOnLocation = dictionary.based_on_your_location;
  const firstPart = basedOnLocation.split('__URL__')[0];
  const secondPart = basedOnLocation.split('__URL__')[1];

  const countryName = countries.find((c) => c.value === country)?.label;
  const reccommendedMarketName =
    reccommendedMarket === 'EU'
      ? 'European'
      : countries.find((country) => country.value === reccommendedMarket)?.label;
  const reccommendedMarketUrl = getReccommendedMarketUrl(reccommendedMarket);

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent label="Select your preferred market" className="w-[420px] rounded-[4px] p-8">
          <div className="flex w-full flex-col justify-between gap-5 lg:flex-row">
            <div className="flex flex-col space-y-1">
              <h2 className="text-paragraph-lg">
                {dictionary.are_you_in} {countryName}?
              </h2>
              <p className="text-paragraph-lg text-brand-mid-grey">
                {firstPart} {reccommendedMarketName} {secondPart}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* <RedirectButton reccommenedMarketUrl={reccommendedMarketUrl}>
                {dictionary.switch_location}
              </RedirectButton>
              <StayInMarketButton>{dictionary.stay}</StayInMarketButton> */}
            </div>
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <div className="flex w-full flex-col justify-between gap-5 lg:flex-row">
          <div className="flex flex-col space-y-1">
            <h2 className="text-paragraph-lg">
              {dictionary.are_you_in} {countryName}?
            </h2>
            <p className="text-paragraph-lg text-brand-mid-grey">
              {firstPart} {reccommendedMarketName} {secondPart}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* <RedirectButton reccommenedMarketUrl={reccommendedMarketUrl}>
              {dictionary.switch_location}
            </RedirectButton>
            <StayInMarketButton>{dictionary.stay}</StayInMarketButton> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
function getReccommendedMarketUrl(country: string) {
  switch (country) {
    case 'NO':
      return 'https://abate-b2c-no.vercel.app';
    default:
      return 'https://abate-b2c-eu.vercel.app';
  }
}
