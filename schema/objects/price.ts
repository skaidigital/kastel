import { currencies } from '@/data/currencies'

// Define the custom 'price' type
export const price = {
  title: 'Price',
  name: 'price',
  type: 'object',
  fields: [
    {
      title: 'Amount',
      name: 'amount',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).precision(2) // Validates that the number is positive and allows up to two decimal places
    },
    {
      title: 'Currency Code',
      name: 'currencyCode',
      type: 'string',
      options: {
        list: currencies.map((currency) => {
          return { title: currency, value: currency }
        })
      }
    }
  ]
}
