import { MARKETS } from '@/data/constants';
import { defineField, defineType } from 'sanity';

export const settingsPaymentProviders = defineType({
  title: 'Payment providers',
  name: 'settingsPaymentProviders',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Payment providers'
      };
    }
  },
  groups: [
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag,
      default: market.id === 'no'
    }))
  ],
  fields: [
    ...MARKETS.map((market) =>
      defineField({
        title: 'Payment providers',
        name: `paymentProviders_${market.id}`,
        group: market.id,
        type: 'array',
        of: [
          defineField({
            title: 'Payment provider',
            name: 'paymentProvider',
            type: 'paymentProvider'
          })
        ]
      })
    )
  ]
});
