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
  fields: [
    defineField({
      title: 'Payment providers 🇧🇻',
      name: `paymentProviders_no`,
      type: 'array',
      of: [
        defineField({
          title: 'Payment provider',
          name: 'paymentProvider',
          type: 'paymentProvider'
        })
      ]
    }),
    defineField({
      title: 'Payment providers 🇸🇪',
      name: `paymentProviders_sv`,
      type: 'array',
      of: [
        defineField({
          title: 'Payment provider',
          name: 'paymentProvider',
          type: 'paymentProvider'
        })
      ]
    })
  ]
});
