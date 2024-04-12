'use client';

import { SmileDeepLinks } from '@/data/constants';

interface SmileButtonProps {
  deepLink: SmileDeepLinks;
  label: string;
}

export const SmileButton = ({ deepLink, label }: SmileButtonProps) => {
  console.log('SmileButton');

  return (
    <button
      onClick={() => {
        console.log('Click ', deepLink);

        window.SmileUI.openPanel({ deep_link: deepLink });
      }}
    >
      {label}
    </button>
  );
};

// export function OpenSmileHome() {
//   const customerId = '123123123123123';

//   SmileInit({ customerId });

//   return (
//     <button
//       onClick={() => {
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
