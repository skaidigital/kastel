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
      }
    }
  }, []);

  return null;
}
