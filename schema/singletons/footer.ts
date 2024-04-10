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
      name: 'itemsNo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'headingAndLinks'
        })
      ],
      validation: (Rule) => Rule.min(1).max(4)
    }),
    defineField({
      title: 'Items (Swedish market)',
      name: 'itemsSv',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'headingAndLinks'
        })
      ],
      validation: (Rule) => Rule.min(1).max(4)
    })
  ]
});
