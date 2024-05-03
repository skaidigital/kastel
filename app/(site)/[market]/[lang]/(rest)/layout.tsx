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

export default function Layout({ children, params: { market, lang } }: Props) {
  return (
    <div className="noTouch">
      <AnnouncementBanner lang={lang} className="!bg-brand-primary !text-white" />
      <Navbar market={market} lang={lang} className="border-b border-brand-light-grey" />
      {children}
      <LayoutUSPMarquee lang={lang} />
      <Footer market={market} lang={lang} />
    </div>
  );
}
