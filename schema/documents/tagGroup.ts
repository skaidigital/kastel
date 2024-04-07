import { MARKETS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { Folders } from '@phosphor-icons/react';
import { defineType } from 'sanity';

export const tagGroup = defineType({
  title: 'Tag group',
  name: 'tagGroup',
  type: 'document',
  icon: Folders,
  groups: [
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag,
      default: market.id === 'no'
    }))
  ],
  preview: {
    select: {
      title: 'title_no'
    }
  },
  fields: [
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
