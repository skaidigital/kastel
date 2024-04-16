import { LangValues, MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import {
  aspectRatioSettingsValidator,
  conditionalLinkValidator,
  imageValidator,
  linkToValidator,
  mediaValidator,
  portableTextValidator,
  productCardValidator,
  richTextValidator
} from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const paddingValidator = z.union([z.literal('sm'), z.literal('md'), z.literal('lg')]);

export const sectionSettingsValidator = z.object({
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
});

const linkExternalValidator = z.object({
  hasLink: z.literal(true),
  linkType: z.literal('external'),
  text: z.string(),
  href: z.string().url(),
  openInNewTab: z.boolean()
});

const linkInternalValidator = z.object({
  hasLink: z.literal(true),
  linkType: z.literal('internal'),
  text: z.string(),
  linkTo: linkToValidator
});

const hasLinkValidator = z.discriminatedUnion('linkType', [
  linkExternalValidator,
  linkInternalValidator
]);

const doesNotHaveLinkValidator = z.object({
  hasLink: z.literal(false)
});

const linkValidator = z.union([hasLinkValidator, doesNotHaveLinkValidator]);

export type HeroLinkProps = z.infer<typeof linkValidator>;

const heroValidator = z.object({
  type: z.literal('hero'),
  key: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  link: linkValidator,
  textPositionMobile: z.union([
    z.literal('top-left'),
    z.literal('top-center'),
    z.literal('top-right'),
    z.literal('center-left'),
    z.literal('center'),
    z.literal('center-right'),
    z.literal('bottom-left'),
    z.literal('bottom-center'),
    z.literal('bottom-right')
  ]),
  textPositionDesktop: z.union([
    z.literal('top-left'),
    z.literal('top-center'),
    z.literal('top-right'),
    z.literal('center-left'),
    z.literal('center'),
    z.literal('center-right'),
    z.literal('bottom-left'),
    z.literal('bottom-center'),
    z.literal('bottom-right')
  ]),
  imageOrVideo: z.union([z.literal('image'), z.literal('video')]),
  aspectRatioDesktop: z.union([z.literal('16:9'), z.literal('4:3'), z.literal('21:9')]),
  aspectRatioMobile: z.union([z.literal('9:16'), z.literal('3:4')]),
  videoUrlMobile: z.string().optional(),
  videoUrlDesktop: z.string().optional(),
  imageMobile: imageValidator.optional(),
  imageDesktop: imageValidator.optional()
});

// New validators start

const featuredCollectionValidator = z.object({
  type: z.literal('featuredCollection'),
  key: z.string(),
  title: z.string(),
  description: z.string(),
  media: mediaValidator,
  products: z.array(productCardValidator),
  buttonText: z.string(),
  slug: z.string(),
  sectionSettings: sectionSettingsValidator
});

const cardSectionValidator = z.object({
  type: z.literal('cardSection'),
  key: z.string(),
  cards: z.array(
    z.object({
      link: conditionalLinkValidator,
      media: mediaValidator
    })
  ),
  aspectRatioSettings: aspectRatioSettingsValidator,
  sectionSettings: sectionSettingsValidator
});

const blogPostValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  readLength: z.number(),
  image: imageValidator
});

const blogPostSectionValidator = z.object({
  type: z.literal('blogPostSection'),
  key: z.string(),
  title: z.string(),
  buttonText: z.string(),
  posts: z.array(blogPostValidator),
  sectionSettings: sectionSettingsValidator
});

const FAQSectionValidator = z.object({
  type: z.literal('faqSection'),
  key: z.string(),
  title: z.string(),
  description: z.string().optional(),
  badge: z.string().optional(),
  items: z.array(
    z.object({
      question: z.string(),
      answer: portableTextValidator
    })
  ),
  sectionSettings: sectionSettingsValidator
});

const shoePickerValidator = z.object({
  type: z.literal('shoePicker'),
  key: z.string(),
  title: z.string(),
  types: z.array(
    z.object({
      title: z.string(),
      items: z.array(z.union([mediaValidator, productCardValidator]))
    })
  ),
  sectionSettings: sectionSettingsValidator
});

