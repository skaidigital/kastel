'use client';

import { useEffect } from 'react';

let mapLoaded = false;

export function FindAStorePage() {
  useEffect(() => {
    if (!mapLoaded) {
      const script = document.createElement('script');
      script.src = 'https://stockist.co/embed/v1/widget.min.js';
      script.onload = () => {
        mapLoaded = true;
        // Call stockistRebuildWidget if it exists and is a function
        if (typeof window.stockistRebuildWidget === 'function') {
          window.stockistRebuildWidget();
        }
      };

      // Ensure that the 'head' element exists before appending
      const headElement = document.querySelector('head');
      if (headElement !== null) {
        headElement.appendChild(script);
      } else {
        console.error('Failed to load the Stockist script: <head> element not found.');
      }
    } else {
      // Ensure stockistRebuildWidget is called only if it exists and is a function
      if (typeof window.stockistRebuildWidget === 'function') {
        window.stockistRebuildWidget();
      } else {
        console.error('stockistRebuildWidget function is not available.');
      }
    }
  }, []);

  // TODO: Replace the account identifier below with that of your own Stockist account
  const stockistHtml = `<div data-stockist-widget-tag="u14178">Loading store locator...</div>`;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: stockistHtml }} />
    </>
  );
}
