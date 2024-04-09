import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { TagChevron } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const meganav = defineType({
  title: 'Meganav',
  name: 'meganav',
  type: 'object',
  icon: TagChevron,
  preview: {
    select: {
      title: 'title.no'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Meganav'
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      description: 'The name of the item in the navbar itself (before you open the meganav)',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Links',
      description: "Adds a column of heading + links under it. For example for 'All models'",
      name: 'links',
      type: 'array',
      of: [{ type: 'headingAndLinks' }],
      validation: (Rule) => Rule.max(4)
    }),
    defineField({
      title: 'Featured products',
      description:
        'Adds a large image with a link to a page/product/external link. Can for example be used for a featured shoe. These will be hidden in the mobile menu',
      name: 'featuredProducts',
      type: 'array',
      of: [{ type: 'featuredNavItem' }],
      validation: (Rule) => Rule.max(4)
    })
  ]
});
