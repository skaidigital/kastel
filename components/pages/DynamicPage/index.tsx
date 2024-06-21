import { AnimatedAnnouncementBanner } from '@/components/AnimatedAnnouncementBanner';
import { AnimatedNavbar } from '@/components/AnimatedNavbar';
import { AnnouncementBanner } from '@/components/global/AnnouncementBanner';
import { Footer } from '@/components/global/Footer';
import { Navbar } from '@/components/global/Navbar';
import { PagePayload } from '@/components/pages/DynamicPage/hooks';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { LangValues, MarketValues } from '@/data/constants';

export interface PageProps {
  data: PagePayload;
  market: MarketValues;
  lang: LangValues;
}

export function DynamicPage({ data, market, lang }: PageProps) {
  return (
    <>
      {data?.showAnnouncementBanner && (
        <AnimatedAnnouncementBanner>
          <AnnouncementBanner lang={lang} />
        </AnimatedAnnouncementBanner>
      )}
      {data?.showNavbar && (
        <AnimatedNavbar hasAnnouncementBanner={data.showAnnouncementBanner}>
          <Navbar market={market} lang={lang} />
        </AnimatedNavbar>
      )}
      {data?.pageBuilder?.map((block, index: number) => (
        <PageBuilder
          key={block.key + index}
          data={block}
          index={index}
          market={market}
          lang={lang}
          pageId={data.id}
          pageType={data.type}
        />
      ))}
      {data?.showFooter && <Footer market={market} lang={lang} />}
    </>
  );
}
