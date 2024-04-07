import { MARKETS } from '@/data/constants';
import { filterAlreadyAddedReferences, i18nField } from '@/lib/sanity/studioUtils';
import { List } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const accordionBlock = defineType({
  title: 'Accordion Block',
  name: 'accordionBlock',
  type: 'document',
  icon: List,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Accordion block',
        icon: List
      };
    }
  },
  groups: [
    {
      icon: () => '🙌',
      name: 'shared',
      title: 'Shared',
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
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      group: 'shared'
    }),
    ...i18nField({
      title: 'Title',
      name: 'title',
      type: 'title'
    }),
    defineField({
      title: 'Accordion items',
      name: 'items',
      type: 'array',
      group: 'shared',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'accordion' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ]
    })
  ]
});
