import { defineField, defineType } from 'sanity';

const PAYMENT_PROVIDERS = [
  { title: 'Visa', value: 'visa' },
  { title: 'MasterCard', value: 'mastercard' },
  { title: 'Vipps', value: 'vipps' },
  { title: 'Klarna', value: 'klarna' },
  { title: 'PayPal', value: 'paypal' }
];

export const paymentProvider = defineType({
  title: 'Payment provider',
  name: 'paymentProvider',
  type: 'object',
  preview: {
    select: {
      title: 'paymentProvider'
    },
    prepare({ title }) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.substring(1) : 'Ikke valgt enda',
        subtitle: 'Betalingsalternativ'
      };
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
});