const ugcSectionValidator = z.object({
  type: z.literal('ugcSection'),
  key: z.string(),
  videos: z.array(z.string()),
  sectionSettings: sectionSettingsValidator
});

const kastelClubStepValidator = z.object({
  titleFront: z.string(),
  descriptionFront: z.string(),
  linkText: z.string(),
  titleBack: z.string(),
  descriptionBack: z.string()
});

const kastelClubSectionValidator = z.object({
  type: z.literal('kastelClubSection'),
  key: z.string(),
  backgroundImage: imageValidator,
  title: z.string(),
  description: z.string().optional(),
  buttonText: z.string(),
  steps: z.array(kastelClubStepValidator),
  sectionSettings: sectionSettingsValidator
});

// New validators end

const textAndImageValidator = z.object({
  type: z.literal('textAndImage'),
  key: z.string(),
  richText: z.array(richTextValidator),
  image: imageValidator,
  imageLeftOrRight: z.union([z.literal('left'), z.literal('right')]),
  size: z.union([z.literal('fullWidth'), z.literal('contained')]),
  textPlacement: z.union([z.literal('top'), z.literal('center'), z.literal('bottom')]),
  hasBottomBorder: z.boolean(),
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean()
});

const pageTitleValidator = z.object({
  type: z.literal('pageTitle'),
  key: z.string(),
  title: z.string(),
  subtitle: z.string().optional()
});

const textSectionValidator = z.object({
  type: z.literal('textSection'),
  key: z.string(),
  richText: z.array(richTextValidator),
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
});

const accordionSectionValidator = z.object({
  type: z.literal('accordionSection'),
  key: z.string(),
  title: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      richText: portableTextValidator
    })
  ),
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
});

const contactFormValidator = z.object({
  type: z.literal('contactForm'),
  key: z.string(),
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean(),
  market: z.union([z.literal('no'), z.literal('eu')]).optional()
});

const instagramFeedValidator = z.object({
  type: z.literal('instagramFeed'),
  key: z.string()
});

const productListingValidator = z.object({
  type: z.literal('productListing'),
  key: z.string(),
  title: z.string(),
  products: z.array(productCardValidator),
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
});

const collectionListingValidator = z.object({
  type: z.literal('collectionListing'),
  key: z.string(),
  title: z.string(),
  collections: z.array(
    z.object({
      image: imageValidator,
      collection: z.object({
        type: z.literal('collection'),
        slug: z.string(),
        title: z.string()
      })
    })
  ),
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
});

const cardBaseValidator = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  link: linkValidator,
  textPositionMobile: z.union([
    z.literal('top-left'),
    z.literal('top-center'),
    z.literal('top-right'),
    z.literal('center-left'),
    z.literal('center'),
    z.literal('center-right'),
    z.literal('bottom-left'),
    z.literal('bottom-center'),
    z.literal('bottom-right')
  ]),
  textPositionDesktop: z.union([
    z.literal('top-left'),
    z.literal('top-center'),
    z.literal('top-right'),
    z.literal('center-left'),
    z.literal('center'),
    z.literal('center-right'),
    z.literal('bottom-left'),
    z.literal('bottom-center'),
    z.literal('bottom-right')
  ])
});

const imageCardValidator = z.object({
  type: z.literal('image'),
  image: imageValidator
});

const videoCardValidator = z.object({
  type: z.literal('video'),
  video: z.string()
});

export const cardValidator = z.discriminatedUnion('type', [
  cardBaseValidator.merge(imageCardValidator),
  cardBaseValidator.merge(videoCardValidator)
]);

export type CardProps = z.infer<typeof cardValidator>;

export const pageBuilderBlockValidator = z.discriminatedUnion('type', [
  heroValidator,
  // New blocks start
  featuredCollectionValidator,
  cardSectionValidator,
  blogPostSectionValidator,
  FAQSectionValidator,
  shoePickerValidator,
  ugcSectionValidator,
  kastelClubSectionValidator,
  // New blocks end
  textAndImageValidator,
  pageTitleValidator,
  textSectionValidator,
  accordionSectionValidator,
  productListingValidator,
  collectionListingValidator,
  contactFormValidator,
  instagramFeedValidator
]);

