import { AnnouncementBanner } from '@/components/global/AnnouncementBanner';
import { Footer } from '@/components/global/Footer';
import { Navbar } from '@/components/global/Navbar';
import { PagePayload } from '@/components/pages/PageLayout/hooks';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { LangValues, MarketValues } from '@/data/constants';

export interface PageProps {
  data: PagePayload;
  market: MarketValues;
  lang: LangValues;
}

export function PageLayout({ data, market, lang }: PageProps) {
  return (
    <>
      {data?.showAnnouncementBanner && <AnnouncementBanner lang={lang} />}
      {data?.showNavbar && <Navbar market={market} lang={lang} />}
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
