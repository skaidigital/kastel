import { AnnouncementBanner } from '@/components/global/AnnouncementBanner';
import { Footer } from '@/components/global/Footer';
import { LayoutUSPMarquee } from '@/components/global/LayoutUSPMarquee';
import { Navbar } from '@/components/global/Navbar';
import { LangValues, MarketValues } from '@/data/constants';
import { ReactNode, Suspense } from 'react';

interface Props {
  params: {
    market: MarketValues;
    lang: LangValues;
  };
  children: ReactNode;
}

export default function Layout({ children, params: { market, lang } }: Props) {
  return (
    <div>
      <Suspense>
        <AnnouncementBanner lang={lang} />
      </Suspense>
      <Suspense>
        <Navbar market={market} lang={lang} />
      </Suspense>
      {children}
      <Suspense>
        <LayoutUSPMarquee lang={lang} />
      </Suspense>
      <Suspense>
        <Footer market={market} lang={lang} />
      </Suspense>
    </div>
  );
}
