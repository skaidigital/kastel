'use client';

import { useEffect } from 'react';

export default function LipscoreInit() {
  useEffect(() => {
    window.lipscoreInit = function () {
      // eslint-disable-next-line no-undef
      lipscore.init({
        apiKey: '889c3f3e4b6ac67269261324'
      });
    };

    // Dynamically load the Lipscore script
    const script = document.createElement('script');
    script.src = '//static.lipscore.com/assets/no/lipscore-v1.js';
    script.async = true;

    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty array ensures this effect runs only once after the initial render

  return null;
}