export const pageBuilderValidator = z.array(pageBuilderBlockValidator);

export type HeroProps = z.infer<typeof heroValidator>;
// Start new validators
export type FeaturedCollectionProps = z.infer<typeof featuredCollectionValidator>;
export type CardSectionProps = z.infer<typeof cardSectionValidator>;
export type BlogPostProps = z.infer<typeof blogPostValidator>;
export type BlogPostSectionProps = z.infer<typeof blogPostSectionValidator>;
export type FAQSectionProps = z.infer<typeof FAQSectionValidator>;
export type ShoePickerProps = z.infer<typeof shoePickerValidator>;
export type UGCSectionProps = z.infer<typeof ugcSectionValidator>;
export type KastelClubStepProps = z.infer<typeof kastelClubStepValidator>;
export type KastelClubSectionProps = z.infer<typeof kastelClubSectionValidator>;

// End new validator
export type TextAndImageProps = z.infer<typeof textAndImageValidator>;
export type PageTitleProps = z.infer<typeof pageTitleValidator>;
export type TextSectionProps = z.infer<typeof textSectionValidator>;
export type ProductListingProps = z.infer<typeof productListingValidator>;
export type CollectionListingProps = z.infer<typeof collectionListingValidator>;
export type PageBuilderBlock = z.infer<typeof pageBuilderBlockValidator>;
export type PageBuilder = z.infer<typeof pageBuilderValidator>;
export type AccordionSectionProps = z.infer<typeof accordionSectionValidator>;
export type ContactFormProps = z.infer<typeof contactFormValidator>;

