import { MARKETS } from '@/data/constants';
import { i18nField, i18nString } from '@/lib/sanity/studioUtils';
import { List } from '@phosphor-icons/react';
import { defineType } from 'sanity';

export const accordion = defineType({
  title: 'Nedtrekksmeny',
  name: 'accordion',
  type: 'document',
  icon: List,
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
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled'
      };
    }
  },
  fields: [
    ...i18nString({
      title: 'Tittel',
      name: 'title',
      validation: (Rule) => Rule.required()
    }),
    ...i18nField({
      title: 'Innhold',
      name: 'richText',
      type: 'richText',
      validation: (Rule: any) => Rule.required()
    })
  ]
});
