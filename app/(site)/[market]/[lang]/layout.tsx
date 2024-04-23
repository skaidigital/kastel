import Providers from '@/components/Providers';
import PreviewMarketSelector from '@/components/sanity/PreviewMarketSelector';
import { env } from '@/env';
import { loadDefaultMetadata } from '@/lib/sanity/getDefaultMetadata';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { ReactNode, Suspense } from 'react';

import ShopifyAnalytics from '@/components/ShopifyAnalytics';
import { Footer } from '@/components/global/Footer';
import { PopupHandler } from '@/components/global/PopupHandler';
import { LangValues, MarketValues } from '@/data/constants';
import { GoogleTagManager } from '@next/third-parties/google';
import PlausibleProvider from 'next-plausible';
import { revalidatePath, revalidateTag } from 'next/cache';
import Script from 'next/script';
import '../../../../styles/globals.css';

const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default function IndexRoute({
  children,
  params: { market, lang }
}: {
  children: ReactNode;
  params: { market: MarketValues; lang: LangValues };
}) {
  const isInProduction = env.NODE_ENV === 'production';

  // const hasConsent = cookies().get(COOKIE_NAMES.COOKIE_CONSENT)?.value === 'true';

  return (
    <html lang="en">
      <GoogleTagManager gtmId={env.GTM_ID} />
      <head>
        {isInProduction && (
          <Script
            strategy="afterInteractive"
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="4a61496c-631f-41e9-bf0e-88ecf2de8ad3"
            type="text/javascript"
          />
        )}
        <PlausibleProvider revenue domain={env.BASE_URL.split('https://').at(1) || ''} />
      </head>
      <body>
        <div className="fixed bottom-0 top-0 w-full overflow-x-auto">
          <Providers>
            <div>
              <Suspense>
                <PopupHandler lang={lang} />
              </Suspense>
              {/* <Suspense fallback={<Skeleton className="h-11 w-full" />}>
                <AnnouncementBanner lang={lang} />
              </Suspense>
              <Suspense>
                <Navbar market={market} lang={lang} />
              </Suspense> */}
              <main>
                {children}
                {draftMode().isEnabled && (
                  <VisualEditing
                    refresh={async (payload) => {
                      'use server';
                      if (!draftMode().isEnabled) {
                        console.debug('Skipped manual refresh because draft mode is not enabled');
                        return;
                      }
                      if (payload.source === 'mutation') {
                        if (payload.document.slug?.current) {
                          console.log('Revalidate slug', payload.document.slug.current);

                          const tag = `${payload.document._type}:${payload.document.slug.current}`;
                          console.log('Revalidate slug', tag);
                          await revalidateTag(tag);
                        }
                        console.log('Revalidate tag', payload.document._type);
                        return revalidateTag(payload.document._type);
                      }
                      console.log('Revalidate home page');
                      await revalidatePath('/', 'layout');
                    }}
                  />
                )}
                <Analytics />
              </main>
            </div>
            <Suspense>
              <Footer market={market} lang={lang} />
            </Suspense>
            <ShopifyAnalytics hasConsent />
            {draftMode().isEnabled && <PreviewMarketSelector />}
            {/* <SmileInit customerId="7292377628922" /> */}
          </Providers>
        </div>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params: { market }
}: {
  params: { market: MarketValues };
}): Promise<Metadata> {
  const defaultMetadata = await loadDefaultMetadata(market);
  const ogImage = urlForOpenGraphImage(defaultMetadata?.ogImage);

  return {
    metadataBase: new URL(baseUrl),
    title: defaultMetadata?.metaTitle
      ? {
          template: `%s | ${defaultMetadata.metaTitle}`,
          default: defaultMetadata.metaTitle || 'Abate'
        }
      : undefined,
    description: defaultMetadata?.metaDescription ? defaultMetadata.metaDescription : undefined,
    openGraph: {
      type: 'website',
      images: ogImage ? [ogImage] : []
    }
  };
}
