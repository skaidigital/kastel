import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Check } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const usps = defineType({
  title: 'USPs above footer',
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
      title: 'USPs under add to cart button for regular products',
      description:
        "You do not need to add the 'Earn X Kastel Points', we will add this automatically",
      name: 'productForm',
      type: 'array',
      of: [{ type: 'i18n.string', validation: validateAllStringTranslations, icon: Check }],
      validation: (Rule) => Rule.min(1).max(4)
    }),
    defineField({
      title: 'USPs under add to cart button for Nature Lab products',
      description:
        "You do not need to add the 'Earn X Kastel Points', we will add this automatically",
      name: 'productFormNatureLab',
      type: 'array',
      of: [{ type: 'i18n.string', validation: validateAllStringTranslations, icon: Check }],
      validation: (Rule) => Rule.min(1).max(4)
    })
  ]
});
