import { defineField, defineType } from 'sanity';

export const redirects = defineType({
  title: 'Redirects',
  name: 'redirects',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Redirects'
      };
    }
  },
  fields: [
    defineField({
      title: 'Redirects',
      name: 'redirects',
      type: 'array',
      of: [
        defineField({
          title: 'Redirect',
          name: 'redirect',
          type: 'object',
          preview: {
            select: {
              title: 'source',
              subtitle: 'destination',
              permanent: 'permanent'
            },
            prepare({ title, subtitle, permanent }) {
              return {
                title: `/${title} -> /${subtitle}`,
                subtitle: `Permanent: ${permanent}`
              };
            }
          },
          fields: [
            defineField({
              title: 'From',
              name: 'source',
              type: 'string'
            }),
            defineField({
              title: 'To',
              name: 'destination',
              type: 'string'
            }),
            defineField({
              title: 'Permanent?',
              name: 'permanent',
              type: 'boolean',
              initialValue: true
            })
          ]
        })
      ]
    })
  ]
});
