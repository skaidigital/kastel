import { env } from '@/env';
import PlausibleProvider from 'next-plausible';
import localFont from 'next/font/local';
import Script from 'next/script';
import '../styles/globals.css';

const helveticaNeue = localFont({
  src: [
    {
      path: '../public/fonts/helvetica-neue-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/helvetica-neue-medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/helvetica-neue-bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-sans'
});

// TODO figure out how to dynamically change lang
export default function Layout({ children }: { children: React.ReactNode }) {
  const isInProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="no">
      <head>
        {isInProduction && (
          <Script
            strategy="lazyOnload"
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={env.COOKIE_BOT_DOMAIN_GROUP_ID}
            type="text/javascript"
          />
        )}
        <Script
          id="gorgias-chat-widget-install-v3"
          src={`https://config.gorgias.chat/bundle-loader/${env.GORGIAS_CHAT_ID}`}
          strategy="lazyOnload"
        />
        <PlausibleProvider revenue domain={env.BASE_URL.split('https://').at(1) || ''} />
      </head>
      <body className={`bg-white ${helveticaNeue.className}`}>{children}</body>
    </html>
  );
}
