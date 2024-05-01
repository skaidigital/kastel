import { AnimatedNavbar } from '@/components/AnimatedNavbar';
import { AnnouncementBanner } from '@/components/global/AnnouncementBanner';
import { Footer } from '@/components/global/Footer';
import { LayoutUSPMarquee } from '@/components/global/LayoutUSPMarquee';
import { Navbar } from '@/components/global/Navbar';
import { LangValues, MarketValues } from '@/data/constants';
import { ReactNode } from 'react';

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
      <AnnouncementBanner lang={lang} />
      <AnimatedNavbar hasAnnouncementBanner={true}>
        <Navbar market={market} lang={lang} />
      </AnimatedNavbar>
      {children}
      <LayoutUSPMarquee lang={lang} />
      <Footer market={market} lang={lang} />
    </div>
  );
}
