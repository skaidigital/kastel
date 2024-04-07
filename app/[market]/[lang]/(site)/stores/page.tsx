import { StoreLocator } from '@/components/pages/StoreLocatorPage';
import { Metadata } from 'next';

export default function Page() {
  return <StoreLocator />;
}

export const metadata: Metadata = {
  title: 'Retailers'
};

// async function getTitle() {
//   return getMarket().then((market) => {
//     switch (market) {
//       case 'dk':
//         return 'Forhandlere';
//       case 'no':
//         return 'Forhandlere';
//       case 'sv':
//         return 'Återförsäljare';
//       case 'eu':
//         return 'Retailers';
//     }
//   });
// }
