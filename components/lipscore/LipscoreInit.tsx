'use client';

import { useEffect } from 'react';

const apikey = '889c3f3e4b6ac67269261324';

export default function LipscoreInit() {
  useEffect(() => {
    initializeLipscore();

    async function initializeLipscore() {
      // Check if Lipscore is already loaded and initialized
      if (window.lipscore) {
        console.log('Lipscore is already loaded and initialized.');
        return;
      }

      // Ensure the script is loaded before initializing
      if (!window.lipscore) {
        const script = document.createElement('script');
        script.async = true;
        script.src = '//static.lipscore.com/assets/en/lipscore-v1.js';
        document.head.appendChild(script);

        script.onload = () => {
          if (window.lipscore) {
            window.lipscore.init({
              apiKey: apikey
            });
            console.log(window.lipscore);

            console.log('Lipscore initialized after script load');
          }
        };
      } else {
        console.log('Lipscore initialized without needing to load script');
      }
    }
    // Depending on your application, you may decide to add a cleanup function here.
    return () => {
      // Cleanup script if necessary
      // let script = document.querySelector('script[src="//static.lipscore.com/assets/no/lipscore-v1.js"]');
      // if (script) document.head.removeChild(script);
    };
  }, []);

  return null;
}
