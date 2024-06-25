import { LangValues, MarketValues } from '@/data/constants'
import * as fragments from '@/lib/sanity/fragments'
import {
  aspectRatioSettingsValidator,
  blogPostCardValidator,
  buttonSettingsValidator,
  conditionalLinkValidator,
  hotspotImageValidator,
  imageValidator,
  linkValidator,
  mediaValidator,
  portableTextValidator,
  productCardValidator,
  uspValidator
} from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

const paddingValidator = z.union([z.literal('sm'), z.literal('md'), z.literal('lg')])

export const sectionSettingsValidator = z.object({
  padding: paddingValidator,
  hasTopPadding: z.boolean(),
  hasBottomPadding: z.boolean(),
  hasBottomBorder: z.boolean()
})

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
})

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
})

const blogPostSectionValidator = z.object({
  type: z.literal('blogPostSection'),
  key: z.string(),
  title: z.string(),
  buttonText: z.string(),
  posts: z.array(blogPostCardValidator),
  sectionSettings: sectionSettingsValidator
})

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
})

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
})

const ugcSectionValidator = z.object({
  type: z.literal('ugcSection'),
  key: z.string(),
  videos: z.array(z.string()),
  sectionSettings: sectionSettingsValidator
})

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
})

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
})

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
})

const shopOurModelsSectionValidator = z.object({
  type: z.literal('shopOurModelsSection'),
  key: z.string(),
  badge: z.string().optional(),
  buttonText: z.string(),
  shoes: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      firstShoeSlug: z.string(),
      colorWays: z.array(
        z.object({
          image: imageValidator,
          title: z.string(),
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
})

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
})

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
])

export const heroValidator = z.object({
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
})

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
})

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
})

const imageCardValidator = z.object({
  type: z.literal('image'),
  image: imageValidator
})

const videoCardValidator = z.object({
  type: z.literal('video'),
  video: z.string()
})

export const cardValidator = z.discriminatedUnion('type', [
  cardBaseValidator.merge(imageCardValidator),
  cardBaseValidator.merge(videoCardValidator)
])

const natureLabInnovationItemValidator = z.object({
  title: z.string(),
  description: z.string(),
  image: imageValidator,
  link: linkValidator,
  keyFeatures: z.array(z.string())
})

const natureLabInnovationSectionValidator = z.object({
  type: z.literal('natureLabInnovationsSection'),
  key: z.string(),
  title: z.string(),
  description: z.string().optional(),
  innovations: z.array(natureLabInnovationItemValidator)
})

const emailCaptureValidator = z.object({
  type: z.literal('natureLabInnovationsSection'),
  key: z.string(),
  title: z.string(),
  klaviyoListId: z.string(),
  media: mediaValidator,
  badge: z.string().optional(),
  description: portableTextValidator,
  buttonText: z.string()
})

const timelineItemValidator = z.object({
  label: z.string(),
  title: z.string(),
  description: z.string(),
  media: mediaValidator,
  aspectRatioSettings: aspectRatioSettingsValidator
})

const timelineSectionValidator = z.object({
  type: z.literal('timelineSection'),
  key: z.string(),
  title: z.string(),
  description: z.string().optional(),
  badge: z.string().optional(),
  timeline: z.array(timelineItemValidator),
  sectionSettings: sectionSettingsValidator
})

const fullBleedMediaSectionValidator = z.object({
  type: z.literal('fullBleedMediaSection'),
  key: z.string(),
  title: z.string(),
  description: z.string().optional(),
  textPlacementMobile: z.union([
    z.literal('left-top'),
    z.literal('left-center'),
    z.literal('left-bottom'),
    z.literal('center-top'),
    z.literal('center'),
    z.literal('center-bottom')
  ]),
  textPlacementDesktop: z.union([
    z.literal('left-top'),
    z.literal('left-center'),
    z.literal('left-bottom'),
    z.literal('center-top'),
    z.literal('center'),
    z.literal('center-bottom'),
    z.literal('split-bottom')
  ]),
  media: mediaValidator,
  aspectRatioSettings: aspectRatioSettingsValidator
})

