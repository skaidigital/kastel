import { LANGS } from '@/data/constants';
import { getLangFlag } from '@/lib/utils';
import { Signpost } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const redirect = defineType({
  title: 'Redirect',
  name: 'redirect',
  type: 'document',
  icon: Signpost,
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
      lang: 'lang'
    },
    prepare({ source, destination, permanent, lang }) {
      const marketFlag = getLangFlag(lang);
      return {
        title: `/${source} → /${destination} ${permanent ? '(permanent)' : ''}`,
        subtitle: lang ? marketFlag : 'Language not set'
      };
    }
  },
  fields: [
    defineField({
      title: 'How do redirects work?',
      description:
        'If you have a page / URL and you want to redirect it to another page / URL, you can do so here. Remember to set the market, source and destination. The source and destination should be the path of the URL, without the domain. I.e. /course/visma-2',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Language',
      name: 'lang',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'no',
      options: {
        list: LANGS.map((lang) => ({
          title: lang.name,
          value: lang.id
        }))
      }
    }),
    defineField({
      title: 'From',
      description: (
        <>
          I.e. <code>some-page</code>. Remember NOT to write &rsquo;/&rsquo; first.
        </>
      ),
      name: 'source',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'To',
      description: (
        <>
          I.e. <code>new-route-for-page</code>. Remember NOT to write &rsquo;/&rsquo; first.
        </>
      ),
      name: 'destination',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Permanent?',
      description: 'Check this if the redirect is permanent.',
      name: 'permanent',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    })
  ],
  orderings: [
    {
      title: 'Source',
      name: 'source',
      by: [{ field: 'source', direction: 'asc' }]
    },
    {
      title: 'Market',
      name: 'market',
      by: [{ field: 'market', direction: 'asc' }]
    }
  ]
});
