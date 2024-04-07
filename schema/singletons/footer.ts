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
      description: "The text under the 'About Abate' heading",
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'headingAndLinks'
        })
      ]
    })
  ]
});