const pageTitleValidator = z.object({
  type: z.literal('pageTitle'),
  key: z.string(),
  title: z.string(),
  description: z.string()
})

const meetTheTeamSectionValidator = z.object({
  type: z.literal('meetTheTeamSection'),
  key: z.string(),
  title: z.string(),
  people: z.array(
    z.object({
      image: imageValidator,
      name: z.string(),
      role: z.string(),
      description: z.string().optional()
    })
  ),
  sectionSettings: sectionSettingsValidator
})

const siteReviewsValidator = z.object({
  type: z.literal('siteReviews'),
  key: z.string(),
  isEnabled: z.literal(true)
})

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
  uspExplainerSectionValidator,
  emailCaptureValidator,
  timelineSectionValidator,
  fullBleedMediaSectionValidator,
  pageTitleValidator,
  meetTheTeamSectionValidator,
  siteReviewsValidator
])

export const pageBuilderValidator = z.array(pageBuilderBlockValidator)

// Start new validators
export type CardProps = z.infer<typeof cardValidator>
export type FeaturedCollectionProps = z.infer<typeof featuredCollectionValidator>
export type CardSectionProps = z.infer<typeof cardSectionValidator>
export type BlogPostSectionProps = z.infer<typeof blogPostSectionValidator>
export type FAQSectionProps = z.infer<typeof FAQSectionValidator>
export type ShoePickerProps = z.infer<typeof shoePickerValidator>
export type UGCSectionProps = z.infer<typeof ugcSectionValidator>
export type KastelClubStepProps = z.infer<typeof kastelClubStepValidator>
export type KastelClubSectionProps = z.infer<typeof kastelClubSectionValidator>
export type NatureLabExplainerSectionProps = z.infer<typeof natureLabExplainerSectionValidator>
export type ShopOurModelsSectionProps = z.infer<typeof shopOurModelsSectionValidator>
export type FeaturedShoeSectionProps = z.infer<typeof featuredShoeSectionValidator>
export type HeroProps = z.infer<typeof heroValidator>
export type USPExplainerSectionProps = z.infer<typeof uspExplainerSectionValidator>
export type NatureLabInnovationSectionProps = z.infer<typeof natureLabInnovationSectionValidator>
export type EmailCaptureProps = z.infer<typeof emailCaptureValidator>
export type TimelineItemProps = z.infer<typeof timelineItemValidator>
export type TimelineSectionProps = z.infer<typeof timelineSectionValidator>
export type FullBleedMediaSectionProps = z.infer<typeof fullBleedMediaSectionValidator>
export type PageTitleProps = z.infer<typeof pageTitleValidator>
export type MeetTheTeamSectionProps = z.infer<typeof meetTheTeamSectionValidator>
export type PageBuilder = z.infer<typeof pageBuilderValidator>
export type PageBuilderBlock = z.infer<typeof pageBuilderBlockValidator>

