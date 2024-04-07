import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import {
  imageValidator,
  linkToValidator,
  portableTextValidator,
  productCardValidator,
  richTextValidator
} from '@/lib/sanity/validators';
import { z } from 'zod';

const paddingValidator = z.union([z.literal('sm'), z.literal('md'), z.literal('lg')]);

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
  // type: z.union([z.literal('image'), z.literal('video')]),
  // video: z.string().optional(),
  // image: imageValidator.optional()
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

// export const cardValidator = z.object({
//   title: z.string().optional(),
//   subtitle: z.string().optional(),
//   link: linkValidator,
//   textPositionMobile: z.union([
//     z.literal('top-left'),
//     z.literal('top-center'),
//     z.literal('top-right'),
//     z.literal('center-left'),
//     z.literal('center'),
//     z.literal('center-right'),
//     z.literal('bottom-left'),
//     z.literal('bottom-center'),
//     z.literal('bottom-right')
//   ]),
//   textPositionDesktop: z.union([
//     z.literal('top-left'),
//     z.literal('top-center'),
//     z.literal('top-right'),
//     z.literal('center-left'),
//     z.literal('center'),
//     z.literal('center-right'),
//     z.literal('bottom-left'),
//     z.literal('bottom-center'),
//     z.literal('bottom-right')
//   ]),
//   type: z.union([z.literal('image'), z.literal('video')]),
//   video: z.string().optional(),
//   image: imageValidator.optional()
// });

export type CardProps = z.infer<typeof cardValidator>;

const cardGridValidator = z.object({
  type: z.literal('cardGrid'),
  key: z.string(),
  title: z.string().optional(),
  cards: z.array(cardValidator),
  padding: paddingValidator,
  aspectRatioDesktop: z.union([z.literal('16:9'), z.literal('4:3'), z.literal('21:9')]),
  aspectRatioMobile: z.union([z.literal('9:16'), z.literal('3:4')]),
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
});

export const pageBuilderBlockValidator = z.discriminatedUnion('type', [
  heroValidator,
  textAndImageValidator,
  pageTitleValidator,
  textSectionValidator,
  accordionSectionValidator,
  productListingValidator,
  collectionListingValidator,
  cardGridValidator,
  contactFormValidator,
  instagramFeedValidator
]);

export const pageBuilderValidator = z.array(pageBuilderBlockValidator);

export type HeroProps = z.infer<typeof heroValidator>;
export type TextAndImageProps = z.infer<typeof textAndImageValidator>;
export type PageTitleProps = z.infer<typeof pageTitleValidator>;
export type TextSectionProps = z.infer<typeof textSectionValidator>;
export type ProductListingProps = z.infer<typeof productListingValidator>;
export type CollectionListingProps = z.infer<typeof collectionListingValidator>;
export type CardGridProps = z.infer<typeof cardGridValidator>;
export type PageBuilderBlock = z.infer<typeof pageBuilderBlockValidator>;
export type PageBuilder = z.infer<typeof pageBuilderValidator>;
export type AccordionSectionProps = z.infer<typeof accordionSectionValidator>;
export type ContactFormProps = z.infer<typeof contactFormValidator>;

export const PAGE_BUILDER_TYPES: {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (market: MarketValues) => string;
} = {
  hero: (market) => `
    ${fragments.base},
    "title": title.${market}, 
    "subtitle": subtitle.${market}, 
    link{
      ${fragments.getLinkHero(market)}
    },
    textPositionMobile,
    textPositionDesktop,
    imageOrVideo,
    aspectRatioDesktop,
    aspectRatioMobile,
    "videoUrlMobile": videoMobile.asset->.playbackId,
    "videoUrlDesktop": videoDesktop.asset->.playbackId,
    imageMobile{
      ${fragments.getImageBase(market)},
    },
    imageDesktop{
      ${fragments.getImageBase(market)},
    }
  `,
  pageTitle: (market) => `
    ${fragments.base},
    "title": title.${market},
    "subtitle": subtitle.${market}
  `,
  textSection: (market) => `
    ${fragments.base},
    "richText": textBlock->.${fragments.getRichText({ market })},
    padding,
    hasTopPadding,
    hasBottomPadding,
    hasBottomBorder
  `,
  textAndImage: (market) => `
    ${fragments.base},
    ...@->{
      "richText": ${fragments.getRichText({ market })},
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
      "richText": ${fragments.getRichText({ market })}
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
  cardGrid: (market) => `
    ${fragments.base},
    "title": title.${market},
    cards[]->{
      ${fragments.getCard(market)}
    },
    aspectRatioDesktop,
    aspectRatioMobile,
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

export const concatenatePageBuilderQueries = (market: MarketValues) => {
  const keys = Object.keys(PAGE_BUILDER_TYPES);

  const queryStrings = keys.map((key: string) => {
    const pageBuilderFunction = PAGE_BUILDER_TYPES[key];
    if (typeof pageBuilderFunction === 'function') {
      return `
        _type == "${key}" => {
          ${pageBuilderFunction(market)}
        },
      `;
    }
    return '';
  });

  const joinedQueryStrings = queryStrings.join('');

  return joinedQueryStrings;
};
