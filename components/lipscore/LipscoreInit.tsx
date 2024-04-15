'use client';

import { useEffect } from 'react';

const apikey = '633d0a2e8e16344a4eec8a1a';
const sercretKey = 'c994d47b85883e8d69f6b6a4a2428a87';

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
  }, []); // Empty array ensures this effect runs only once after the initial render

  return null;
}

// export default function LipscoreInit() {
//   console.log('Lipscore init');

//   useEffect(() => {
//     window.lipscoreInit = function () {
//       console.log('running init');

//       window.lipscore?.init({
//         apiKey: apikey
//       });
//     };

//     console.log('Lipscore init');

//     // Dynamically load the Lipscore script
//     const script = document.createElement('script');
//     script.src = '//static.lipscore.com/assets/no/lipscore-v1.js';
//     script.async = true;

//     document.head.appendChild(script);

//     // // Cleanup function to remove the script when the component unmounts
//     // return () => {
//     //   document.head.removeChild(script);
//     // };
//   }, []); // Empty array ensures this effect runs only once after the initial render

//   return null;
// }
