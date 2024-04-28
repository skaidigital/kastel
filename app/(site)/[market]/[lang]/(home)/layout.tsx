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

// TODO make height dependent on whether announcement banner is visible
// TODO show backdrop blur on navbar when you scroll down
export default function Layout({ children, params: { market, lang } }: Props) {
  return (
    <div>
      <Suspense>
        <AnnouncementBanner lang={lang} />
      </Suspense>
      <Suspense>
        <Navbar
          market={market}
          lang={lang}
          className="fixed inset-0 left-0 top-0 z-40 border-none bg-transparent text-white transition-colors duration-200 ease-in-out hover:border-none hover:bg-white/80 hover:text-brand-dark-grey hover:backdrop-blur-lg focus:bg-white/80 focus:text-brand-dark-grey focus:backdrop-blur-lg"
        />
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
