import { getDictionary } from '@/app/dictionaries';
import { ControlledAlertDrawer } from '@/components/ControlledAlertDrawer';
import { RedirectButton } from '@/components/global/MarketSelector/RedirectButton';
import { StayInMarketButton } from '@/components/global/MarketSelector/StayInMarketButton';
import { COOKIE_NAMES } from '@/data/constants';
import countries from '@/data/countries';
import { cookies } from 'next/headers';

export async function MarketPopup() {
  const { market_selector: dictionary } = await getDictionary();

  const requestCountry = cookies().get(COOKIE_NAMES.REQUEST_COUNTRY)?.value;
  const reccommendedMarket = cookies().get(COOKIE_NAMES.RECCOMMENDED_MARKET)?.value;

  const reccommendedMarketUrl = getReccommendedMarketUrl(reccommendedMarket as string);

  const countryName = countries.find((country) => country.value === requestCountry)?.label;
  const reccommendedMarketName =
    reccommendedMarket === 'EU'
      ? 'European'
      : countries.find((country) => country.value === reccommendedMarket)?.label;

  const basedOnLocation = dictionary.based_on_your_location;
  const firstPart = basedOnLocation.split('__URL__')[0];
  const secondPart = basedOnLocation.split('__URL__')[1];

  return (
    <ControlledAlertDrawer initialState={true}>
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
          <RedirectButton reccommenedMarketUrl={reccommendedMarketUrl}>
            {dictionary.switch_location}
          </RedirectButton>
          <StayInMarketButton>{dictionary.stay}</StayInMarketButton>
        </div>
      </div>
    </ControlledAlertDrawer>
  );
}

function getReccommendedMarketUrl(country: string) {
  switch (country) {
    case 'NO':
      return 'https://abate-b2c-no.vercel.app';
    case 'SE':
      return 'https://abate-b2c-sv.vercel.app';
    case 'DK':
      return 'https://abate-b2c-dk.vercel.app';
    default:
      return 'https://abate-b2c-eu.vercel.app';
  }
}
