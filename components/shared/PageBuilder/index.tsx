import { AccordionSection } from '@/components/shared/PageBuilder/AccordionSection';
import { CardGrid } from '@/components/shared/PageBuilder/CardGrid';
import { CollectionListing } from '@/components/shared/PageBuilder/CollectionListing';
import { ContactForm } from '@/components/shared/PageBuilder/ContactForm';
import { Hero } from '@/components/shared/PageBuilder/Hero';
import { InstagramFeed } from '@/components/shared/PageBuilder/InstagramFeed';
import { PageTitle } from '@/components/shared/PageBuilder/PageTitle';
import { ProductListing } from '@/components/shared/PageBuilder/ProductListing';
import { TextAndImage } from '@/components/shared/PageBuilder/TextAndImage';
import { TextSection } from '@/components/shared/PageBuilder/TextSection';
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks';
import { MarketValues } from '@/data/constants';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { ComponentType } from 'react';

type BlockType = {
  [key: string]: ComponentType<{ data: any }>;
};

const blockTypes: BlockType = {
  hero: Hero,
  textAndImage: TextAndImage,
  pageTitle: PageTitle,
  textSection: TextSection,
  accordionSection: AccordionSection,
  contactForm: ContactForm,
  instagramFeed: InstagramFeed,
  productListing: ProductListing,
  collectionListing: CollectionListing,
  cardGrid: CardGrid
};

interface Props {
  data: PageBuilderBlock;
  index: number;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  market?: MarketValues;
}

export const PageBuilder = ({ data, index, encodeDataAttribute, market }: Props) => {
  const { type } = data;

  const BlockType = blockTypes[type] || (() => null);

  return <BlockType data={{ ...data, index, encodeDataAttribute, market }} />;
};
