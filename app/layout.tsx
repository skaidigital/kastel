import { env } from '@/env';
import PlausibleProvider from 'next-plausible';
import Script from 'next/script';
import '../styles/globals.css';

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
      <body className="bg-white">{children}</body>
    </html>
  );
}
