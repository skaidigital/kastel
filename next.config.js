/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');
// const { createClient } = require('next-sanity');
const createJITI = require('jiti');
const { withPlausibleProxy } = require('next-plausible');
var jiti = createJITI(__filename);

jiti('./env');

// const client = createClient({
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   useCdn: false,
//   apiVersion: '2022-06-28'
// });

// async function fetchSanityRedirects() {
//   const market = process.env.NEXT_PUBLIC_MARKET;

//   const redirectDocs = await client.fetch(
//     `*[_type == "redirect" && market == $market]{ source, destination, permanent }`,
//     {
//       market
//     }
//   );

//   const redirects = redirectDocs.map((redirect) => {
//     return {
//       source: `/${redirect.source}`,
//       destination: `/${redirect.destination}`,
//       permanent: redirect.permanent
//     };
//   });

//   return redirects;
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'no', 'en'],
    defaultLocale: 'default',
    localeDetection: false
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'abate.no' },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      { hostname: 'tailwindui.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'image.mux.com' }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    taint: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'https://3wkb686r-3000.euw.devtunnels.ms']
    }
  }
  // async redirects() {
  //   const sanityRedirects = await fetchSanityRedirects();
  //   return [...sanityRedirects];
  // }
};

const SentryWebpackPluginOptions = {
  silent: true,
  org: 'skai-digital',
  project: 'abate'
};

const SentryOptions = {
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true
};

const nextConfigWithSentry = withSentryConfig(
  nextConfig,
  SentryWebpackPluginOptions,
  SentryOptions
);

module.exports = withPlausibleProxy()({
  ...nextConfigWithSentry
});
