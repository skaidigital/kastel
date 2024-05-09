import { env } from '@/env';
import PlausibleProvider from 'next-plausible';
import '../styles/globals.css';

// TODO figure out how to dynamically change lang
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <head>
        <PlausibleProvider revenue domain={env.BASE_URL.split('https://').at(1) || ''} />
      </head>
      <body className={`bg-white`}>{children}</body>
    </html>
  );
}
