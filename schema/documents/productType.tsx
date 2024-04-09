import { MARKETS } from '@/data/constants';
import { filterAlreadyAddedReferences, i18nField } from '@/lib/sanity/studioUtils';
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
  groups: [
    {
      icon: () => '⚙️',
      name: 'settings',
      title: 'Settings',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  fields: [
    defineField({
      title: 'What is this?',
      description:
        'A product type is used to share images, page builder blocks and other content between related products. It is also used to link to products that are of the same type from within a product page',
      name: 'myCustomNote',
      type: 'note',
      options: {
        icon: () => <Question size={16} weight="duotone" />,
        tone: 'positive'
      },
      group: 'settings'
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
      group: 'settings'
    }),
    ...i18nField({
      title: 'Description',
      name: 'description',
      type: 'richText'
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'settings',
      validation: (Rule) =>
        Rule.custom((value: any, context: any) => {
          if (!value.length) {
            return 'You need to add at least one section';
          }

          const firstComponent = value[0];

          if (
            firstComponent._type !== 'hero' &&
            firstComponent._type !== 'pageTitle' &&
            firstComponent._type !== 'emailCapture'
          ) {
            return 'The first section must be a hero, page title or email capture';
          }

          return true;
        })
    }),
    defineField({
      title: 'Questions',
      name: 'questions',
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
      group: 'settings'
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'gallery',
      options: {
        layout: 'grid'
      },
      group: 'settings'
    })
  ]
});
