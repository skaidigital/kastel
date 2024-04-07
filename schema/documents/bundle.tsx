import { MARKETS } from '@/data/constants';
import { i18nField, i18nNumber, i18nSlug } from '@/lib/sanity/studioUtils';
import { ShoppingCartSimple } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

// TODO add color swatch
// TODO må kunne adde pills
// TODO add checkbox on tags "show on product cards". On tags have "show on product cards"
export const bundle = defineType({
  title: 'Bundle',
  name: 'bundle',
  type: 'document',
  icon: ShoppingCartSimple,
  // validation: (Rule) =>
  //   // TODO also validate that it isn't a draft
  //   Rule.custom(async (value: any, context: ValidationContext) => {
  //     const productType = context.document?.type;
  //     const isSimpleProduct = productType === 'SIMPLE';

  //     if (isSimpleProduct) {
  //       return true;
  //     }

  //     const documentId = context.document?._id;
  //     const formattedDocumentId = documentId?.replace('drafts.', '');

  //     const client = context.getClient({ apiVersion: '2024-01-01' });
  //     const query = groq`count(*[_type == "productVariant" && references($documentId)])`;

  //     const variantCount = await client.fetch(query, { documentId: formattedDocumentId });

  //     if (variantCount === 0) {
  //       return 'You have to add at least one variant before publishing a variable product';
  //     }

  //     return true;
  //   }),
  // Groups are used to organize fields in the Studio UI
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
  // Fieldsets are used to organize fields in the Studio UI
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
      title: 'Stock'
    }
  ],
  fields: [
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'editorial'
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'gallery',
      group: 'editorial'
    }),
    defineField({
      title: 'Replacement image for cards (optional)',
      name: 'cardImage',
      type: 'figure',
      group: 'editorial'
    }),
    defineField({
      title: 'Internal title, only visible in Sanity Studio',
      name: 'internalTitle',
      type: 'string',
      description: 'This title is only visible in the Sanity Studio',
      group: 'settings'
    }),
    defineField({
      title: 'Internal subtitle, only visible in Sanity Studio',
      name: 'internalSubtitle',
      type: 'string',
      description: 'This subtitle is only visible in the Sanity Studio',
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
      ]
    }),
    defineField({
      title: 'Add product type name to title',
      name: 'addProductTypeNameToTitle',
      description: "This will add the product type name to the product's title",
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      hidden: ({ parent }) => !parent?.productType,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (!value && context.parent?.productType) {
            return 'You have to set this field';
          }

          return true;
        })
    }),
    defineField({
      title: 'Is this product a color?',
      name: 'isColor',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      hidden: ({ parent }) => !parent?.productType,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (!value && context.parent?.productType) {
            return 'You have to set this field';
          }

          return true;
        })
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
      title: 'Title',
      name: 'title',
      type: 'string'
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
    ...i18nNumber({
      title: 'Discount Percentage',
      description: 'Select a discount percentage for this bundle',
      name: 'price',
      validation: (Rule) =>
        Rule.custom((value: any, context: any) => {
          const { document, path } = context;
          const { markets } = document;
          const market = path[0].split('_')[1];

          if (!markets.includes(market)) {
            return true;
          }

          const status = document[`status_${market}`];

          if (!value && status === 'ACTIVE') {
            return `Discount percentage is required in market: ${market} when status is "Active"`;
          }

          return true;
        }),
      options: {
        list: [
          { title: '0%', value: 0 },
          { title: '5%', value: 5 },
          { title: '10%', value: 10 },
          { title: '15%', value: 15 },
          { title: '20%', value: 20 },
          { title: '25%', value: 25 },
          { title: '30%', value: 30 },
          { title: '35%', value: 35 },
          { title: '40%', value: 40 },
          { title: '45%', value: 45 },
          { title: '50%', value: 50 }
        ]
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
      title: 'Bundle items',
      name: 'bundleItems',
      type: 'array',
      group: 'settings',
      of: [
        {
          type: 'bundleItem' // Refer to the object type you've defined above
        }
      ]
    }),

    ...i18nField({
      title: 'Beskrivelse',
      name: 'description',
      type: 'richText'
    }),
    ...i18nSlug({ schemaType: 'product' }),

    ...i18nField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
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
      isDeleted: 'isDeleted',
      options: 'options',
      productGallery: 'gallery',
      productTypeGallery: 'productType.gallery',
      // priceRange: 'priceRange',
      productType: 'productType.title_no',
      // status: 'store.status',
      isActive: 'isActive',
      title: 'title_no',
      variants: 'variants',
      internalTitle: 'internalTitle',
      internalSubtitle: 'internalSubtitle'
    },
    prepare(selection) {
      const { productGallery, productTypeGallery, internalTitle, internalSubtitle } = selection;

      const bestPreviewImage = productGallery?.at(0) || productTypeGallery?.at(0);

      const bestTitle = internalTitle || 'No title';

      return {
        // description: description.join(' / '),
        subtitle: internalSubtitle || '',
        title: bestTitle,
        media: bestPreviewImage
        // media: (
        // <ShopifyDocumentStatus
        // isActive={status === 'active'}
        //   isActive={isActive}
        //   isDeleted={isDeleted}
        //   type="product"
        //   url={previewImageUrl}
        //   title={bestTitle}
        // />
        // ),
      };
    }
  }
});

// Egne defineField-funksjoner her som sjekker etter markets string[] og gjør validation / hidden
