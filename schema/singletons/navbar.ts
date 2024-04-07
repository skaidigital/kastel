import { defineArrayMember, defineField, defineType } from 'sanity';

// TODO make text in items i18n and group by lang + shared
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
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [defineArrayMember({ type: 'meganav' }), defineArrayMember({ type: 'link' })]
    })
  ]
});
