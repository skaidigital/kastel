import { BlogPostSection } from '@/components/shared/PageBuilder/BlogPostSection';
import { CardSection } from '@/components/shared/PageBuilder/CardSection';
import { EmailCapture } from '@/components/shared/PageBuilder/EmailCapture';
import { FAQSection } from '@/components/shared/PageBuilder/FAQSection';
import { FeaturedCollectionSection } from '@/components/shared/PageBuilder/FeaturedCollectionSection';
import { FeaturedShoeSection } from '@/components/shared/PageBuilder/FeaturedShoeSection';
import { FullBleedMediaSection } from '@/components/shared/PageBuilder/FullBleedMediaSection';
import { Hero } from '@/components/shared/PageBuilder/Hero';
import { KastelClubSection } from '@/components/shared/PageBuilder/KastelClubSection';
import { NatureLabExplainerSection } from '@/components/shared/PageBuilder/NatureLabExplainerSection';
import { NatureLabInnovationSection } from '@/components/shared/PageBuilder/NatureLabInnovationSection';
import { ShoePickerSection } from '@/components/shared/PageBuilder/ShoePickerSection';
import { ShopOurModelsSection } from '@/components/shared/PageBuilder/ShopOurModelsSection';
import { TimelineSection } from '@/components/shared/PageBuilder/TimelineSection';
import { UGCSection } from '@/components/shared/PageBuilder/UGCSection';
import { USPExplainerSection } from '@/components/shared/PageBuilder/USPExplainerSection';
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { ComponentType } from 'react';

type BlockType = {
  [key: string]: ComponentType<{ data: any }>;
};

const blockTypes: BlockType = {
  featuredCollectionSection: FeaturedCollectionSection,
  cardSection: CardSection,
  blogPostSection: BlogPostSection,
  faqSection: FAQSection,
  shoePicker: ShoePickerSection,
  ugcSection: UGCSection,
  kastelClubSection: KastelClubSection,
  natureLabExplainerSection: NatureLabExplainerSection,
  shopOurModelsSection: ShopOurModelsSection,
  featuredShoeSection: FeaturedShoeSection,
  hero: Hero,
  uspExplainerSection: USPExplainerSection,
  natureLabInnovationSection: NatureLabInnovationSection,
  emailCapture: EmailCapture,
  timelineSection: TimelineSection,
  fullBleedMediaSection: FullBleedMediaSection
};

interface Props {
  data: PageBuilderBlock;
  index: number;
  market: MarketValues;
  lang: LangValues;
  pageId: string;
  pageType: string;
}

export const PageBuilder = ({ data, index, market, lang, pageId, pageType }: Props) => {
  const { type } = data;

  const BlockType = blockTypes[type] || (() => null);

  return <BlockType data={{ ...data, index, market, lang, pageId, pageType }} />;
};
