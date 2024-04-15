import { Cookie } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

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
  fields: [
    defineField({
      title: 'Content 🇧🇻',
      name: 'content_no',
      type: 'richText',
      validation: (Rule: any) => Rule.required()
    })
  ]
});
