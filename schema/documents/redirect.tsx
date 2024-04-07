import { MARKETS } from '@/data/constants';
import { getMarketFlag } from '@/lib/utils';
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
      market: 'market'
    },
    prepare({ source, destination, permanent, market }) {
      const marketFlag = getMarketFlag(market);
      return {
        title: `/${source} → /${destination} ${permanent ? '(permanent)' : ''}`,
        subtitle: market ? marketFlag : 'Market not set'
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
      title: 'Market',
      name: 'market',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: MARKETS.map((market) => ({
          title: market.name,
          value: market.id
        }))
      }
    }),
    defineField({
      title: 'From',
      description: (
        <>
          I.e. <code>course/visma</code>. Remember NOT to write &rsquo;/&rsquo; first.
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
          I.e. <code>course/visma-2</code>. Remember NOT to write &rsquo;/&rsquo; first.
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
