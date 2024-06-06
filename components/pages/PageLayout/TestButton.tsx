'use client';

// Example Next.js component
import { useEffect } from 'react';

export default function TestButton() {
  useEffect(() => {
    // Hide the icons when the component mounts
    const hideIcons = () => {
      const cookieIcon: any = document.querySelector('.cb-icon-class'); // Update with the correct selector
      const gorgiasIcon: any = document.querySelector('.gorgias-widget-icon-class'); // Update with the correct selector
      if (cookieIcon) cookieIcon.style.display = 'none';
      if (gorgiasIcon) gorgiasIcon.style.display = 'none';
    };

    hideIcons();
  }, []);

  return (
    <div>
      <button onClick={() => openCookieBot()}>Open Cookie Settings</button>
      <button onClick={() => openGorgiasWidget()}>Open Gorgias Chat</button>
    </div>
  );
}

/* JavaScript to open Cookie Bot */
function openCookieBot() {
  if (window.CookieConsent) {
    window.Cookiebot.show();
  }
}

/* JavaScript to open Gorgias Widget */
function openGorgiasWidget() {
  if (window.GorgiasChat) {
    window.GorgiasChat.open(); // assuming a method to open Gorgias chat
  }
}
