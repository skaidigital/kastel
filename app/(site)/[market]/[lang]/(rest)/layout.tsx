import { Skeleton } from '@/components/Skeleton';
import { AnnouncementBanner } from '@/components/global/AnnouncementBanner';
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
      <Suspense fallback={<Skeleton className="h-11 w-full" />}>
        <AnnouncementBanner lang={lang} />
      </Suspense>
      <Suspense>{/* <Navbar market={market} lang={lang} /> */}</Suspense>
      {children}
      {/* <Footer market={market} lang={lang} /> */}
    </div>
  );
}
