import { z } from 'zod';

// # Simple types
const PageTypesRequiringSlug = z.enum(['page', 'product', 'collection', 'legalPage', 'blogPost']);
const PageTypesNotRequiringSlug = z.enum(['retailersPage', 'helpCenter', 'blogLandingPage']);

const WithSlug = z.object({
  type: PageTypesRequiringSlug,
  slug: z.string()
});

const WithoutSlug = z.object({
  type: PageTypesNotRequiringSlug
});

export const linkToValidator = z.union([WithSlug, WithoutSlug]);

const linkExternalValidator = z.object({
  type: z.literal('link'),
  linkType: z.literal('external'),
  text: z.string(),
  href: z.string().url(),
  openInNewTab: z.boolean()
});

const linkInternalValidator = z.object({
  type: z.literal('link'),
  linkType: z.literal('internal'),
  text: z.string(),
  linkTo: linkToValidator
});

const smileLauncherEnum = z.enum([
  'home',
  'points_activity_rules',
  'points_products',
  'referral_program_details'
]);

const smileValidator = z.object({
  type: z.literal('link'),
  linkType: z.literal('smile'),
  text: z.string(),
  smileLauncher: smileLauncherEnum
});

export const linkValidator = z.discriminatedUnion('linkType', [
  linkExternalValidator,
  linkInternalValidator,
  smileValidator
]);

const linkWithoutTextInternalValidator = z.object({
  type: z.literal('linkWithoutText'),
  linkType: z.literal('internal'),
  linkTo: linkToValidator
});

const linkWithoutTextExternalValidator = z.object({
  type: z.literal('linkWithoutText'),
  linkType: z.literal('external'),
  href: z.string().url(),
  openInNewTab: z.boolean()
});

const linkWithoutTextSmileValidator = z.object({
  type: z.literal('linkWithoutText'),
  linkType: z.literal('smile'),
  smileLauncher: smileLauncherEnum
});

export const linkWithoutTextValidator = z.discriminatedUnion('linkType', [
  linkWithoutTextInternalValidator,
  linkWithoutTextExternalValidator,
  linkWithoutTextSmileValidator
]);

export const imageValidator = z.object({
  asset: z.object({
    _ref: z.string(),
    metadata: z.object({
      lqip: z.string()
    })
  }),
  altText: z.string().optional(),
  crop: z
    .object({
      top: z.number(),
      bottom: z.number(),
      left: z.number(),
      right: z.number()
    })
    .optional(),
  hotspot: z
    .object({
      height: z.number(),
      width: z.number(),
      x: z.number(),
      y: z.number()
    })
    .optional()
});

// ? Need one that has optional for the asset field since the one above fails if you have alt text but not an image
export const optionalImageValidator = z.object({
  asset: z
    .object({
      _ref: z.string(),
      metadata: z.object({
        lqip: z.string()
      })
    })
    .optional(),
  altText: z.string().optional(),
  crop: z
    .object({
      top: z.number(),
      bottom: z.number(),
      left: z.number(),
      right: z.number()
    })
    .optional(),
  hotspot: z
    .object({
      height: z.number(),
      width: z.number(),
      x: z.number(),
      y: z.number()
    })
    .optional()
});

export const videoValidator = z.string();

export const galleryValidator = z.array(
  imageValidator.extend({
    width: z.union([z.literal('1-COL'), z.literal('2-COL')]).optional()
  })
);

export const richTextValidator = z.any();

export const portableTextValidator = z.array(z.any());

export const headingAndLinksValidator = z.object({
  heading: z.string(),
  links: z.array(z.object({ link: linkValidator, badge: z.string().optional() }))
});

export const footerValidator = z.object({
  title: z.string(),
  items: z.array(headingAndLinksValidator)
});

export const metadataValidator = z.object({
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  noIndex: z.boolean().nullable(),
  noFollow: z.boolean().nullable()
});

export const productOptionValidator = z.object({
  title: z.string(),
  slug: z.string()
});

// TODO type once we figure out how to solve it
export const productVariantValidator = z.object({
  title: z.string(),
  shopifyId: z.string(),
  sku: z.string(),
  price: z.number(),
  isActive: z.boolean()
});

const colorWayValidator = z.object({
  title: z.string(),
  image: imageValidator,
  hexCode: z.string(),
  slug: z.string(),
  badges: z.array(z.string()).optional(),
  minVariantPrice: z.object({
    amount: z.number(),
    currencyCode: z.string()
  })
});

export type colorWaySchema = z.infer<typeof colorWayValidator>;

export const productCardValidator = z.object({
  type: z.literal('product'),
  gid: z.string(),
  sku: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  mainImage: imageValidator,
  lifestyleImage: optionalImageValidator.optional(),
  badges: z.array(z.string()).optional(),
  minVariantPrice: z.object({
    amount: z.number(),
    currencyCode: z.string()
  }),
  maxVariantPrice: z.object({
    amount: z.number(),
    currencyCode: z.string()
  }),
  colorways: z.array(colorWayValidator).optional(),
  sizes: z
    .array(
      z.object({
        type: z.string(),
        options: z.array(
          z.object({
            title: z.string()
          })
        )
      })
    )
    .optional()
});

