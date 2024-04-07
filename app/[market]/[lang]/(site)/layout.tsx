import Providers from '@/components/Providers';
import { Skeleton } from '@/components/Skeleton';
import { Footer } from '@/components/global/Footer';
import { InfoBanner } from '@/components/global/InfoBanner';
import { Navbar } from '@/components/global/Navbar';
import { PopupHandler } from '@/components/global/Popup/PopupHandler';
import PreviewMarketSelector from '@/components/sanity/PreviewMarketSelector';
import { USP } from '@/components/shared/USP';
import { env } from '@/env';
import { getMarket } from '@/lib/getMarket';
import { loadDefaultMetadata } from '@/lib/sanity/getDefaultMetadata';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { ReactNode, Suspense } from 'react';

import ShopifyAnalytics from '@/components/ShopifyAnalytics';
import { GoogleTagManager } from '@next/third-parties/google';
import PlausibleProvider from 'next-plausible';
import localFont from 'next/font/local';
import '../../styles/globals.css';

const iowan = localFont({
  src: '../../public/fonts/IowanOldStyleRoman.woff2',
  display: 'swap',
  variable: '--font-iowan'
});

const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default function IndexRoute({ children }: { children: ReactNode }) {
  // const hasConsent = cookies().get(COOKIE_NAMES.COOKIE_CONSENT)?.value === 'true';

  return (
    <html lang="en" className={iowan.className}>
      <GoogleTagManager gtmId={env.GTM_ID} />
      <head>
        <PlausibleProvider revenue domain={env.BASE_URL.split('https://').at(1) || ''} />
      </head>
      <body>
        <div className="fixed bottom-0 top-0 w-full overflow-x-auto">
          <Providers>
            <div>
              <Suspense>
                <PopupHandler />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-11 w-full" />}>
                <InfoBanner />
              </Suspense>
              <Suspense>
                <Navbar />
              </Suspense>
              {/* <Suspense fallback={<Skeleton className="h-dvh max-h-dvh w-full" />}> */}
              <main>
                {children}
                {draftMode().isEnabled && <VisualEditing />}
                <Analytics />
              </main>
              {/* </Suspense> */}
            </div>
            <Suspense>
              <USP />
            </Suspense>
            <Suspense>
              <Footer />
            </Suspense>
            <ShopifyAnalytics hasConsent />
            {draftMode().isEnabled && <PreviewMarketSelector />}
          </Providers>
        </div>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const market = await getMarket();

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
