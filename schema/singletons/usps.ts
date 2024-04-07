import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Check } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const usps = defineType({
  title: 'USPs',
  name: 'usps',
  type: 'document',
  icon: Check,
  preview: {
    prepare() {
      return {
        title: 'USPs'
      };
    }
  },
  fields: [
    defineField({
      title: 'USPs above footer',
      name: 'items',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          title: 'USP',
          name: 'usp',
          type: 'i18n.string',
          validation: validateAllStringTranslations
        })
      ]
    })
    // ...MARKETS.map((market) =>
    //   defineField({
    //     title: `USPs under add to cart button for ${market.name} ${market.flag}`,
    //     name: `productForm_${market.id}`,
    //     type: 'richText',
    //     validation: (Rule) => Rule.required()
    //   })
    // )
  ]
});
