import { accordion } from '@/schema/documents/accordion';
import { accordionBlock } from '@/schema/documents/accordionBlock';
import { badge } from '@/schema/documents/badge';
import { card } from '@/schema/documents/card';
import { collection } from '@/schema/documents/collection';
import { color } from '@/schema/documents/color';
import { legalPage } from '@/schema/documents/legalPage';
import { page } from '@/schema/documents/page';
import { product } from '@/schema/documents/product';
import { productOption } from '@/schema/documents/productOption';
import { productOptionType } from '@/schema/documents/productOptionType';
import { productType } from '@/schema/documents/productType';
import { redirect } from '@/schema/documents/redirect';
import { tag } from '@/schema/documents/tag';
import { tagGroup } from '@/schema/documents/tagGroup';
import {
  alternativeText,
  bottomBorder,
  bottomPadding,
  figure,
  gallery,
  internalTitle,
  ogImage,
  padding,
  pageBuilder,
  title,
  topPadding
} from '@/schema/fields';
import { address } from '@/schema/objects/address';
import { collectionImage } from '@/schema/objects/collectionImage';
import { collectionProduct } from '@/schema/objects/collectionProduct';
import { featuredNavItem } from '@/schema/objects/featuredNavItem';
import { headingAndLinks } from '@/schema/objects/headingAndLinks';
import { link } from '@/schema/objects/link';
import { linkWithoutText } from '@/schema/objects/linkWithoutText';
import { media } from '@/schema/objects/media';
import { meganav } from '@/schema/objects/meganav';
import { metadata } from '@/schema/objects/metadata';
import { paymentProvider } from '@/schema/objects/paymentProvider';
import { productOptionConfig } from '@/schema/objects/productOptionConfig';
import { productVariant } from '@/schema/objects/productVariant';
import { richText } from '@/schema/objects/richText';
import { textBlock } from '@/schema/objects/textBlock';
import { usp } from '@/schema/objects/usp';
import { accordionSection } from '@/schema/pageBuilderBlocks/accordionSection';
import { cardGrid } from '@/schema/pageBuilderBlocks/cardGrid';
import { collectionListing } from '@/schema/pageBuilderBlocks/collectionListing';
import { contactForm } from '@/schema/pageBuilderBlocks/contactForm';
import { featuredProduct } from '@/schema/pageBuilderBlocks/featuredProduct';
import { hero } from '@/schema/pageBuilderBlocks/hero';
import { instagramFeed } from '@/schema/pageBuilderBlocks/instagramFeed';
import { pageTitle } from '@/schema/pageBuilderBlocks/pageTitle';
import { productLsting as productListing } from '@/schema/pageBuilderBlocks/productListing';
import { textAndImage } from '@/schema/pageBuilderBlocks/textAndImage';
import { textSection } from '@/schema/pageBuilderBlocks/textSection';
import { announcementBanner } from '@/schema/singletons/announcementBanner';
import { cookieConsent } from '@/schema/singletons/cookieConsent';
import { footer } from '@/schema/singletons/footer';
import { merchandising } from '@/schema/singletons/merchandising';
import { navbar } from '@/schema/singletons/navbar';
import { popup } from '@/schema/singletons/popup';
import { settingsPaymentProviders } from '@/schema/singletons/settingsPaymentProviders';
import { settingsSEOAndSocials } from '@/schema/singletons/settingsSEOAndSocials';
import { storeLocator } from '@/schema/singletons/storeLocator';
import { usps } from '@/schema/singletons/usps';
import { featureOptionConfig } from './objects/featureOptionConfig';
import { price } from './objects/price';
import { pageNotFound } from './singletons/pageNotFound';

const schema = [
  // Fields
  title,
  internalTitle,
  gallery,
  pageBuilder,
  figure,
  padding,
  topPadding,
  bottomPadding,
  bottomBorder,
  alternativeText,
  ogImage,

  // Objects
  address,
  richText,
  metadata,
  link,
  linkWithoutText,
  headingAndLinks,
  featuredNavItem,
  meganav,
  paymentProvider,
  collectionProduct,
  collectionImage,
  usp,
  featureOptionConfig,
  price,
  media,

  // Page builder blocks (objects)
  hero,
  featuredProduct,
  pageTitle,
  instagramFeed,
  contactForm,
  productListing,
  collectionListing,
  cardGrid,
  accordionSection,
  // Page builder blocks (documents)
  textAndImage,
  textSection,
  accordionBlock,

  // Product
  productType,
  product,
  productVariant,
  productOption,
  productOptionType,
  productOptionConfig,

  // Documents
  page,
  legalPage,
  color,
  collection,
  redirect,
  tag,
  tagGroup,
  accordion,
  textBlock,
  badge,
  card,

  // Singletons
  footer,
  navbar,
  announcementBanner,
  popup,
  cookieConsent,
  usps,
  merchandising,
  settingsSEOAndSocials,
  settingsPaymentProviders,
  storeLocator,
  pageNotFound
];

export default schema;
