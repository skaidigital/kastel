import { MARKETS, PRODUCT_TYPES } from '@/data/constants';
import {
  filterAlreadyAddedReferences,
  i18nField,
  i18nNumber,
  i18nSlug,
  i18nString,
  isActiveProductValidation
} from '@/lib/sanity/studioUtils';
import { Sneaker } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const product = defineType({
  title: 'Produkt',
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
      icon: () => '📝',
      name: 'editorial',
      title: 'Editorial',
      default: true
    },
    {
      icon: () => '⚙️',
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
      title: 'Gallery',
      name: 'gallery',
      type: 'gallery',
      group: 'editorial',
      validation: (Rule) => Rule.min(1).max(10)
    }),
    defineField({
      title: 'Main image',
      name: 'mainImage',
      type: 'figure',
      group: 'editorial',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Lifestyle image (optional)',
      name: 'lifestyleImage',
      type: 'figure',
      group: 'editorial',
      description: 'This image will be shown when the user hovers over the product card'
    }),
    defineField({
      title: 'Detail image (optional)',
      description: 'Add an image with a hotspot that will be shown below the product form',
      name: 'detailImage',
      type: 'figure',
      group: 'editorial'
    }),
    defineField({
      title: 'Hotspots for detail image (optional)',
      name: `hotspots`,
      type: `array`,
      of: [{ type: 'spot' }],
      options: {
        imageHotspot: {
          imagePath: `detailImage`,
          descriptionPath: `details`,
          tooltip: undefined
        }
      },
      group: 'editorial'
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
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
    ...i18nField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: isActiveProductValidation
    }),
    ...i18nField({
      title: 'Subtitle (optional)',
      name: 'subtitle',
      type: 'string'
    }),
    ...i18nField({
      title: 'Short description',
      name: 'descriptionShort',
      type: 'text',
      rows: 2,
      validation: isActiveProductValidation
    }),
    ...i18nField({
      title: 'Long description',
      name: 'descriptionLong',
      type: 'descriptionDetailed',
      validation: isActiveProductValidation
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
      }
    }),
    defineField({
      title: 'Options',
      name: 'options',
      type: 'array',
      group: 'settings',
      hidden: ({ parent }) => parent?.type !== 'VARIABLE',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'VARIABLE' && !value) {
            return 'Options are required';
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
      title: 'FAQs',
      description: 'These will be added alongside the default FAQs set in settings',
      name: 'faqs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'question' }]
        })
      ],
      group: 'editorial',
      validation: (Rule) => Rule.max(20)
    }),
    defineField({
      title: 'USPs',
      description:
        'The USPs that will displayed in the marquee on the top and below the product hero',
      name: 'usps',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'usp' }] }],
      validation: (Rule) => Rule.max(5),
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
      validation: (Rule) => Rule.max(3)
    }),
    defineField({
      title: 'Reccommended products (optional)',
      name: 'reccommendedProducts',
      description:
        'Products that will be shown in a carousel on the product pages. If you do not choose any, we will use the default reccommended products set in merchandising under settings',
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
      validation: (Rule) => Rule.max(12),
      group: 'editorial'
    }),
    ...i18nSlug({ schemaType: 'product', validation: isActiveProductValidation }),
    ...i18nField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
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
      fieldset: 'shopify',
      readOnly: true
    }),
    ...i18nString({
      title: 'Variant gid',
      name: 'variantGid',
      fieldset: 'shopify',
      readOnly: true
    }),
    ...MARKETS.map((market) => ({
      title: 'Max price',
      name: `maxPrice_${market.id}`,
      type: 'price',
      fieldset: 'shopify',
      group: market.id,
      readOnly: true
    })),
    ...MARKETS.map((market) => ({
      title: 'Min price',
      name: `minPrice_${market.id}`,
      type: 'price',
      fieldset: 'shopify',
      group: market.id,
      readOnly: true
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
    },
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{ field: 'minPrice_no.amount', direction: 'desc' }]
    },
    {
      name: 'priceAsc',
      title: 'Price (Lowest first)',
      by: [{ field: 'minPrice_no.amount', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      isDeleted: 'isDeleted',
      options: 'options',
      productGallery: 'gallery',
      productTypeGallery: 'productType.gallery',
      productType: 'productType.title_no',
      isActive: 'isActive',
      title: 'title_no',
      variants: 'variants',
      internalTitle: 'internalTitle'
    },
    prepare(selection) {
      const { productGallery, productTypeGallery, productType, internalTitle } = selection;

      const bestPreviewImage = productGallery?.at(0) || productTypeGallery?.at(0);

      const bestTitle = internalTitle || 'No Internal title';

      return {
        subtitle: productType || '',
        title: bestTitle,
        media: bestPreviewImage
      };
    }
  }
});
