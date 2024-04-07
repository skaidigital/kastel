import { defineField, defineType } from 'sanity';

export const settingsTheme = defineType({
  title: 'Theme settings',
  name: 'settingsTheme',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Theme settings'
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string'
    })
  ]
});
