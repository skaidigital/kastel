'use client';

import { SMILE_DEEP_LINKS } from '@/data/constants';

export function SmileButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={() => {
        if (window.SmileUI) {
          window.SmileUI.openPanel({ deep_link: SMILE_DEEP_LINKS.home });
        }
      }}
    >
      {children}
    </button>
  );
}
