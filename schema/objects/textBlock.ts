import { MARKETS } from '@/data/constants';
import { i18nField } from '@/lib/sanity/studioUtils';
import { TextIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const textBlock = defineType({
  title: 'Text Block',
  name: 'textBlock',
  type: 'document',
  icon: TextIcon,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Text section'
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
      group: 'shared',
      validation: (Rule) => Rule.required()
    }),
    ...i18nField({
      title: 'Content',
      name: 'richText',
      type: 'richText',
      validation: (Rule: any) => Rule.required()
    })
  ]
});
