import { Configurator } from '@/components/pages/ConfiguratorPage/ConfiguratorPageLayout';
import { getConfiguratorQuery } from '@/components/pages/ConfiguratorPage/hooks';
import { MarketValues } from '@/data/constants';
import { env } from '@/env';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { Metadata } from 'next';

function loadConfigurator(market: MarketValues) {
  const query = getConfiguratorQuery(market);

  return loadQuery<any>(query, {}, { next: { tags: [`configurator:${market}`] } });
}

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: Props) {
  const market = await getMarket();
  const initial = await loadConfigurator(market);

  // Validate and sanitize searchParams before passing to Configurator
  // const sanitizedSearchParams = validateAndSanitizeStep(searchParams || {});

  return <Configurator data={initial.data} params={searchParams} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

function getTitle() {
  const market = env.NEXT_PUBLIC_MARKET as MarketValues;
  switch (market) {
    case 'dk':
      return 'Konfigurator';
    case 'no':
      return 'Konfigurator';
    case 'sv':
      return 'Konfigurator';
    case 'eu':
      return 'Configurator';
  }
}

// // Function to validate and sanitize the step in searchParams
// function validateAndSanitizeStep(params: { [key: string]: string | string[] | undefined }): {
//   [key: string]: string | string[] | undefined;
// } {
//   const validSteps = ['1', '2', '3', '4']; // Define valid steps
//   let step = params?.step instanceof Array ? params.step[0] : params?.step; // Handle if step is an array

//   if (!step) {
//     step = '1'; // Default step or handle as needed
//   }

//   // Check if step is valid, if not, set to a default value or handle accordingly
//   if (!validSteps.includes(step)) {
//     step = '1'; // Default step or handle as needed
//   }

//   return { ...params, step }; // Return updated searchParams with validated step
// }
