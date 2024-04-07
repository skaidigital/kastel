import { MARKETS } from '@/data/constants';
import { i18nField } from '@/lib/sanity/studioUtils';
import { Cookie } from '@phosphor-icons/react';
import { defineType } from 'sanity';

export const cookieConsent = defineType({
  title: 'Cookie consent',
  name: 'cookieConsent',
  type: 'document',
  icon: Cookie,
  preview: {
    prepare() {
      return {
        title: 'Cookie consent',
        subtitle: 'Singleton',
        icon: Cookie
      };
    }
  },
  groups: [
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag,
      default: market.id === 'no'
    }))
  ],
  fields: [
    ...i18nField({
      title: 'Content',
      name: 'content',
      type: 'richText',
      validation: (Rule: any) => Rule.required()
    })
  ]
});
