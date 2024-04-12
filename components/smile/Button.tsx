'use client';

import { SmileDeepLinks } from '@/data/constants';

interface SmileButtonProps {
  deepLink: SmileDeepLinks;
  label: string;
}

export const SmileButton = ({ deepLink, label }: SmileButtonProps) => {
  console.log('SmileButton');
  const customerId = '123123';

  //   SmileInit({ customerId });
  return (
    <button
      onClick={() => {
        console.log('Click ', deepLink);
        if (window.SmileUI) {
          window.SmileUI.openPanel({ deep_link: deepLink });
        } else {
          console.log('SmileUI is not loaded and initialized.');
        }
      }}
    >
      {label}
    </button>
  );
};

// export function OpenSmileHome() {
//   console.log('OpenSmileHome');

//   const customerId = '7292377628922';

//   //   SmileInit({ customerId });
//   if (window.SmileUI) {
//     console.log('SmileUI is already loaded and initialized.');
//   } else {
//     console.log('SmileUI is not loaded and initialized.');
//   }

//   return (
//     <button
//       onClick={() => {
//         console.log('Click Home');

//         if (window.SmileUI) {
//           console.log('SmileUI is already loaded and initialized.');
//         } else {
//           console.log('SmileUI is not loaded and initialized.');
//         }

//         window.SmileUI.openPanel({ deep_link: 'home' });
//       }}
//     >
//       Open Smile Home
//     </button>
//   );
// }

// export function OpenSmileActivityRules() {
//   const customerId = '123123123123123';

//   SmileInit({ customerId });
//   return (
//     <button
//       onClick={() => {
//         window.SmileUI.openPanel({ deep_link: 'points_activity_rules' });
//       }}
//     >
//       Open Smile Activity Rules
//     </button>
//   );
// }

// export function OpenSmilePointsProduct() {
//   //   const customerId = '7292377628922';
//   const customerId = '123123123123123';

//   SmileInit({ customerId });
//   return (
//     <button
//       onClick={() => {
//         window.SmileUI.openPanel({ deep_link: 'points_products' });
//       }}
//     >
//       Open Smile Points Product
//     </button>
//   );
// }

// export function OpenSmileReferral() {
//   //   const customerId = '7292377628922';
//   const customerId = '123123123123123';

//   SmileInit({ customerId });
//   return (
//     <button
//       onClick={() => {
//         window.SmileUI.openPanel({ deep_link: 'referral_program_details' });
//       }}
//     >
//       Open Smile Referral
//     </button>
//   );
// }