export const PAGE_BUILDER_TYPES: {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (lang: LangValues) => string;
} = {
  hero: (lang) => `
    ${fragments.base},
    "title": title.${lang}, 
    "subtitle": subtitle.${lang}, 
    link{
      ${fragments.getLinkHero(lang)}
    },
    textPositionMobile,
    textPositionDesktop,
    imageOrVideo,
    aspectRatioDesktop,
    aspectRatioMobile,
    "videoUrlMobile": videoMobile.asset->.playbackId,
    "videoUrlDesktop": videoDesktop.asset->.playbackId,
    imageMobile{
      ${fragments.getImageBase(lang)},
    },
    imageDesktop{
      ${fragments.getImageBase(lang)},
    }
  `,
  featuredCollection: (lang) => `
    ${fragments.base},
    ...collection->{
      "title": title.${lang},
      "description": descriptionShort.${lang},
      "slug": "/collections/"+slug_${lang}.current
    },
    "products": select(
      isManual == true => products[]->{
        ${fragments.getProductCard(lang)}
      },
      isManual == false => collection->.products[].product->{
        ${fragments.getProductCard(lang)},
      }
    ),
    media{
     ${fragments.getMedia(lang)}
    },
    "buttonText": buttonText.${lang},
    sectionSettings{
      ${fragments.sectionSettings}
    }
  `,
  cardSection: (lang) => groq`
    ${fragments.base},
    ...cardBlock->{
      "cards": cards[]{
        "link": link{
          ${fragments.getConditionalLink(lang)}
        },
        "media": media{
          ${fragments.getMedia(lang)}
        }
      },
      aspectRatioSettings{
        ${fragments.aspectRatioSettings}
      },
    },
    sectionSettings{
      ${fragments.sectionSettings}
    }
  `,
  blogPostSection: (lang) => groq`
    ${fragments.base},
    "title": title.${lang},
    "buttonText": buttonText.${lang},
    "posts": select(
      type == "mostRecent" => *[_type == "blogPost" && defined(slug_${lang}.current)][0..2] | order(publishedAt desc){
        ${fragments.getBlogPostCard(lang)}
      },
      type == "selected" => posts[]->{
        ${fragments.getBlogPostCard(lang)}
      }
    ),
    sectionSettings{
      ${fragments.sectionSettings}
    }
  `,
  faqSection: (lang) => groq`
    ${fragments.base},
    ...faqs->{
    "title": title.${lang},
    "description": description.${lang},
    "badge": badge->title.${lang},
    "items": items[]->{
      "question": question.${lang},
      "answer": answer_${lang}
     },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  shoePicker: (lang) => groq`
    ${fragments.base},
    ...shoePickerBlock->{
      "title": title.${lang},
      "types": types[]{
        "title": title.${lang},
        "items": items[]{
          _type == "media" => {
            ${fragments.getMedia(lang)}
          },
          _type == "reference" => {
            ...@->{
              ${fragments.getProductCard(lang)}
            }
          },
        },
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  ugcSection: (lang) => groq`
    ${fragments.base},
    ...ugcBlock->{
      "videos": videos[].asset->.playbackId,
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  kastelClubSection: (lang) => groq`
    ${fragments.base},
    ...kastelClubBlock->{
      "title": title.${lang},
      "description": description.${lang},
      "buttonText": buttonText.${lang},
      backgroundImage{
        ${fragments.getImageBase(lang)}
      },
      "lang": lang,
      steps[]{
        "titleFront": titleFront.${lang},
        "descriptionFront": descriptionFront.${lang},
        "linkText": linkText.${lang},
        "titleBack": titleBack.${lang},
        "descriptionBack": descriptionBack.${lang}
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  pageTitle: (market) => `
    ${fragments.base},
    "title": title.${market},
    "subtitle": subtitle.${market}
  `,
  textSection: (market) => `
    ${fragments.base},
    "richText": textBlock->.${fragments.getRichText({ lang: market })},
    padding,
    hasTopPadding,
    hasBottomPadding,
    hasBottomBorder
  `,
  textAndImage: (market) => `
    ${fragments.base},
    ...@->{
      "richText": ${fragments.getRichText({ lang: market })},
      image{
        ${fragments.getImageBase(market)}
      },
      imageLeftOrRight,
      size,
      textPlacement,
      hasBottomBorder,
      padding,
      hasTopPadding,
      hasBottomPadding
    }
  `,
  accordionSection: (market) => `
   ${fragments.base},
   ...accordionBlock->{
    "title": title_${market},
    items[]->{
      "title": title_${market},
      "richText": ${fragments.getRichText({ lang: market })}
     },
    },
    padding,
    hasTopPadding,
    hasBottomPadding,
    hasBottomBorder
   `,
  productListing: (market) => `
   ${fragments.base},
    "title": title.${market},
    "products": products[]->{
      ${fragments.getProductCard(market)},
    },
    padding,
    hasTopPadding,
    hasBottomPadding,
    hasBottomBorder
  `,
  collectionListing: (market) => `
  ${fragments.base},
   "title": title.${market},
   "collections": collections[]{
      image{
        ${fragments.getImageBase(market)}
      },
      "collection": collection->{
        "type": _type,
        "title": title_${market},
        ${fragments.getSlug(market)},
      }
   },
   padding,
   hasTopPadding,
   hasBottomPadding,
   hasBottomBorder
 `,
  contactForm: () => `
    ${fragments.base},
    padding,
    hasTopPadding,
    hasBottomPadding,
    hasBottomBorder
  `,
  instagramFeed: () => `
  ${fragments.base},
`
};

export const concatenatePageBuilderQueries = ({
  market,
  lang
}: {
  market: MarketValues;
  lang: LangValues;
}) => {
  const keys = Object.keys(PAGE_BUILDER_TYPES);

  const queryStrings = keys.map((key: string) => {
    const pageBuilderFunction = PAGE_BUILDER_TYPES[key];
    if (typeof pageBuilderFunction === 'function') {
      return `
        _type == "${key}" && (!defined(marketAvailability) || !("${market}" in marketAvailability)) => {
          ${pageBuilderFunction(lang)}
        },
      `;
    }
    return '';
  });

  const joinedQueryStrings = queryStrings.join('');

  return joinedQueryStrings;
};
