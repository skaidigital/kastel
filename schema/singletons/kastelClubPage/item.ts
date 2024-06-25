import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { defineField, defineType } from 'sanity'

export const kastelClubPageSectionItem = defineType({
  title: 'Item',
  name: 'kastelClubPageSectionItem',
  type: 'object',
  preview: {
    select: {
      title: 'title.no',
      subtitle: 'description.no'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'No title',
        subtitle: subtitle || 'No description'
      }
    }
  },
  fields: [
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'figure',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
})
