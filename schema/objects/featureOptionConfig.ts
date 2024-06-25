import { FeaturedOptionField } from '@/components/sanity/CustomField'
import { defineField, defineType } from 'sanity'

export const featureOptionConfig = defineType({
  title: 'Feature option config',
  name: 'featureOptionConfig',
  type: 'object',
  preview: {
    select: {
      title: 'optionType.title_no',
      options: 'options'
    },
    prepare: ({ title, options }) => {
      const optionCount = options?.length || 0

      return {
        title: `${title} (${optionCount})`
      }
    }
  },
  fields: [
    defineField({
      title: 'Featured options',
      name: 'featuredOptions',
      type: 'array',
      components: {
        field: FeaturedOptionField
      },
      validation: (Rule) => Rule.max(3),
      of: [
        defineField({
          title: 'Featured option',
          name: 'featuredOption',
          type: 'reference',
          to: [{ type: 'productOption' }],
          options: {
            filter: ({ document, parentPath }: any) => {
              const optionType = document.options?.find(
                (option: any) => option._key === parentPath[1]?._key
              )?.optionType
              const optionTypeRef = optionType?._ref

              if (!optionTypeRef) {
                return {}
              }

              const filter = `type._ref == "${optionTypeRef}"`

              return {
                filter
              }
            }
          }
        })
      ]
    })
  ]
})