export const SEOAndSocialsValidator = z.object({
  seo: metadataValidator
});

const sameAssetImageValidator = z.object({
  type: z.literal('image'),
  sameAssetForMobileAndDesktop: z.literal(true),
  image: imageValidator
});

const differentAssetImageValidator = z.object({
  type: z.literal('image'),
  sameAssetForMobileAndDesktop: z.literal(false),
  imageMobile: imageValidator,
  imageDesktop: imageValidator
});

const sameAssetVideoValidator = z.object({
  type: z.literal('video'),
  sameAssetForMobileAndDesktop: z.literal(true),
  video: videoValidator
});

const differentAssetVideoValidator = z.object({
  type: z.literal('video'),
  sameAssetForMobileAndDesktop: z.literal(false),
  videoMobile: videoValidator,
  videoDesktop: videoValidator
});

export const mediaValidator = z.union([
  sameAssetImageValidator,
  differentAssetImageValidator,
  sameAssetVideoValidator,
  differentAssetVideoValidator
]);

export const aspectRatiosValidator = z.enum(['16:9', '4:3', '21:9', '9:16', '3:4']);

const sameAspectRatioSettingsValidator = z.object({
  sameAspectRatio: z.literal(true),
  aspectRatio: aspectRatiosValidator
});

const differentAspectRatioSettingsValidator = z.object({
  sameAspectRatio: z.literal(false),
  aspectRatioMobile: aspectRatiosValidator,
  aspectRatioDesktop: aspectRatiosValidator
});

export const aspectRatioSettingsValidator = z.union([
  sameAspectRatioSettingsValidator,
  differentAspectRatioSettingsValidator
]);

const internalLinkValidator = z.object({
  type: z.literal('internal'),
  text: z.string(),
  linkTo: linkToValidator
});

const externalLinkValidator = z.object({
  type: z.literal('external'),
  text: z.string(),
  href: z.string().url(),
  openInNewTab: z.boolean()
});

const hasLinkValidator = z.union([
  internalLinkValidator.extend({
    hasLink: z.literal(true)
  }),
  externalLinkValidator.extend({
    hasLink: z.literal(true)
  })
]);

const noLinkValidator = z.object({
  hasLink: z.literal(false)
});

const smileLinkValidator = z.object({
  type: z.literal('smile'),
  hasLink: z.literal(true),
  text: z.string(),
  smileLauncher: smileLauncherEnum
});

export const conditionalLinkValidator = z.union([
  hasLinkValidator,
  noLinkValidator,
  smileLinkValidator
]);

const textHotspotsValidator = z.object({
  type: z.literal('text'),
  description: z.string(),
  x: z.number(),
  y: z.number()
});

const productCardHotspotsValidator = productCardValidator.extend({
  type: z.literal('product'),
  x: z.number(),
  y: z.number()
});

export const hotspotImageValidator = z.object({
  type: z.literal('hotspotImage'),
  image: imageValidator,
  hotspots: z.array(
    z.discriminatedUnion('type', [textHotspotsValidator, productCardHotspotsValidator])
  )
});

export const buttonSettingsValidator = z.object({
  variant: z.enum(['primary', 'secondary', 'outline'])
});

export const uspValidator = z.object({
  title: z.string(),
  image: imageValidator
});

export const videoSettingsValidator = z.object({
  autoPlay: z.boolean()
});

export const blogPostCardValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  readLength: z.number(),
  image: imageValidator
});

export const authorValidator = z.object({
  name: z.string(),
  role: z.string(),
  description: z.string().optional(),
  image: imageValidator
});

export const questionAndAnswerValidator = z.object({
  question: z.string(),
  answer: portableTextValidator
});

export const faqBlockValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  badge: z.string().optional(),
  items: z.array(questionAndAnswerValidator)
});

const quoteWithoutAuthorValidator = z.object({
  type: z.literal('quote'),
  showAuthor: z.literal(false),
  quote: z.string()
});

const quoteWithInternalAuthorValidator = z.object({
  type: z.literal('quote'),
  showAuthor: z.literal(true),
  quote: z.string(),
  authorType: z.literal('internal'),
  author: z.object({
    name: z.string(),
    description: z.string().optional(),
    image: imageValidator,
    role: z.string()
  })
});

const quoteWithExternalAuthorValidator = z.object({
  type: z.literal('quote'),
  showAuthor: z.literal(true),
  quote: z.string(),
  authorType: z.literal('external'),
  authorName: z.string()
});

const quoteWithAuthorValidator = z.union([
  quoteWithInternalAuthorValidator,
  quoteWithExternalAuthorValidator
]);

export const quoteValidator = z.union([quoteWithoutAuthorValidator, quoteWithAuthorValidator]);

export const tableValidator = z.object({
  rows: z.array(
    z.object({
      cells: z.array(z.string())
    })
  )
});
