import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Package } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

// TODO rename to featuredCollectionBlock
export const featuredCollectionBlock = defineType({
  title: 'Featured Collection block',
  name: 'featuredCollectionBlock',
  type: 'document',
  icon: Package,
  preview: {
    select: {
      title: 'collection.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Featured Collection'
      };
    }
  },
  fields: [
    defineField({
      title: 'Collection',
      name: 'collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Background image/video',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Button text',
      name: 'buttonText',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Choose products manually',
      description:
        'If disabled, we get the first 8 products from the collection. If enabled, you can choose the products manually.',
      name: 'isManual',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }], title: 'Product' }],
      validation: (Rule) =>
        Rule.custom((field: any, context: any) => {
          const isManual = context.parent?.isManual;

          if (isManual && (field?.length < 1 || field?.length > 8 || !field)) {
            return 'When "Choose products manually" is enabled, you must select between 1 and 8 products.';
          }

          return true;
        }),
      hidden: ({ parent }) => parent?.isManual === false
    })
  ]
});
