import { LangValues, MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import {
  aspectRatioSettingsValidator,
  buttonSettingsValidator,
  conditionalLinkValidator,
  hotspotImageValidator,
  imageValidator,
  linkValidator,
  mediaValidator,
  portableTextValidator,
  productCardValidator,
  uspValidator
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

const featuredCollectionValidator = z.object({
  type: z.literal('featuredCollectionSection'),
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
  descriptionBack: z.string(),
  descriptionList: z
    .array(
      z.object({
        descriptionTerm: z.string(),
        descriptionDetails: z.string()
      })
    )
    .optional()
});

const kastelClubSectionValidator = z.object({
  type: z.literal('kastelClubSection'),
  key: z.string(),
  backgroundImage: imageValidator,
  title: z.string(),
  description: z.string().optional(),
  buttonText: z.string(),
  steps: z.array(kastelClubStepValidator),
  lastSlide: mediaValidator,
  sectionSettings: sectionSettingsValidator
});

const natureLabExplainerSectionValidator = z.object({
  type: z.literal('natureLabExplainerSection'),
  key: z.string(),
  title: z.string(),
  titleTitle: z.string(),
  titleContent: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      content: portableTextValidator,
      image: imageValidator
    })
  ),
  sectionSettings: sectionSettingsValidator
});

const shopOurModelsSectionValidator = z.object({
  type: z.literal('shopOurModelsSection'),
  key: z.string(),
  badge: z.string().optional(),
  shoes: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      colorWays: z.array(
        z.object({
          image: imageValidator,
          hexCode: z.string(),
          slug: z.string()
        })
      ),
      usps: z.array(uspValidator).optional(),
      details: z.array(
        z.object({
          title: z.string(),
          description: z.string()
        })
      )
    })
  ),
  sectionSettings: sectionSettingsValidator
});

const featuredShoeSectionValidator = z.object({
  type: z.literal('featuredShoeSection'),
  key: z.string(),
  title: z.string(),
  description: z.string().optional(),
  badge: z.string().optional(),
  product: productCardValidator,
  link: linkValidator,
  content: z.array(z.union([mediaValidator, hotspotImageValidator])),
  sectionSettings: sectionSettingsValidator
});

const textPlacementValidator = z.union([
  z.literal('top-left'),
  z.literal('top-center'),
  z.literal('top-right'),
  z.literal('center-left'),
  z.literal('center'),
  z.literal('center-right'),
  z.literal('bottom-left'),
  z.literal('bottom-center'),
  z.literal('bottom-right'),
  z.literal('split-top'),
  z.literal('split-center'),
  z.literal('split-bottom')
]);

const heroValidator = z.object({
  type: z.literal('hero'),
  key: z.string(),
  title: z.string(),
  description: z.string().optional(),
  link: conditionalLinkValidator,
  media: mediaValidator,
  aspectRatioSettings: aspectRatioSettingsValidator,
  textPositionMobile: textPlacementValidator,
  textPositionDesktop: textPlacementValidator,
  buttonSettings: buttonSettingsValidator
});

const uspExplainerSectionValidator = z.object({
  type: z.literal('uspExplainerSection'),
  key: z.string(),
  content: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      media: mediaValidator,
      usps: z.array(uspValidator)
    })
  ),
  sectionSettings: sectionSettingsValidator
});

const cardBaseValidator = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  link: conditionalLinkValidator,
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
  featuredCollectionValidator,
  cardSectionValidator,
  blogPostSectionValidator,
  FAQSectionValidator,
  shoePickerValidator,
  ugcSectionValidator,
  kastelClubSectionValidator,
  natureLabExplainerSectionValidator,
  shopOurModelsSectionValidator,
  featuredShoeSectionValidator,
  heroValidator,
  uspExplainerSectionValidator
]);

export const pageBuilderValidator = z.array(pageBuilderBlockValidator);

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
export type NatureLabExplainerSectionProps = z.infer<typeof natureLabExplainerSectionValidator>;
export type ShopOurModelsSectionProps = z.infer<typeof shopOurModelsSectionValidator>;
export type FeaturedShoeSectionProps = z.infer<typeof featuredShoeSectionValidator>;
export type HeroProps = z.infer<typeof heroValidator>;
export type USPExplainerSectionProps = z.infer<typeof uspExplainerSectionValidator>;
export type PageBuilder = z.infer<typeof pageBuilderValidator>;

export type PageBuilderBlock = z.infer<typeof pageBuilderBlockValidator>;

export const PAGE_BUILDER_TYPES: {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (lang: LangValues) => string;
} = {
  hero: (lang) => `
    ${fragments.base},
    "title": title.${lang},
    "description": description.${lang},
    link{
      ${fragments.getConditionalLink(lang)}
    },
    buttonSettings{
      ${fragments.buttonSettings}
    },
    media{
      ${fragments.getMedia(lang)}
    },
    aspectRatioSettings{
      ${fragments.aspectRatioSettings}
    },
    textPositionMobile,
    textPositionDesktop
  `,
  featuredCollectionSection: (lang) => `
    ${fragments.base},
    ...featuredCollectionBlock->{
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
          ${fragments.getProductCard(lang)}
        }
      ),
      media{
        ${fragments.getMedia(lang)}
       },
      "buttonText": buttonText.${lang},
    },
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
    ...faqBlock->{
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
        "descriptionBack": descriptionBack.${lang},
        descriptionList[]{
          "descriptionTerm": descriptionTerm.${lang},
          "descriptionDetails": descriptionDetails.${lang}
        },
      },
      lastSlide{
        ${fragments.getMedia(lang)}
      }
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  natureLabExplainerSection: (lang) => groq`
    ${fragments.base},
    ...natureLabExplainerBlock->{
      "title": title.${lang},
      "titleTitle": titleTitle.${lang},
      "titleContent": titleContent.${lang},
      steps[]{
        "title": title.${lang},
        "content": content_${lang},
        image{
          ${fragments.getImageBase(lang)}
        }
      }, 
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  shopOurModelsSection: (lang) => groq`
    ${fragments.base},
    ...shopOurModelsBlock->{
      "badge": badge->title.${lang},
      "shoes": shoes[]{
        ...shoe->{
          "colorWays": *[_type == "product" && references(^._id) && defined(mainImage) && defined(slug_no.current)]{
            "image": mainImage{
              ${fragments.getImageBase(lang)}
            },
            "hexCode": color->color.value,
            "slug": slug_${lang}.current,
          },
          "usps": usps[]->{
              "title": title.${lang},
              "image": icon{
                ${fragments.getImageBase(lang)}
              }
          },
        },
        "title": title.${lang},
        "description": description.${lang},
        "details": details[]{
          "title": title.${lang},
          "description": description.${lang}
        }
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  featuredShoeSection: (lang) => groq`
    ${fragments.base},
    ...featuredShoeBlock->{
      "title": title.${lang},
      "description": description.${lang},
      "badge": badge->title.${lang},
      "product": shoe->{
        ${fragments.getProductCard(lang)}
      },
      link{
        ${fragments.getLink(lang)}
      },
      content[]{
        _type == "media" => {
          ${fragments.getMedia(lang)}
        },
        _type == "reference" => {
          ...@->{
            ${fragments.getHotspotImage(lang)}
          }
        }
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  uspExplainerSection: (lang) => groq`
    ${fragments.base},
    ...uspExplainerBlock->{
      content[]{
        "title": title.${lang},
        "description": description.${lang},
        "media": media{
          ${fragments.getMedia(lang)}
        },
        "usps": usps[]->{
          "title": title.${lang},
          "image": icon{
            ${fragments.getImageBase(lang)}
          },
        },
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
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
