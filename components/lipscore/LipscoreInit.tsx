'use client';

import { env } from '@/env';
import { useEffect } from 'react';

export default function LipscoreInit() {
  useEffect(() => {
    // Dynamically load the Lipscore script and initialize
    const script = document.createElement('script');
    script.src = '//static.lipscore.com/assets/no/lipscore-v1.js';
    script.async = true;
    script.onload = () => {
      window?.lipscore?.init({
        apiKey: env.NEXT_PUBLIC_LIPSCORE_API_KEY
      });
      window?.lipscore?.reInitWidgets(true);
    };

    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty array ensures this effect runs only once after the initial render

  return null;
}
