import { MARKETS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const color = defineType({
  title: 'Color',
  name: 'colorDocument',
  type: 'document',
  groups: [
    {
      name: 'shared',
      title: 'Shared',
      icon: () => '🙌',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  preview: {
    select: {
      title: 'title_no',
      color: 'color.value'
    },
    prepare({ title, color }) {
      return {
        title,
        media: () => <div style={{ backgroundColor: color, width: '100%', height: '100%' }} />
      };
    }
  },
  fields: [
    ...i18nString({
      title: 'Title',
      name: 'title',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Farge',
      name: 'color',
      type: 'simplerColor',
      validation: (Rule) => Rule.required(),
      group: 'shared'
    }),
    ...i18nSlug({
      schemaType: 'colorDocument'
    })
  ]
});
