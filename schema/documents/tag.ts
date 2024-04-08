import { MARKETS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { Tag } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const tag = defineType({
  title: 'Tag',
  name: 'tag',
  type: 'document',
  icon: Tag,
  groups: [
    {
      name: 'settings',
      title: 'Settings',
      icon: () => '⚙️',
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
      group: 'group.title_no'
    },
    prepare: ({ title, group }) => {
      return {
        title: `${title} (${group})`
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
      title: 'Color',
      name: 'color',
      type: 'reference',
      to: { type: 'colorDocument' },
      group: 'settings',
      hidden: ({ parent }) => parent?.type !== 'color',
      validation: (Rule) => Rule.custom((color) => !!color || 'Required')
    }),
    ...i18nSlug({ schemaType: 'tag' }),
    defineField({
      title: 'Belongs to tag group',
      name: 'group',
      type: 'reference',
      to: { type: 'tagGroup' },
      group: 'settings',
      validation: (Rule) => Rule.required()
    })
  ]
});
