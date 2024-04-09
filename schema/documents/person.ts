import { UserCircle } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const person = defineType({
  title: 'Person',
  name: 'person',
  type: 'document',
  icon: UserCircle,
  preview: {
    select: {
      title: 'name',
      media: 'image'
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media
      };
    }
  },
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure'
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Employee', value: 'employee' },
          { title: 'External', value: 'external' }
        ]
      },
      initialValue: 'employee',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Role',
      name: 'role',
      type: 'i18n.string'
      // validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description (optional)',
      description: "I.e. 'I enjoye spending time with my daughter..'",
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      }
      // validation: validateAllStringTranslations
    })
  ]
});
