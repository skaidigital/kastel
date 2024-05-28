import { kastelClubBlock } from '@/components/shared/PageBuilder/kastelClubBlock';
import { natureLabExplainerBlock } from '@/components/shared/PageBuilder/natureLabExplainerBlock';
import { badge } from '@/schema/documents/badge';
import { blogPost } from '@/schema/documents/blogPost';
import { blogPostReccommendedBlogPosts } from '@/schema/documents/blogPost/posts';
import { collection } from '@/schema/documents/collection';
import { color } from '@/schema/documents/color';
import { faqBlock } from '@/schema/documents/faqBlock';
import { hotspotImage } from '@/schema/documents/hotspotImage';
import { legalPage } from '@/schema/documents/legalPage';
import { natureLabInnovationItem } from '@/schema/documents/natureLabInnovationItem';
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
import { retailer } from '@/schema/documents/retailer';
import { sizeChart } from '@/schema/documents/sizeChart';
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
  mainCategory,
  marketAvailability,
  ogImage,
  padding,
  pageBuilder,
  title,
  topPadding,
  videoSettings
} from '@/schema/fields';
import { address } from '@/schema/objects/address';
import { aspectRatioSettings } from '@/schema/objects/aspectRatioSettings';
import { blogPostText } from '@/schema/objects/blogPostText';
import { buttonSettings } from '@/schema/objects/buttonSettings';
import { card } from '@/schema/objects/card';
import { cardBlock } from '@/schema/objects/cardBlock';
import { collectionImage } from '@/schema/objects/collectionImage';
import { collectionProduct } from '@/schema/objects/collectionProduct';
import { conditionalLink } from '@/schema/objects/conditionalLink';
import { featuredCollectionSection } from '@/schema/objects/featuredCollectionSection';
import { featuredNavItem } from '@/schema/objects/featuredNavItem';
import { featuredShoeSection } from '@/schema/objects/featuredShoeSection';
import { fullBleedMediaBlock } from '@/schema/objects/fullBleedMediaBlock';
import { headingAndLinks } from '@/schema/objects/headingAndLinks';
import { kastelClubSection } from '@/schema/objects/kastelClubSection';
import { legalPageText } from '@/schema/objects/legalPageText';
import { link } from '@/schema/objects/link';
import { linkWithoutText } from '@/schema/objects/linkWithoutText';
import { media } from '@/schema/objects/media';
import { meganav } from '@/schema/objects/meganav';
import { metadata } from '@/schema/objects/metadata';
import { natureLabExplainerSection } from '@/schema/objects/natureLabExplainerSection';
import { natureLabProductStatusItem } from '@/schema/objects/natureLabProductStatusItem';
import { paymentProvider } from '@/schema/objects/paymentProvider';
import { productDisplay } from '@/schema/objects/productDisplay';
import { productOptionConfig } from '@/schema/objects/productOptionConfig';
import { productVariant } from '@/schema/objects/productVariant';
import { reccommendedBlogPosts } from '@/schema/objects/reccommendedBlogPosts';
import { richText } from '@/schema/objects/richText';
import { richTextNatureLab } from '@/schema/objects/richTextNatureLab';
import { sectionSettings } from '@/schema/objects/sectionSettings';
import { shoePickerSection } from '@/schema/objects/shoePickerSection';
import { shopOurModelsSection } from '@/schema/objects/shopOurModelsSection';
import { spot } from '@/schema/objects/spot';
import { timelineItem } from '@/schema/objects/timelineItem';
import { timelineSection } from '@/schema/objects/timelineSection';
import { ugcSection } from '@/schema/objects/ugcSection';
import { updateItem } from '@/schema/objects/updateItem';
import { uspExplainerSection } from '@/schema/objects/uspExplainerSection';
import { variableText } from '@/schema/objects/variableText';
import { youtubeEmbed } from '@/schema/objects/youtubeEmbed';
import { blogPostSection } from '@/schema/pageBuilderBlocks/blogPostSection';
import { cardSection } from '@/schema/pageBuilderBlocks/cardSection';
import { emailCapture } from '@/schema/pageBuilderBlocks/emailCapture';
import { faqSection } from '@/schema/pageBuilderBlocks/faqSection';
import { featuredCollectionBlock } from '@/schema/pageBuilderBlocks/featuredCollectionBlock';
import { featuredShoeBlock } from '@/schema/pageBuilderBlocks/featuredShoeBlock';
import { fullBleedMediaSection } from '@/schema/pageBuilderBlocks/fullBleedMediaSection';
import { hero } from '@/schema/pageBuilderBlocks/hero';
import { meetTheTeamSection } from '@/schema/pageBuilderBlocks/meetTheTeamSection';
import { natureLabInnovationSection } from '@/schema/pageBuilderBlocks/natureLabInnovationSection';
import { pageTitle } from '@/schema/pageBuilderBlocks/pageTitle';
import { shoePickerBlock } from '@/schema/pageBuilderBlocks/shoePickerBlock';
import { shopOurModelsBlock } from '@/schema/pageBuilderBlocks/shopOurModelsBlock';
import { siteReviews } from '@/schema/pageBuilderBlocks/siteReviews';
import { timelineBlock } from '@/schema/pageBuilderBlocks/timelineBlock';
import { ugcBlock } from '@/schema/pageBuilderBlocks/ugcBlock';
import { uspExplainerBlock } from '@/schema/pageBuilderBlocks/uspExplainerBlock';
import { aboutPage } from '@/schema/singletons/aboutPage';
import { accountPage } from '@/schema/singletons/accountPage';
import { announcementBanner } from '@/schema/singletons/announcementBanner';
import { blogLandingPage } from '@/schema/singletons/blogLandingPage';
import { footer } from '@/schema/singletons/footer';
import { helpCenter } from '@/schema/singletons/helpCenter';
import { kastelClubPage } from '@/schema/singletons/kastelClubPage';
import { kastelClubPageSectionItem } from '@/schema/singletons/kastelClubPage/item';
import { kastelClubPageSection } from '@/schema/singletons/kastelClubPage/section';
import { layoutUspMarquee } from '@/schema/singletons/layoutUspMarquee';
import { merchandising } from '@/schema/singletons/merchandising';
import { navbar } from '@/schema/singletons/navbar';
import { popup } from '@/schema/singletons/popup';
import { productSettings } from '@/schema/singletons/productSettings';
import { retailersPage } from '@/schema/singletons/retailersPage';
import { settingsPaymentProviders } from '@/schema/singletons/settingsPaymentProviders';
import { settingsSEOAndSocials } from '@/schema/singletons/settingsSEOAndSocials';
import { usps } from '@/schema/singletons/usps';
import { featureOptionConfig } from './objects/featureOptionConfig';
import { price } from './objects/price';
import { filters } from './singletons/filters';
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
  marketAvailability,
  videoSettings,

  // Objects
  address,
  kastelClubPageSection,
  kastelClubPageSectionItem,
  blogPostReccommendedBlogPosts,
  variableText,
  legalPageText,
  blogPostText,
  richText,
  richTextNatureLab,
  updateItem,
  timelineItem,
  youtubeEmbed,
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
  aspectRatioSettings,
  sectionSettings,
  natureLabProductStatusItem,
  card,
  conditionalLink,
  buttonSettings,
  reccommendedBlogPosts,

  // Other
  mainCategory,

  // Page builder blocks (objects)
  faqSection,
  blogPostSection,
  featuredCollectionSection,
  emailCapture,
  siteReviews,
  natureLabInnovationSection,
  cardSection,
  shoePickerSection,
  timelineSection,
  ugcSection,
  kastelClubSection,
  natureLabExplainerSection,
  shopOurModelsSection,
  featuredShoeSection,
  hero,
  uspExplainerSection,
  fullBleedMediaSection,
  pageTitle,
  meetTheTeamSection,
  // Page builder blocks (documents)
  faqBlock,
  ugcBlock,
  kastelClubBlock,
  shopOurModelsBlock,
  natureLabExplainerBlock,
  featuredCollectionBlock,
  timelineBlock,
  shoePickerBlock,
  featuredShoeBlock,
  uspExplainerBlock,
  cardBlock,
  fullBleedMediaBlock,

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
  natureLabInnovationItem,

  // Documents
  sizeChart,
  page,
  legalPage,
  color,
  collection,
  redirect,
  tag,
  tagGroup,
  question,
  badge,
  usp,
  blogPost,
  person,
  quote,
  hotspotImage,
  retailer,

  // Singletons
  aboutPage,
  kastelClubPage,
  footer,
  filters,
  navbar,
  accountPage,
  blogLandingPage,
  announcementBanner,
  popup,
  usps,
  helpCenter,
  merchandising,
  settingsSEOAndSocials,
  settingsPaymentProviders,
  layoutUspMarquee,
  pageNotFound,
  productSettings,
  retailersPage
];

export default schema;
