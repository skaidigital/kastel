import { BlogPostSection } from '@/components/shared/PageBuilder/BlogPostSection';
import { CardSection } from '@/components/shared/PageBuilder/CardSection';
import { ContactForm } from '@/components/shared/PageBuilder/ContactForm';
import { FAQSection } from '@/components/shared/PageBuilder/FAQSection';
import { FeaturedCollection } from '@/components/shared/PageBuilder/FeaturedCollection';
import { FeaturedShoeSection } from '@/components/shared/PageBuilder/FeaturedShoeSection';
import { Hero } from '@/components/shared/PageBuilder/Hero';
import { InstagramFeed } from '@/components/shared/PageBuilder/InstagramFeed';
import { KastelClubSection } from '@/components/shared/PageBuilder/KastelClubSection';
import { NatureLabExplainerSection } from '@/components/shared/PageBuilder/NatureLabExplainerSection';
import { PageTitle } from '@/components/shared/PageBuilder/PageTitle';
import { ProductListing } from '@/components/shared/PageBuilder/ProductListing';
import { ShoePickerSection } from '@/components/shared/PageBuilder/ShoePickerSection';
import { ShopOurModelsSection } from '@/components/shared/PageBuilder/ShopOurModelsSection';
import { TextSection } from '@/components/shared/PageBuilder/TextSection';
import { UGCSection } from '@/components/shared/PageBuilder/UGCSection';
import { USPExplainerSection } from '@/components/shared/PageBuilder/USPExplainerSection';
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { ComponentType } from 'react';

type BlockType = {
  [key: string]: ComponentType<{ data: any }>;
};

const blockTypes: BlockType = {
  // New blocks start
  featuredCollection: FeaturedCollection,
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
  // New blocks end
  pageTitle: PageTitle,
  textSection: TextSection,
  contactForm: ContactForm,
  instagramFeed: InstagramFeed,
  productListing: ProductListing
};

interface Props {
  data: PageBuilderBlock;
  index: number;
  market: MarketValues;
  lang: LangValues;
}

export const PageBuilder = ({ data, index, market, lang }: Props) => {
  const { type } = data;

  const BlockType = blockTypes[type] || (() => null);

  return <BlockType data={{ ...data, index, market, lang }} />;
};
