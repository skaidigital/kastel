import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    //   Base
    SITE_NAME: z.string().min(1),
    BASE_URL: z.string().min(1),
    // Sanity
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_ADMIN_API_TOKEN: z.string().min(1),
    SANITY_REVALIDATE_SECRET: z.string().min(1),
    SANITY_PRODUCT_SYNC_WEBHOOK_SECRET: z.string().min(1),
    //   Shopify
    SHOPIFY_STORE_DOMAIN: z.string().min(1),
    SHOPIFY_GRAPHQL_API_ENDPOINT: z.string().min(1),
    SHOPIFY_ADMIN_ACCESS_TOKEN: z.string().min(1),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
    SHOPIFY_CUSTOMER_CLIENT_ID: z.string().min(1),
    SHOPIFY_CUSTOMER_CLIENT_SECRET: z.string().min(1),
    SHOPIFY_CUSTOMER_SHOP_ID: z.string().min(1),
    // Klaviyo
    KLAVIYO_NEWSLETTER_LIST_ID: z.string().min(1),
    KLAVIYO_API_KEY: z.string().min(1),
    //  Other
    RESEND_API_KEY: z.string().min(1),
    GTM_ID: z.string().min(1)
  },
  client: {
    //   Base
    NEXT_PUBLIC_VERCEL_URL: z.string().url(),

    // Shopify
    NEXT_PUBLIC_SHOPIFY_SHOP_ID: z.string().min(1),
    NEXT_PUBLIC_SHOPIFY_CURRENCY: z.string().min(1),
    NEXT_PUBLIC_SHOPIFY_DEFAULT_LANGUAGE: z.string().min(1),

    //   Sanity
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),

    //   Other
    NEXT_PUBLIC_PRODUCT_SYNC_SECRET_KEY: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_SHOPIFY_SHOP_ID: process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID,
    NEXT_PUBLIC_SHOPIFY_CURRENCY: process.env.NEXT_PUBLIC_SHOPIFY_CURRENCY,
    NEXT_PUBLIC_SHOPIFY_DEFAULT_LANGUAGE: process.env.NEXT_PUBLIC_SHOPIFY_DEFAULT_LANGUAGE,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_PRODUCT_SYNC_SECRET_KEY: process.env.NEXT_PUBLIC_PRODUCT_SYNC_SECRET_KEY
  },
  isServer: typeof window === 'undefined'
});
