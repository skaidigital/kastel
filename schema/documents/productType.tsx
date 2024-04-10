import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Gear, PaintBrush, Question, Square } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const productType = defineType({
  title: 'Model',
  name: 'productType',
  type: 'document',
  icon: Square,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled'
      };
    }
  },
  groups: [
    {
      icon: PaintBrush,
      name: 'editorial',
      title: 'Editorial',
      default: true
    },
    {
      icon: Gear,
      name: 'settings',
      title: 'Settings'
    }
  ],
  fields: [
    defineField({
      title: 'What is this?',
      description:
        'A product model is used to share images, page builder blocks and other content between related products. It is also used to link to products that are of the same type from within a product page',
      name: 'myCustomNote',
      type: 'note',
      options: {
        icon: () => <Question size={16} weight="duotone" />,
        tone: 'positive',
        group: 'editorial'
      }
    }),
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'i18n.string',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Short description',
      name: 'descriptionShort',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: validateAllStringTranslations,
      group: 'editorial'
    }),
    defineField({
      title: 'Long description title',
      description: 'Title of the longer description below the product hero',
      name: 'descriptionLongTitle',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Long description details',
      name: 'descriptionLongDetails',
      type: 'i18n.text',
      options: {
        rows: 4
      },
      validation: validateAllStringTranslations,
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
      description: 'Adds badges to the product card',
      validation: (Rule) => Rule.max(2),
      group: 'settings'
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'editorial'
    }),
    defineField({
      title: 'FAQs',
      description:
        'These will be added alongside the default product FAQs set in settings -> Default product FAQs',
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
      title: 'Tags (optional)',
      description: 'Tags that will be used for filtering and search',
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'settings'
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
      group: 'settings'
    })
  ]
});
