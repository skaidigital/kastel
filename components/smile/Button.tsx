'use client';

import { SmileDeepLinks } from '@/data/constants';

interface SmileButtonProps {
  deepLink: SmileDeepLinks;
  label: string;
}

export const SmileButton = ({ deepLink, label }: SmileButtonProps) => {
  return (
    <button
      onClick={() => {
        console.log('Click ', deepLink);
        if (window.SmileUI) {
          console.log('SmileUI is loaded and initialized.');

          window.SmileUI.openPanel({ deep_link: 'home' });
        } else {
          console.log('SmileUI is not loaded and initialized.');
        }
      }}
    >
      {label}
    </button>
  );
};
