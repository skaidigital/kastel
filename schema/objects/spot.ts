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
            return true; // Immediately return true if the parent's type is 'productCard'
          }

          const hasNo = value && value?.no;
          const hasEn = value && value?.en;

          if (!hasNo || !hasEn) {
            let errorMessage = 'You must provide:';
            if (!hasNo) errorMessage += ' a Norwegian translation';
            if (!hasNo && !hasEn) errorMessage += ' and';
            if (!hasEn) errorMessage += ' an English translation';
            return errorMessage; // Construct and return a single error message string
          }

          return true; // Validation successful
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
