'use client';

import { SmileDeepLinks } from '@/data/constants';

interface SmileButtonProps {
  deepLink: SmileDeepLinks;
  children: React.ReactNode;
}

export const SmileButton = ({ deepLink, children }: SmileButtonProps) => {
  return (
    <button
      onClick={() => {
        if (window.SmileUI) {
          window.SmileUI.openPanel({ deep_link: 'home' });
        } else {
        }
      }}
    >
      {children}
    </button>
  );
};
