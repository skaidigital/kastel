import Providers from '@/components/Providers';
import PreviewMarketSelector from '@/components/sanity/PreviewMarketSelector';
import { env } from '@/env';
import { loadDefaultMetadata } from '@/lib/sanity/getDefaultMetadata';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { ReactNode, Suspense } from 'react';

import { CartContextProvider } from '@/components/CartContext';
import ShopifyAnalytics from '@/components/ShopifyAnalytics';
import { MarketPopup } from '@/components/global/MarketPopup';
import { LangValues, MarketValues } from '@/data/constants';
import { GoogleTagManager } from '@next/third-parties/google';
import '../../../../styles/MyWebfontsKit.css';
import '../../../../styles/globals.css';

const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default function IndexRoute({
  children,
  params: { lang }
}: {
  children: ReactNode;
  params: { lang: LangValues };
}) {
  const isInProduction = process.env.NODE_ENV === 'production';

  return (
    <>
      {isInProduction && <GoogleTagManager gtmId={env.GTM_ID} />}
      <CartContextProvider>
        <Providers>
          <div>
            {/* <Suspense>
              <PopupHandler lang={lang} />
            </Suspense> */}
            <main>
              <Suspense>{children}</Suspense>
              {/* {draftMode().isEnabled && (
                <VisualEditing
                  refresh={async (payload) => {
                    'use server';
                    if (!draftMode().isEnabled) {
                      console.debug('Skipped manual refresh because draft mode is not enabled');
                      return;
                    }
                    if (payload.source === 'mutation') {
                      if (payload.document.slug?.current) {
                        const tag = `${payload.document._type}:${payload.document.slug.current}`;
                        await revalidateTag(tag);
                      }
                      return revalidateTag(payload.document._type);
                    }
                    await revalidatePath('/', 'layout');
                  }}
                />
              )} */}
              <Analytics />
            </main>
          </div>
          <ShopifyAnalytics hasConsent />
          <MarketPopup lang={lang} />
          {draftMode().isEnabled && <PreviewMarketSelector />}
          {/* <Suspense>
            <SmileLayout />
          </Suspense> */}
        </Providers>
      </CartContextProvider>
    </>
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
