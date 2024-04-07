import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const meganav = defineType({
  title: 'Meganav',
  name: 'meganav',
  type: 'object',
  preview: {
    select: {
      title: 'title.no'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Dropdown'
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'headingAndLinks' }]
    }),
    defineField({
      title: 'Featured products',
      name: 'featuredProducts',
      type: 'array',
      of: [{ type: 'featuredNavItem' }]
    })
  ]
});
