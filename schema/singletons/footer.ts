import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const footer = defineType({
  title: 'Footer',
  name: 'footer',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Footer'
      };
    }
  },
  fields: [
    defineField({
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      description: "The accompanying text next to the brand tagline 'Raised by Weather'",
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Items (Norwegian market)',
      name: 'items_no',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'headingAndLinks'
        })
      ],
      validation: (Rule) => Rule.required().min(1).max(4)
    }),
    defineField({
      title: 'Newsletter form label',
      name: 'newsletterLabel',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Newsletter form description',
      name: 'newsletterDescription',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: validateAllStringTranslations
    })
  ]
});
