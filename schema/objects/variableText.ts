import { defineArrayMember, defineField } from 'sanity'

// ? Allows you to edit text, but not size or anything like that
export const variableText = defineField({
  name: 'variableText',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em'
          },
          {
            title: 'Bold',
            value: 'strong'
          }
        ]
      },
      // styles: [
      //   {
      //     title: 'Text (Normal)',
      //     value: 'text-md'
      //   },
      //   {
      //     title: 'H2',
      //     value: 'h2'
      //   },
      //   {
      //     title: 'H3',
      //     value: 'h3'
      //   },
      //   {
      //     title: 'H4',
      //     value: 'h4'
      //   },
      //   {
      //     title: 'Text (Large)',
      //     value: 'text-lg'
      //   },
      //   {
      //     title: 'Text (Small)',
      //     value: 'text-sm'
      //   }
      // ],
      type: 'block'
    })
  ]
})
