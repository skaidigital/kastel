import { z } from 'zod';

// # Simple types
export const linkToValidator = z.object({
  type: z.enum(['page', 'product', 'collection', 'storeLocator', 'configurator']),
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
  title: z.string(),
  slug: z.string(),
  image: imageValidator,
  hoverImage: imageValidator.optional(),
  badges: z.array(z.string()).optional()
});

export const SEOAndSocialsValidator = z.object({
  seo: metadataValidator
});

// # Pages
export const loginFormValidator = z.object({
  email: z.string().email(),
  password: z.string()
});
