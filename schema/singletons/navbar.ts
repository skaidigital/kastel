import { defineArrayMember, defineField, defineType } from 'sanity';

export const navbar = defineType({
  title: 'Navbar',
  name: 'navbar',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Navbar'
      };
    }
  },
  fields: [
    defineField({
      title: 'Items (Norwegian market)',
      name: 'items_no',
      type: 'array',
      of: [defineArrayMember({ type: 'meganav' }), defineArrayMember({ type: 'link' })],
      validation: (Rule) => Rule.min(1).max(6)
    }),
    defineField({
      title: 'Items (Swedish market)',
      name: 'items_sv',
      type: 'array',
      of: [defineArrayMember({ type: 'meganav' }), defineArrayMember({ type: 'link' })],
      validation: (Rule) => Rule.min(1).max(6)
    })
  ]
});
