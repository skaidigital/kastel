'use client';

import { useEffect } from 'react';

export default function ClientSideScript() {
  useEffect(() => {
    setTimeout(() => {
      const signInLink = document.querySelector('.body-1.mb-2 a');
      //   const signInLink = document.querySelector('smile-panel-frame-container');

      if (signInLink) {
        signInLink.setAttribute('href', '/no/no/account');
      }
      console.log(signInLink);
    }, 5000); // Delay of 1000 milliseconds
  }, []);

  return null; // Return null because this component does not render anything
}
