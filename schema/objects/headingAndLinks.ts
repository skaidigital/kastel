import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const headingAndLinks = defineType({
  title: 'Heading and links',
  name: 'headingAndLinks',
  type: 'object',
  preview: {
    select: {
      heading: 'heading.no',
      links: 'links'
    },
    prepare(value) {
      const { heading } = value;
      return {
        title: heading || 'No title',
        subtitle: 'Heading and links'
      };
    }
  },
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.required().min(1)
    })
  ]
});
