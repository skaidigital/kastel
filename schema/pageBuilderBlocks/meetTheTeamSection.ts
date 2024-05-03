import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { UsersFour } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const meetTheTeamSection = defineType({
  title: 'Meet the team',
  name: 'meetTheTeamSection',
  type: 'object',
  icon: UsersFour,
  preview: {
    select: {
      title: 'title.en'
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
      title: 'People',
      name: 'people',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      title: 'Section settings',
      name: 'sectionSettings',
      type: 'sectionSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Disable / Hide this block in a market',
      name: 'marketAvailability',
      type: 'marketAvailability'
    })
  ]
});
