import { PAYMENT_PROVIDERS } from '@/data/constants'
import { defineField, defineType } from 'sanity'

export const paymentProvider = defineType({
  title: 'Payment provider',
  name: 'paymentProvider',
  type: 'object',
  preview: {
    select: {
      provider: 'paymentProvider'
    },
    prepare({ provider }) {
      const prov = PAYMENT_PROVIDERS.find((p) => p.value === provider)
      const title = prov ? prov.title : 'Ikke valgt enda'
      const icon = prov ? prov.icon : null
      return {
        title: title || 'Not selected',
        subtitle: 'Payment provider',
        media: icon ? icon : null
      }
    }
  },
  fields: [
    defineField({
      title: 'Payment provider',
      name: 'paymentProvider',
      type: 'string',
      options: {
        list: PAYMENT_PROVIDERS
      }
    })
  ]
})
