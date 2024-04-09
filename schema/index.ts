import { kastelClub } from '@/components/shared/PageBuilder/kastelClub';
import { natureLabExplainer } from '@/components/shared/PageBuilder/natureLabExplainer';
import { uspExplainer } from '@/components/shared/PageBuilder/uspExplainer';
import { badge } from '@/schema/documents/badge';
import { blogPost } from '@/schema/documents/blogPost';
import { collection } from '@/schema/documents/collection';
import { color } from '@/schema/documents/color';
import { faqBlock } from '@/schema/documents/faqBlock';
import { legalPage } from '@/schema/documents/legalPage';
import { natureLabLandingPage } from '@/schema/documents/natureLabLandingPage';
import { natureLabSettings } from '@/schema/documents/natureLabSettings';
import { page } from '@/schema/documents/page';
import { person } from '@/schema/documents/person';
import { phase1BlogPost } from '@/schema/documents/phase1BlogPost';
import { phase2Product } from '@/schema/documents/phase2Product';
import { phase3BlogPost } from '@/schema/documents/phase3BlogPost';
import { product } from '@/schema/documents/product';
import { productOption } from '@/schema/documents/productOption';
import { productOptionType } from '@/schema/documents/productOptionType';
import { productType } from '@/schema/documents/productType';
import { question } from '@/schema/documents/question';
import { quote } from '@/schema/documents/quote';
import { redirect } from '@/schema/documents/redirect';
import { tag } from '@/schema/documents/tag';
import { tagGroup } from '@/schema/documents/tagGroup';
import { usp } from '@/schema/documents/usp';
import {
  alternativeText,
  blogWidthSettings,
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
import { aspectRatioSettings } from '@/schema/objects/aspectRatioSettings';
import { collectionImage } from '@/schema/objects/collectionImage';
import { collectionProduct } from '@/schema/objects/collectionProduct';
import { featuredNavItem } from '@/schema/objects/featuredNavItem';
import { headingAndLinks } from '@/schema/objects/headingAndLinks';
import { hotspotImage } from '@/schema/objects/hotspotImage';
import { link } from '@/schema/objects/link';
import { linkWithoutText } from '@/schema/objects/linkWithoutText';
import { media } from '@/schema/objects/media';
import { meganav } from '@/schema/objects/meganav';
import { metadata } from '@/schema/objects/metadata';
import { paymentProvider } from '@/schema/objects/paymentProvider';
import { productDescription } from '@/schema/objects/productDescription';
import { productDisplay } from '@/schema/objects/productDisplay';
import { productOptionConfig } from '@/schema/objects/productOptionConfig';
import { productVariant } from '@/schema/objects/productVariant';
import { richText } from '@/schema/objects/richText';
import { sectionSettings } from '@/schema/objects/sectionSettings';
import { spot } from '@/schema/objects/spot';
import { textBlock } from '@/schema/objects/textBlock';
import { ugcs } from '@/schema/pageBuilderBlocks/UGCSection';
import { blogPosts } from '@/schema/pageBuilderBlocks/blogPosts';
import { cardSection } from '@/schema/pageBuilderBlocks/cardSection';
import { contactForm } from '@/schema/pageBuilderBlocks/contactForm';
import { emailCapture } from '@/schema/pageBuilderBlocks/emailCapture';
import { faqSection } from '@/schema/pageBuilderBlocks/faqSection';
import { featuredCollection } from '@/schema/pageBuilderBlocks/featuredCollection';
import { featuredShoe } from '@/schema/pageBuilderBlocks/featuredShoe';
import { hero } from '@/schema/pageBuilderBlocks/hero';
import { instagramFeed } from '@/schema/pageBuilderBlocks/instagramFeed';
import { pageTitle } from '@/schema/pageBuilderBlocks/pageTitle';
import { shoePicker } from '@/schema/pageBuilderBlocks/shoePicker';
import { shopOurModels } from '@/schema/pageBuilderBlocks/shopOurModels';
import { textSection } from '@/schema/pageBuilderBlocks/textSection';
import { accountPage } from '@/schema/singletons/accountPage';
import { announcementBanner } from '@/schema/singletons/announcementBanner';
import { cookieConsent } from '@/schema/singletons/cookieConsent';
import { footer } from '@/schema/singletons/footer';
import { helpCenter } from '@/schema/singletons/helpCenter';
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
  blogWidthSettings,

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
  featureOptionConfig,
  price,
  media,
  productDisplay,
  spot,
  productDescription,
  aspectRatioSettings,
  sectionSettings,
  hotspotImage,

  // Page builder blocks (objects)
  hero,
  pageTitle,
  instagramFeed,
  contactForm,
  faqSection,
  blogPosts,
  featuredCollection,
  emailCapture,
  // Page builder blocks (documents)
  textSection,
  faqBlock,
  ugcs,
  cardSection,
  kastelClub,
  shopOurModels,
  natureLabExplainer,
  shoePicker,
  featuredShoe,
  uspExplainer,

  // Product
  productType,
  product,
  productVariant,
  productOption,
  productOptionType,
  productOptionConfig,

  // Nature Lab
  natureLabLandingPage,
  natureLabSettings,
  phase1BlogPost,
  phase2Product,
  phase3BlogPost,

  // Documents
  page,
  legalPage,
  color,
  collection,
  redirect,
  tag,
  tagGroup,
  question,
  textBlock,
  badge,
  usp,
  blogPost,
  person,
  quote,

  // Singletons
  footer,
  navbar,
  accountPage,
  announcementBanner,
  popup,
  cookieConsent,
  usps,
  helpCenter,
  merchandising,
  settingsSEOAndSocials,
  settingsPaymentProviders,
  storeLocator,
  pageNotFound
];

export default schema;
