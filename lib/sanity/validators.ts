import { z } from 'zod';

// # Simple types
export const pageTypes = z.enum(['home', 'page', 'product', 'collection', 'retailersPage']);

export const linkToValidator = z.object({
  type: pageTypes,
  slug: z.string()
});

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

export const linkValidator = z.discriminatedUnion('linkType', [
  linkExternalValidator,
  linkInternalValidator
]);

export const linkWithoutTextValidator = z.object({
  type: z.literal('linkWithoutText'),
  linkType: z.enum(['internal', 'external']),
  href: z.string().url().optional().nullable(),
  linkTo: linkToValidator.nullable()
});

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
  links: z.array(linkValidator)
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

export const productCardValidator = z.object({
  type: z.literal('product'),
  gid: z.string(),
  sku: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  mainImage: imageValidator,
  lifestyleImage: imageValidator.optional(),
  badges: z.array(z.string()).optional()
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
  href: z.string().url()
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

export const conditionalLinkValidator = z.union([hasLinkValidator, noLinkValidator]);

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

export const faqBlockValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  badge: z.string().optional(),
  items: z.array(
    z.object({
      question: z.string(),
      answer: portableTextValidator
    })
  )
});
