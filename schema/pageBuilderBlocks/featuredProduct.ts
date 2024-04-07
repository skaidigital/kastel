import { MARKETS } from '@/data/constants';
import { i18nField } from '@/lib/sanity/studioUtils';
import { Star } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const featuredProduct = defineType({
  title: 'Featured product',
  name: 'featuredProduct',
  type: 'object',
  icon: Star,
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Featured product',
        icon: Star
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
    ...i18nField({
      title: 'Title',
      name: 'title',
      type: 'title'
    }),
    defineField({
      title: 'Lifestyle image',
      name: 'lifestyleImage',
      type: 'figure',
      group: 'shared'
    }),
    defineField({
      title: 'Product image',
      name: 'productImage',
      type: 'figure',
      group: 'shared'
    }),
    defineField({
      title: 'Product',
      name: 'product',
      type: 'link',
      group: 'shared'
    })
  ]
});
