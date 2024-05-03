import { INTERNAL_LINK_OPTIONS } from '@/data/constants';
import { hiddenBasedOnLink, validateLinkType } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const conditionalLink = defineType({
  title: 'Link',
  name: 'conditionalLink',
  type: 'object',
  fields: [
    defineField({
      title: 'Link to something?',
      name: 'hasLink',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    }),
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
      hidden: hiddenBasedOnLink,
      validation: validateLinkType
    }),
    defineField({
      title: 'Link text',
      name: 'text',
      type: 'i18n.string',
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          if (context?.parent?.hasLink) {
            const hasNo = value?.no;
            const hasEn = value?.en;

            if (!hasNo || !hasEn) {
              return [
                !hasNo && { message: 'You must provide a Norwegian translation', paths: ['no'] },
                !hasEn && { message: 'You must provide an English translation', paths: ['en'] }
              ].filter(Boolean);
            }
          }

          return true;
        }),
      hidden: ({ parent }) => {
        if (parent?.hasLink === false) {
          return true;
        }
        return false;
      }
    }),
    defineField({
      title: 'Links to',
      name: 'linkTo',
      type: 'reference',
      to: INTERNAL_LINK_OPTIONS,
      hidden: ({ parent }) => parent?.type !== 'internal' || !parent?.hasLink,
      validation: (Rule) =>
        Rule.custom((linkTo, context: any) => {
          const hasLink = context.parent?.hasLink;
          const linkType = context.parent?.type;

          if (hasLink && linkType === 'internal' && !linkTo) {
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
      hidden: ({ parent }) => parent?.type !== 'external' || !parent?.hasLink,
      validation: (Rule) =>
        Rule.custom((href, context: any) => {
          const hasLink = context.parent?.hasLink;
          const linkType = context.parent?.type;

          if (hasLink && linkType === 'external' && !href) {
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
      hidden: ({ parent }) => parent?.type !== 'external' || !parent?.hasLink,
      validation: (Rule) =>
        Rule.custom((openInNewTab, context: any) => {
          const hasLink = context.parent?.hasLink;
          const linkType = context.parent?.type;

          if (hasLink && linkType === 'external' && openInNewTab === undefined) {
            return 'You have to choose if the link should open in a new tab or not';
          }
          return true;
        })
    })
  ]
});
