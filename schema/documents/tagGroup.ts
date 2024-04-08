import { MARKETS, TAG_OPTIONS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { Folders } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const tagGroup = defineType({
  title: 'Tag group',
  name: 'tagGroup',
  type: 'document',
  icon: Folders,
  groups: [
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    })),
    {
      name: 'settings',
      title: 'Settings',
      icon: () => '⚙️',
      default: true
    }
  ],
  preview: {
    select: {
      title: 'title_no'
    }
  },
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        list: TAG_OPTIONS.map((option) => ({
          title: option.name,
          value: option.id
        }))
      }
    }),
    ...i18nString({
      title: 'Title',
      name: 'title',
      validation: (Rule) => Rule.required()
    }),
    ...i18nSlug({
      schemaType: 'tagGroup'
    })
  ]
});
