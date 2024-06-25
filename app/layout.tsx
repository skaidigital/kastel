import { env } from '@/env'
import '@/lib/_suppressLogs'
import { GoogleTagManager } from '@next/third-parties/google'
import PlausibleProvider from 'next-plausible'
import Script from 'next/script'
import '../styles/globals.css'

// TODO figure out how to dynamically change lang
export default function Layout({ children }: { children: React.ReactNode }) {
  const isInProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="no">
      <head>
        <GoogleTagManager gtmId={env.GTM_ID} />
        <PlausibleProvider revenue domain={env.BASE_URL.split('https://').at(1) || ''} />
        {isInProduction && (
          <Script id="hotjar-snippet" strategy="afterInteractive">
            {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${env.HOTJAR_ID},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
          </Script>
        )}
      </head>
      <body className={`bg-white`}>{children}</body>
    </html>
  )
}
