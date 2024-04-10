import { defineField, defineType } from 'sanity';

export const productOptionConfig = defineType({
  title: 'Product option config',
  name: 'productOptionConfig',
  type: 'object',
  preview: {
    select: {
      title: 'optionType.title.en',
      options: 'options'
    },
    prepare: ({ title, options }) => {
      const optionCount = options?.length || 0;

      return {
        title: `${title} (${optionCount})`
      };
    }
  },
  fields: [
    defineField({
      title: 'Option type',
      name: 'optionType',
      type: 'reference',
      to: [{ type: 'productOptionType' }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      title: 'Options',
      name: 'options',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [
        defineField({
          title: 'Option',
          name: 'option',
          type: 'reference',
          to: [{ type: 'productOption' }],
          validation: (Rule) =>
            Rule.custom(async (option: any, context: any) => {
              const client = context.getClient({ apiVersion: '2024-01-08' });
              const path = context.path;

              const productOptionType = context.document?.options?.find(
                (option: any) => option._key === path[1]?._key
              )?.optionType?._ref;

              const currentOption = option?._ref;
              const currentOptionProductOptionRef = await client.fetch(
                `*[_id == "${currentOption}"][0].type._ref`
              );

              if (!productOptionType || !currentOptionProductOptionRef) {
                return true;
              }

              if (productOptionType !== currentOptionProductOptionRef) {
                return 'Option type must match product option type';
              }

              return true;
            }),
          options: {
            filter: ({ document, parentPath }: any) => {
              const optionType = document.options?.find(
                (option: any) => option._key === parentPath[1]?._key
              )?.optionType;
              const optionTypeRef = optionType?._ref;

              if (!optionTypeRef) {
                return {};
              }

              const alreadyAddedOptions = document.options?.find(
                (option: any) => option.optionType?._ref === optionTypeRef
              )?.options;

              const alreadyAddedOptionsRefs = alreadyAddedOptions?.map(
                (option: any) => option._ref
              );

              return {
                filter: '!(_id in $selectedItems)',
                params: {
                  selectedItems: alreadyAddedOptionsRefs || []
                }
              };
            }
          }
        })
      ]
    })
  ]
});