export const PAGE_BUILDER_TYPES: {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (lang: LangValues, market: MarketValues) => string
} = {
  pageTitle: (lang) => `
    ${fragments.base},
    "title": title.${lang},
    "description": description.${lang}
  `,
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
  featuredCollectionSection: (lang, market) => `
    ${fragments.base},
    ...featuredCollectionBlock->{
      ...collection->{
        "title": title.${lang},
        "description": descriptionShort.${lang},
        "slug": "/collections/"+slug_${lang}.current
      },
      "products": select(
        isManual == true => products[]->{
          ${fragments.getProductCard(lang, market)}
        },
        isManual == false => collection->.products[].product->{
          ${fragments.getProductCard(lang, market)}
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
        "answer": answer_${lang}[]{
          ${fragments.getPortableText(lang)}
        },
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  shoePicker: (lang, market) => groq`
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
              ${fragments.getProductCard(lang, market)}
            }
          },
        },
      },
    },
    sectionSettings{
     ${fragments.sectionSettings}
    }
  `,
  ugcSection: () => groq`
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
        "content": content_${lang}[]{
          ${fragments.getPortableText(lang)}
        },
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
      "buttonText": buttonText.${lang},
      "shoes": shoes[]{
        ...shoe->{
          "colorWays": *[_type == "product" && references(^._id) && defined(mainImage) && defined(slug_no.current)]{
            "image": mainImage{
              ${fragments.getImageBase(lang)}
            },
            "title": color->title.${lang},
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
        "firstShoeSlug": firstShoe->slug_${lang}.current,
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
  featuredShoeSection: (lang, market) => groq`
    ${fragments.base},
    ...featuredShoeBlock->{
      "title": title.${lang},
      "description": description.${lang},
      "badge": badge->title.${lang},
      "product": shoe->{
        ${fragments.getProductCard(lang, market)}
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
            ${fragments.getHotspotImage(lang, market)}
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
  `,
  natureLabInnovationSection: (lang) => groq`
    ${fragments.base},
    "title": title.${lang},
    "description": description.${lang},
    innovations[]->{
      "title": title.${lang},
      "description": description.${lang},
      "image": image{
        ${fragments.getImageBase(lang)}
      },
      "link": link{
        ${fragments.getLink(lang)}
      },
      "keyFeatures": keyFeatures[].feature.${lang}
    },
  `,
  emailCapture: (lang) => groq`
    ${fragments.base},
    "title": title.${lang},
    klaviyoListId,
    "media": media{
      ${fragments.getMedia(lang)}
    },
    "badge": badge->title.${lang},
    "description": description_${lang}[]{
      ${fragments.getPortableText(lang)}
    },
    "buttonText": buttonText.${lang}
  `,
  timelineSection: (lang) => groq`
    ${fragments.base},
    ...timelineBlock->{
      "title": title.${lang},
      "description": description.${lang},
      "badge": badge->title.${lang},
      "timeline": timeline[]{
        "label": label.${lang},
        "title": title.${lang},
        "description": description.${lang},
        "media": media{
          ${fragments.getMedia(lang)}
        },
        "aspectRatioSettings": aspectRatioSettings{
          ${fragments.aspectRatioSettings}
        }
      }
    },
    sectionSettings{
      ${fragments.sectionSettings}
    }
  `,
  fullBleedMediaSection: (lang) => groq`
    ${fragments.base},
    ...fullBleedMediaBlock->{
      "title": title.${lang},
      "description": description.${lang},
      media{
        ${fragments.getMedia(lang)}
      },
      aspectRatioSettings{
        ${fragments.aspectRatioSettings}
      },
      textPlacementMobile,
      textPlacementDesktop
    },
  `,
  meetTheTeamSection: (lang) => groq`
    ${fragments.base},
    "title": title.${lang},
    "people": people[]->{
      "image": image{
        ${fragments.getImageBase(lang)}
      },
      "name": name,
      "role": role.${lang},
      "description": description.${lang}
    },
    sectionSettings{
      ${fragments.sectionSettings}
    },
  `,
  siteReviews: () => groq`
    ${fragments.base},
    isEnabled,
  `
}

export const concatenatePageBuilderQueries = ({
  market,
  lang
}: {
  market: MarketValues
  lang: LangValues
}) => {
  const keys = Object.keys(PAGE_BUILDER_TYPES)

  const queryStrings = keys.map((key: string) => {
    const pageBuilderFunction = PAGE_BUILDER_TYPES[key]
    if (typeof pageBuilderFunction === 'function') {
      return `
        _type == "${key}" && (!defined(marketAvailability) || !("${market}" in marketAvailability)) => {
          ${pageBuilderFunction(lang, market)}
        },
      `
    }
    return ''
  })

  const joinedQueryStrings = queryStrings.join('')

  return joinedQueryStrings
}
