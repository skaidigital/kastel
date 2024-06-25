import { defineField, defineType } from 'sanity'

export const spot = defineType({
  name: 'spot',
  type: 'object',
  fieldsets: [{ name: 'position', options: { columns: 2 } }],
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Product card', value: 'productCard' }
        ]
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Details',
      name: 'details',
      type: 'string',
      hidden: true
    }),
    defineField({
      title: 'Description 🇧🇻',
      name: 'description_no',
      type: 'text',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context?.parent?.type === 'text' && !value) {
            return 'Description is required'
          }

          return true
        }),
      rows: 3,
      hidden: ({ parent }) => parent?.type && parent?.type !== 'text'
    }),
    defineField({
      title: 'Description 🇬🇧',
      name: 'description_en',
      type: 'text',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context?.parent?.type === 'text' && !value) {
            return 'Description is required'
          }

          return true
        }),
      rows: 3,
      hidden: ({ parent }) => parent?.type && parent?.type !== 'text'
    }),
    defineField({
      title: 'Description 🇸🇪',
      name: 'description_sv',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.type && parent?.type !== 'text'
    }),
    defineField({
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (
            context?.parent &&
            context?.parent?.type &&
            context.parent?.type === 'productCard' &&
            !value
          ) {
            return 'Product is required'
          }
          return true
        }),
      hidden: ({ parent }) => parent?.type && parent?.type !== 'productCard'
    }),
    defineField({
      name: 'x',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100)
    }),
    defineField({
      name: 'y',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100)
    })
  ],
  preview: {
    select: {
      type: 'type',
      details: 'description_en',
      product: 'product.title.en',
      x: 'x',
      y: 'y'
    },
    prepare({ type, details, product, x, y }) {
      const title = type === 'productCard' ? product : details
      return {
        title: title || 'Untitled',
        subtitle: x && y ? `${x}% x ${y}%` : `No position set`
      }
    }
  }
})
