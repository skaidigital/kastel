import { defineField, defineType } from 'sanity'

export const settingsPaymentProviders = defineType({
  title: 'Payment providers',
  name: 'settingsPaymentProviders',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Payment providers'
      }
    }
  },
  fields: [
    defineField({
      title: 'Payment providers 🇧🇻',
      name: `paymentProviders_no`,
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        defineField({
          title: 'Payment provider',
          name: 'paymentProvider',
          type: 'paymentProvider',
          validation: (Rule) => Rule.required()
        })
      ]
    }),
    defineField({
      title: 'Payment providers 🇸🇪',
      name: `paymentProviders_sv`,
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        defineField({
          title: 'Payment provider',
          name: 'paymentProvider',
          type: 'paymentProvider',
          validation: (Rule) => Rule.required()
        })
      ]
    })
  ]
})
