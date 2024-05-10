import { MARKETS, PRODUCT_TYPES } from '@/data/constants';
import {
  filterAlreadyAddedReferences,
  i18nField,
  i18nNumber,
  i18nString,
  readOnlyUnlessDeveloper,
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Gear, Image, PaintBrush, Sneaker, Video } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const product = defineType({
  title: 'Product',
  name: 'product',
  type: 'document',
  icon: Sneaker,
  groups: [
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      hidden: ({ document }: any) => !document?.markets?.includes(market.id),
      icon: () => market.flag
    })),
    {
      icon: PaintBrush,
      name: 'editorial',
      title: 'Editorial',
      default: true
    },
    {
      icon: Image,
      name: 'images',
      title: 'Images'
    },
    {
      icon: Gear,
      name: 'settings',
      title: 'Settings'
    }
  ],
  fieldsets: [
    {
      name: 'shopify',
      title: 'Shopify info',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'stock',
      title: 'Stock',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    defineField({
      title: 'Main image',
      name: 'mainImage',
      type: 'figure',
      group: 'images',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Lifestyle image (optional)',
      name: 'lifestyleImage',
      type: 'figure',
      group: 'images',
      description: 'This image will be shown when the user hovers over the product card'
    }),
    defineField({
      title: 'Gallery - Female',
      name: 'galleryFemale',
      type: 'array',
      of: [
        { type: 'figure', title: 'Image', icon: Image },
        { type: 'mux.video', title: 'Video', icon: Video }
      ],
      group: 'images',
      validation: (Rule) => Rule.min(1).max(10)
    }),
    defineField({
      title: 'Gallery - Male',
      name: 'galleryMale',
      type: 'array',
      of: [{ type: 'figure' }, { type: 'mux.video' }],
      group: 'images',
      validation: (Rule) => Rule.min(1).max(10)
    }),
    defineField({
      title: 'Detail image (optional)',
      description: 'Add an image and then click on the image blow to place your hotspot(s)',
      name: 'detailImage',
      type: 'figure',
      group: 'images'
    }),
    defineField({
      title: 'Hotspots for detail image (optional)',
      name: `hotspots`,
      type: `array`,
      of: [{ type: 'spot' }],
      options: {
        imageHotspot: {
          imagePath: 'detailImage',
          descriptionPath: `type`,
          tooltip: undefined
        }
      },
      group: 'images',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent.detailImage && !value) {
            return 'You have to set this field';
          }

          return true;
        })
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'editorial'
    }),
    defineField({
      title: 'Subtitle (optional)',
      name: 'subtitle',
      type: 'i18n.string',
      group: 'editorial'
    }),
    defineField({
      title: 'Short description',
      description:
        "If set this field and have it set on the model, we will use this instead of the model's short description",
      name: 'descriptionShort',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const hasModel = context?.document?.productType?._ref ? true : false;

          if (hasModel) {
            return true;
          }

          const hasNo = value?.no;
          const hasEn = value?.en;

          if (!hasNo || !hasEn) {
            return [
              !hasNo && {
                message:
                  'You must provide a Norwegian short description if you do not set a model under settings',
                paths: ['no']
              },
              !hasEn && {
                message:
                  'You must provide an English short description if you do not set a model under settings',
                paths: ['en']
              }
            ].filter(Boolean);
          }

          return true;
        }),
      group: 'editorial'
    }),
    defineField({
      title: 'Long description title',
      description:
        "Title of the longer description below the product hero. If set this field and have it set on the model, we will use this instead of the model's long description title.",
      name: 'descriptionLongTitle',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const hasModel = context?.document?.productType?._ref ? true : false;

          if (hasModel) {
            return true;
          }

          const hasNo = value?.no;
          const hasEn = value?.en;

          if (!hasNo || !hasEn) {
            return [
              !hasNo && {
                message:
                  'You must provide a Norwegian long description title if you do not set a model under settings',
                paths: ['no']
              },
              !hasEn && {
                message:
                  'You must provide an English long description title if you do not set a model under settings',
                paths: ['en']
              }
            ].filter(Boolean);
          }

          return true;
        }),
      group: 'editorial'
    }),
    defineField({
      title: 'Long description details',
      description:
        "The longer description below the product hero. If set this field and have it set on the model, we will use this instead of the model's long description details.",
      name: 'descriptionLongDetails',
      type: 'i18n.text',
      options: {
        rows: 4
      },
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const hasModel = context?.document?.productType?._ref ? true : false;

          if (hasModel) {
            return true;
          }

          const hasNo = value?.no;
          const hasEn = value?.en;

          if (!hasNo || !hasEn) {
            return [
              !hasNo && {
                message:
                  'You have to provide Norwegian long description details if you do not set a model under settings',
                paths: ['no']
              },
              !hasEn && {
                message:
                  'You have to provide English long description details if you do not set a model under settings',
                paths: ['en']
              }
            ].filter(Boolean);
          }

          return true;
        }),
      group: 'editorial'
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'editorial'
    }),
    defineField({
      title: 'Cross sell products in the cart drawer (optional)',
      description: 'Products that will be shown in the cart drawer as a cross sell',
      name: 'cartCrossSellProducts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ],
      validation: (Rule) => Rule.max(3),
      group: 'editorial'
    }),
    defineField({
      title: 'Badges (optional)',
      name: 'badges',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'badge' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        }
      ],
      group: 'editorial',
      description: 'Adds badges to the product card',
      validation: (Rule) => Rule.max(2)
    }),
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'string',
      description: 'This title is only visible in the Sanity Studio',
      group: 'settings'
    }),
    defineField({
      title: 'Which markets is this product available in?',
      name: 'markets',
      type: 'array',
      group: 'settings',
      of: [
        {
          type: 'string',
          options: {
            list: MARKETS.map((market) => ({
              title: market.name,
              value: market.id
            }))
          }
        }
      ],
      validation: (Rule) =>
        Rule.custom((value: any, context: any) => {
          const marketsWithActiveProduct = MARKETS.reduce((activeMarketIds: string[], market) => {
            const marketId = market.id;
            const statusField = `status_${marketId}`;
            const isActive = context.parent[statusField] === 'ACTIVE';

            if (isActive) {
              activeMarketIds.push(marketId);
            }

            return activeMarketIds;
          }, []);

          // Identify missing active markets from the value array
          const missingActiveMarkets = marketsWithActiveProduct.filter(
            (marketId) => !value.includes(marketId)
          );

          // Check if there are any missing active markets
          if (missingActiveMarkets.length > 0) {
            // Create a readable list of missing market IDs for the error message
            const missingMarketsList = missingActiveMarkets.join(', ');
            return `Missing active market(s): ${missingMarketsList}. All markets with an active product must be included.`;
          }

          return true;
        })
    }),
    defineField({
      title: 'Model',
      name: 'productType',
      type: 'reference',
      to: [{ type: 'productType' }],
      group: 'settings',
      description:
        'This will add the gallery, page builder blocks and other content to this product form its model as well as link to other products of the same model in the product page (colors)'
    }),
    defineField({
      title: 'Is this product a color?',
      name: 'isColor',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (!value && context.parent?.productType) {
            return 'You have to set this field';
          }

          return true;
        }),
      description:
        "If this product is a specific color like 'Dusty Blue Sengesett' we will set a color swatch for the product here."
    }),
    defineField({
      title: 'Color',
      name: 'color',
      type: 'reference',
      to: [{ type: 'colorDocument' }],
      group: 'settings',
      hidden: ({ parent }) => !parent?.isColor,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.isColor && !value) {
            return 'You have to set this field';
          }

          return true;
        })
    }),
    ...i18nField({
      title: 'Status',
      name: `status`,
      type: 'string',
      initialValue: 'DRAFT',
      options: {
        list: [
          { title: 'Active', value: 'ACTIVE' },
          { title: 'Archived', value: 'ARCHIVED' },
          { title: 'Draft', value: 'DRAFT' }
        ]
      }
    }),
    defineField({
      title: 'Product type',
      name: 'type',
      type: 'string',
      initialValue: 'VARIABLE',
      group: 'settings',
      options: {
        list: PRODUCT_TYPES.map((type) => ({
          title: type.name,
          value: type.id
        }))
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Options',
      name: 'options',
      type: 'array',
      group: 'settings',
      hidden: ({ parent }) => parent?.type !== 'VARIABLE',
      validation: (Rule) =>
        Rule.custom((value: any, context: any) => {
          const isSimpleProduct = context.parent?.type === 'SIMPLE';

          if (isSimpleProduct) {
            return true;
          }

          if (!value) {
            return 'Options are required';
          }

          if (value?.length < 1 || value?.length > 3) {
            return 'You must have between 1 and 3 options';
          }

          return true;
        }),
      of: [
        defineField({
          title: 'Option',
          name: 'option',
          type: 'productOptionConfig'
        })
      ]
    }),
    defineField({
      title: 'Tags (optional)',
      description: 'Tags that will be used for filtering and search',
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'editorial'
    }),
    defineField({
      title: 'USPs (optional)',
      description:
        'The USPs that will displayed in the marquee on the top and below the product hero. These will be added alongside the USPs you have set in the model, if you have any.',
      name: 'usps',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'usp' }] }],
      validation: (Rule) => Rule.max(5),
      group: 'editorial'
    }),
    defineField({
      title: 'FAQs (optional)',
      description:
        'These will be added alongside the default product FAQs set in settings -> Default product FAQs and the FAQs set in the model if you have any',
      name: 'faqs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'question' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ],
      validation: (Rule) => Rule.max(10),
      group: 'editorial'
    }),
    defineField({
      title: 'Size guide (optional)',
      description:
        'The size guide that will be shown in the product drawer. If you have set a size chart on the model, this will be shown instead',
      name: 'sizeGuide',
      type: 'reference',
      to: [{ type: 'sizeChart' }],
      group: 'editorial'
    }),
    defineField({
      title: 'Track stock',
      name: 'trackStock',
      type: 'boolean',
      group: 'settings',
      fieldset: 'stock',
      initialValue: true,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'SIMPLE' && value === undefined) {
            return 'You have to set this field';
          }

          return true;
        })
    }),
    defineField({
      title: 'Allow backorders',
      name: 'allowBackorders',
      type: 'boolean',
      group: 'settings',
      fieldset: 'stock',
      hidden: ({ parent }) => parent?.trackStock !== true,
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (
            context.parent?.trackStock &&
            context.parent?.type === 'SIMPLE' &&
            value === undefined
          ) {
            return 'You have to set this field';
          }

          return true;
        })
    }),
    ...i18nNumber({
      title: 'Price',
      name: 'price',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          const { parent, path } = context;
          const activeMarkets = parent?.markets;
          const currentMarket = path[0].split('_')[1];

          if (!activeMarkets?.includes(currentMarket)) {
            return true;
          }

          if (parent?.type === 'SIMPLE' && !value) {
            return 'Price is required';
          }

          return true;
        }),
      hidden: ({ parent }: any) => parent?.type !== 'SIMPLE'
    }),
    ...i18nField({
      title: 'Discounted price',
      name: 'compareAtPrice',
      type: 'number',
      hidden: ({ parent }: any) => parent?.type !== 'SIMPLE'
    }),
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'string',
      group: 'settings',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'SIMPLE' && !value) {
            return 'SKU is required';
          }

          return true;
        }),
      hidden: ({ parent }) => parent?.type !== 'SIMPLE'
    }),
    defineField({
      title: 'Barcode',
      name: 'barcode',
      type: 'string',
      group: 'settings',
      hidden: ({ parent }) => parent?.type !== 'SIMPLE'
    }),

    defineField({
      title: 'Slug 🇧🇻',
      name: 'slug_no',
      type: 'slug',
      options: {
        source: 'title.no',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'product',
            lang: 'no',
            context
          })
      },
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (!value?.current) {
            return 'The slug is required';
          }
          // Make sure the slug only has lowercase letters, noe spaces and valid characters
          if (!/^[a-z0-9-]+$/.test(value?.current)) {
            return 'The slug can only contain lowercase letters, numbers and hyphens';
          }
          return true;
        }),
      group: 'settings'
    }),
    defineField({
      title: 'Slug 🇬🇧',
      name: 'slug_en',
      type: 'slug',
      options: {
        source: 'title.en',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'product',
            lang: 'en',
            context
          })
      },
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (!value?.current) {
            return 'The slug is required';
          }
          // Make sure the slug only has lowercase letters, noe spaces and valid characters
          if (!/^[a-z0-9-]+$/.test(value?.current)) {
            return 'The slug can only contain lowercase letters, numbers and a-z';
          }
          return true;
        }),
      group: 'settings'
    }),
    ...i18nField({
      title: 'Created at',
      name: 'createdAt',
      type: 'string',
      fieldset: 'shopify',
      readOnly: true
    }),
    ...i18nString({
      title: 'Gid',
      name: 'gid',
      fieldset: 'shopify'
      // readOnly: readOnlyUnlessDeveloper({user})
    }),
    ...i18nString({
      title: 'Variant gid',
      name: 'variantGid',
      fieldset: 'shopify',
      readOnly: true
    }),
    ...MARKETS.map((market) => ({
      title: 'Min price',
      name: `minVariantPrice_${market.id}`,
      type: 'price',
      fieldset: 'shopify',
      group: market.id,
      readOnly: readOnlyUnlessDeveloper
    })),
    ...MARKETS.map((market) => ({
      title: 'Max price',
      name: `maxVariantPrice_${market.id}`,
      type: 'price',
      fieldset: 'shopify',
      group: market.id,
      readOnly: readOnlyUnlessDeveloper
    })),
    ...MARKETS.map((market) => ({
      title: 'Largest discount',
      name: `largestDiscount_${market.id}`,
      type: 'string',
      fieldset: 'shopify',
      group: market.id,
      readOnly: readOnlyUnlessDeveloper
    }))
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{ field: 'internalTitle', direction: 'asc' }]
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{ field: 'internalTitle', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      mainImage: 'mainImage',
      title: 'title.en',
      internalTitle: 'internalTitle'
    },
    prepare(selection) {
      const { mainImage, title, internalTitle } = selection;

      const bestTitle = internalTitle || title || 'Untitled';

      return {
        title: bestTitle,
        media: mainImage
      };
    }
  }
});
