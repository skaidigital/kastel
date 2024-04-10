import { defineField, defineType } from 'sanity';

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
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 2
      },
      validation: (Rule) =>
        Rule.custom((value: any, context: any) => {
          if (context?.parent && context?.parent?.type && context?.parent?.type === 'productCard') {
            return true;
          }

          const hasNo = value && value?.no;
          const hasEn = value && value?.en;

          if (!hasNo || !hasEn) {
            return [
              !hasNo && { message: 'You must provide a Norwegian translation', paths: ['no'] },
              !hasEn && { message: 'You must provide an English translation', paths: ['en'] }
            ].filter(Boolean);
          }
          return true;
        }),
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
            return 'Product is required';
          }
          return true;
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
      details: 'details.en',
      product: 'product.title.en',
      x: 'x',
      y: 'y'
    },
    prepare({ type, details, product, x, y }) {
      const title = type === 'productCard' ? product : details;
      return {
        title: title || 'Untitled',
        subtitle: x && y ? `${x}% x ${y}%` : `No position set`
      };
    }
  }
});
