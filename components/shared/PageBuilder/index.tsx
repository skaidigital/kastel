import { BlogPostSection } from '@/components/shared/PageBuilder/BlogPostSection';
import { CardSection } from '@/components/shared/PageBuilder/CardSection';
import { ContactForm } from '@/components/shared/PageBuilder/ContactForm';
import { FAQSection } from '@/components/shared/PageBuilder/FAQSection';
import { FeaturedCollection } from '@/components/shared/PageBuilder/FeaturedCollection';
import { Hero } from '@/components/shared/PageBuilder/Hero';
import { InstagramFeed } from '@/components/shared/PageBuilder/InstagramFeed';
import { PageTitle } from '@/components/shared/PageBuilder/PageTitle';
import { ProductListing } from '@/components/shared/PageBuilder/ProductListing';
import { ShoePicker } from '@/components/shared/PageBuilder/ShoePicker';
import { TextSection } from '@/components/shared/PageBuilder/TextSection';
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { ComponentType } from 'react';

type BlockType = {
  [key: string]: ComponentType<{ data: any }>;
};

const blockTypes: BlockType = {
  hero: Hero,
  // New blocks start
  featuredCollection: FeaturedCollection,
  cardSection: CardSection,
  blogPostSection: BlogPostSection,
  faqSection: FAQSection,
  shoePicker: ShoePicker,
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
