/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');
const { createClient } = require('next-sanity');
const createJITI = require('jiti');
const { withPlausibleProxy } = require('next-plausible');
const withBundleAnalyzer = require('@next/bundle-analyzer')();
var jiti = createJITI(__filename);

jiti('./env');

const productRedirects = [
  {
    source: '/products/alta-coal-black',
    destination: '/no/no/products/alta-vinterstovler-kullsvart',
    permanent: true
  },
  {
    source: '/products/alta-maple-brown',
    destination: '/no/no/products/alta-vinterstovler-lonnebrun',
    permanent: true
  },
  {
    source: '/products/alta-pine-green',
    destination: '/no/no/products/alta-vinterstovler-furu-gronn',
    permanent: true
  },
  {
    source: '/products/alta-sand',
    destination: '/no/no/products/alta-vinterstovler-sand',
    permanent: true
  },
  {
    source: '/products/dale-wp-pine-green',
    destination: '/no/no/products/dale-wp-pine-green',
    permanent: true
  },
  {
    source: '/products/face-mask-arctic-blue',
    destination: '/no/no/products/face-mask-arctic-blue',
    permanent: true
  },
  {
    source: '/products/halvstorrelse-justering-innersale',
    destination: '/no/no/products/halvstorrelse-justering-innersale',
    permanent: true
  },
  {
    source: '/products/innleggssaler',
    destination: '/no/no/products/kastel-innleggssaler',
    permanent: true
  },
  {
    source: '/products/kastel-shoes-gift-card-1',
    destination: '/no/no/products/kastel-shoes-gift-card-1',
    permanent: true
  },
  {
    source: '/products/lofoten-cream-white',
    destination: '/no/no/products/lofoten-sneakers-hvit-ull',
    permanent: true
  },
  {
    source: '/products/lofoten-sneakers-i-gra-tronder-ull-batch-no-2',
    destination: '/no/no/products/lofoten-sneakers-gra-tronder-ull',
    permanent: true
  },
  {
    source: '/products/lofoten-terrain-suede-seaweed-green',
    destination: '/no/no/products/lofoten-terreng-semsket-sneakers-tanggroenn',
    permanent: true
  },
  {
    source: '/products/lofoten-wr-terrain-coal-black',
    destination: '/no/no/products/lofoten-terreng-hamp-sneakers-kullsvart',
    permanent: true
  },
  {
    source: '/products/madla-terrain',
    destination: '/no/no/products/madla-terrain',
    permanent: true
  },
  {
    source: '/products/madla-terrain-winter-wr-coal-black',
    destination: '/no/no/products/madla-vinter-terreng-hoye-sneakers-kullsvart',
    permanent: true
  },
  {
    source: '/products/madla-terrain-winter-wr-pine-green',
    destination: '/no/no/products/madla-vinter-terreng-hoye-sneakers-furu-groenn',
    permanent: true
  },
  {
    source: '/products/madla-terrain-wr-coal-black',
    destination: '/no/no/products/madla-vinter-terreng-hoye-sneakers-kullsvart',
    permanent: true
  },
  {
    source: '/products/madla-terrain-wr-forest-green',
    destination: '/no/no/products/madla-terreng-hoye-sneakers-skoggroenn',
    permanent: true
  },
  {
    source: '/products/madla-terrain-wr-maple-brown',
    destination: '/no/no/products/madla-terreng-hoye-sneakers-loennebrun',
    permanent: true
  },
  {
    source: '/products/madla-terrain-wr-sand',
    destination: '/no/no/products/madla-terrain-wr-sand',
    permanent: true
  },
  {
    source: '/products/madla-winter-ag',
    destination: '/no/no/products/madla-winter-ag',
    permanent: true
  },
  {
    source: '/products/madla-wr-arctic-blue-1',
    destination: '/no/no/products/madla-hoye-sneakers-arktisk-blaa',
    permanent: true
  },
  {
    source: '/products/madla-wr-arctic-blue-2',
    destination: '/no/no/products/madla-wr-arctic-blue-2',
    permanent: true
  },
  {
    source: '/products/madla-wr-coal-black-2',
    destination: '/no/no/products/madla-wr-coal-black-2',
    permanent: true
  },
  {
    source: '/products/madla-wr-coal-black-3',
    destination: '/no/no/products/madla-hoye-sneakers-kullsvart',
    permanent: true
  },
  {
    source: '/products/madla-wr-raven-black',
    destination: '/no/no/products/madla-hoye-sneakers-dyp-sort',
    permanent: true
  },
  {
    source: '/products/naturlig-voks',
    destination: '/no/no/products/naturlig-bivoks',
    permanent: true
  },
  {
    source: '/products/roros-leather-wr',
    destination: '/no/no/products/roros-vinter-terreng-stovler-stein-graa',
    permanent: true
  },
  {
    source: '/products/roros-leather-wr-birch-beige',
    destination: '/no/no/products/roros-vinter-terreng-stovler-bjoerk-beige',
    permanent: true
  },
  {
    source: '/products/roros-leather-wr-coal-black-1',
    destination: '/no/no/products/roros-vinter-terreng-stovler-kullsvart',
    permanent: true
  },
  {
    source: '/products/roros-terrain-wp-coal-black',
    destination: '/no/no/products/roros-terreng-stovletter-kullsvart',
    permanent: true
  },
  {
    source: '/products/roros-terrain-wp-raven-black',
    destination: '/no/no/products/roros-terreng-stovletter-dyp-sort',
    permanent: true
  },
  {
    source: '/products/roros-wp-arctic-blue-1',
    destination: '/no/no/products/roros-stovletter-arktisk-blaa',
    permanent: true
  },
  {
    source: '/products/roros-wp-coal-black-1',
    destination: '/no/no/products/roros-stovletter-kullsvart',
    permanent: true
  },
  {
    source: '/products/roros-wp-mudguard-cloud-white',
    destination: '/no/no/products/roros-mud-stovletter-kremhvit',
    permanent: true
  },
  {
    source: '/products/roros-wp-mudguard-coal-black',
    destination: '/no/no/products/roros-mud-stovletter-kullsvart',
    permanent: true
  },
  {
    source: '/products/roros-wp-mudguard-pine-green',
    destination: '/no/no/products/roros-mud-stovletter-furu-groenn',
    permanent: true
  },
  {
    source: '/products/roros-wp-pine-green-3',
    destination: '/no/no/products/roros-stovletter-furu-groenn',
    permanent: true
  },
  {
    source: '/products/skolisser-arctic-blue',
    destination: '/no/no/products/kastel-skolisser-svenskbla',
    permanent: true
  },
  {
    source: '/products/skolisser-beige',
    destination: '/no/no/products/kastel-skolisser-beige',
    permanent: true
  },
  {
    source: '/products/skolisser-blue',
    destination: '/no/no/products/kastel-skolisser-arktisk-bla',
    permanent: true
  },
  {
    source: '/products/skolisser-coal-black',
    destination: '/no/no/products/kastel-skolisser-kullsvart',
    permanent: true
  },
  {
    source: '/products/skolisser-forest-green',
    destination: '/no/no/products/kastel-skolisser-skoggronn',
    permanent: true
  },
  {
    source: '/products/skolisser-otter-brown',
    destination: '/no/no/products/kastel-skolisser-brun',
    permanent: true
  },
  {
    source: '/products/sola-cream-white',
    destination: '/no/no/products/sola-chelsea-stovler-kremhvit',
    permanent: true
  },
  {
    source: '/products/sola-off-black',
    destination: '/no/no/products/sola-chelsea-stovler-avsvart',
    permanent: true
  },
  {
    source: '/products/stavern-arctic-blue',
    destination: '/no/no/products/stavern-slip-on-sneakers-arktisk-blaa',
    permanent: true
  },
  {
    source: '/products/stavern-birch-beige',
    destination: '/no/no/products/stavern-slip-on-sneakers-bjoerk-beige',
    permanent: true
  },
  {
    source: '/products/stavern-cloud-white',
    destination: '/no/no/products/stavern-slip-on-sneakers-hvit',
    permanent: true
  },
  {
    source: '/products/stavern-coal-black',
    destination: '/no/no/products/stavern-slip-on-sneakers-kullsvart',
    permanent: true
  },
  {
    source: '/products/stavern-lemon',
    destination: '/no/no/products/stavern-slip-on-sneakers-gul',
    permanent: true
  },
  {
    source: '/products/stavern-pine-green',
    destination: '/no/no/products/stavern-slip-on-sneakers-furu-groenn',
    permanent: true
  },
  {
    source: '/products/ullsale-innmark',
    destination: '/no/no/products/innleggssale-i-norsk-ull',
    permanent: true
  },
  {
    source: '/products/voss-beige',
    destination: '/no/no/products/voss-slip-fit-sneakers-beige',
    permanent: true
  },
  {
    source: '/products/voss-black',
    destination: '/no/no/products/voss-slip-fit-sneakers-dyp-svart',
    permanent: true
  },
  {
    source: '/products/voss-forest-green',
    destination: '/no/no/products/voss-slip-fit-sneakers-skoggroenn',
    permanent: true
  },
  {
    source: '/products/waterproofer',
    destination: '/no/no/products/impregnering',
    permanent: true
  }
];

const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  apiVersion: '2022-06-28'
});

// TODO introduce markets here once we implement them
async function fetchSanityRedirects() {
  const redirectDocs = await client.fetch(
    `*[_type == "redirect"]{ source, destination, permanent, lang }`
  );

  const redirects = redirectDocs.map((redirect) => {
    return {
      source: `/${redirect.source}`,
      destination: `/no/${redirect.lang}/${redirect.destination}`,
      permanent: redirect.permanent
    };
  });

  return redirects;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'kastelshoes.com' },
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
  },
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects();
    return [...sanityRedirects, ...productRedirects];
  }
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

const nextConfigWithPlausibleProxy = withPlausibleProxy()({
  ...nextConfigWithSentry
});

module.exports =
  process.env.ANALYZE === 'true'
    ? withBundleAnalyzer(nextConfigWithPlausibleProxy)
    : nextConfigWithPlausibleProxy;

// Injected content via Sentry wizard below

// const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'skai-digital',
  project: 'kastel',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});
