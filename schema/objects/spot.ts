import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const spot = defineType({
  name: 'spot',
  type: 'object',
  fieldsets: [{ name: 'position', options: { columns: 2 } }],
  fields: [
    defineField({
      title: 'Details',
      name: 'details',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      name: 'x',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100)
    }),
    defineField({
      name: 'y',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100)
    })
  ],
  preview: {
    select: {
      title: 'details.en',
      x: 'x',
      y: 'y'
    },
    prepare({ title, x, y }) {
      return {
        title,
        subtitle: x && y ? `${x}% x ${y}%` : `No position set`
      };
    }
  }
});
