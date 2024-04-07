import { ValidationContext, defineField, defineType } from 'sanity';

export const linkWithoutText = defineType({
  title: 'Lenke uten tekst',
  name: 'linkWithoutText',
  type: 'object',
  preview: {
    select: {
      to: 'to.title',
      href: 'href'
    },
    prepare(value) {
      const { to, href } = value;
      return {
        title: to || href || 'No title',
        subtitle: 'Link'
      };
    }
  },
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'A page made in Sanity', value: 'internal' },
          { title: 'An external site', value: 'external' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Links to',
      name: 'linkTo',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'product' },
        { type: 'collection' },
        { type: 'storeLocator' },
        { type: 'configurator' }
      ],
      hidden: ({ parent }) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((linkTo, context: ValidationContext) => {
          if (context.document?._type === 'internal' && !linkTo) {
            return 'Internal link requires a link to a page';
          }
          return true;
        })
    }),
    defineField({
      title: 'URL',
      name: 'href',
      type: 'url',
      description: 'Example: "https://www.google.com"',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((href, context: ValidationContext) => {
          if (context.document?.type === 'external' && !href) {
            return 'External link requires a link to a page';
          }
          return true;
        })
    })
  ]
});
