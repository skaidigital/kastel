import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Question, Square } from '@phosphor-icons/react';
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
  fields: [
    defineField({
      title: 'What is this?',
      description:
        'A product model is used to share images, page builder blocks and other content between related products. It is also used to link to products that are of the same type from within a product page',
      name: 'myCustomNote',
      type: 'note',
      options: {
        icon: () => <Question size={16} weight="duotone" />,
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'i18n.string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Short description',
      name: 'descriptionShort',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Long description title',
      name: 'descriptionLongTitle',
      type: 'i18n.string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Long description details',
      name: 'descriptionLongDetails',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder'
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
      ]
    })
  ]
});
