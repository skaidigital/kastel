import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Link } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const link = defineType({
  title: 'Link',
  name: 'link',
  type: 'object',
  icon: Link,
  preview: {
    select: {
      text: 'text.no',
      to: 'to.title',
      href: 'href'
    },
    prepare(value) {
      const { text, to, href } = value;
      return {
        title: text || to || href || 'No title',
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
          { title: 'To a page made in Sanity', value: 'internal' },
          { title: 'To an external page', value: 'external' }
        ]
      },
      validation: (Rule) => Rule.required().error('Link type is required')
    }),
    defineField({
      title: 'Link text',
      name: 'text',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Links to',
      name: 'linkTo',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'product' }, { type: 'collection' }, { type: 'storeLocator' }],
      hidden: ({ parent }) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((linkTo, context: any) => {
          if (context.parent?.type === 'internal' && !linkTo) {
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
        Rule.custom((href, context: any) => {
          if (context.parent?.type === 'external' && !href) {
            return 'External link requires a link to a page';
          }
          return true;
        })
    }),
    defineField({
      title: 'Open in new tab?',
      name: 'openInNewTab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((openInNewTab, context: any) => {
          if (context.parent?.type === 'external' && openInNewTab === undefined) {
            return 'You have to choose if the link should open in a new tab or not';
          }
          return true;
        })
    })
  ]
});
