import { filterAlreadyAddedReferences } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const filters = defineType({
  title: 'Filters',
  name: 'filters',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Filters'
      };
    }
  },
  fields: [
    defineField({
      title: 'Filters in collection page',
      name: 'items',
      type: 'array',
      of: [
        defineField({
          title: 'Filter group',
          name: 'filterGroup',
          type: 'reference',
          to: [{ type: 'tagGroup' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ],
      validation: (Rule) => Rule.min(1).max(6)
    })
  ]
});
