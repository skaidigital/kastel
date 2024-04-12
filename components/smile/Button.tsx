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
