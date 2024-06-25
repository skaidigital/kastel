import { defineArrayMember, defineField, defineType } from 'sanity'

export const qna = defineType({
  title: 'Spørsmål og svar',
  name: 'qna',
  type: 'object',
  fields: [
    defineField({
      title: 'Overskrift',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Overskrift er påkrevd')
    }),
    defineField({
      title: 'Spørsmål og svar',
      name: 'qna',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Spørsmål og svar',
          name: 'qna',
          type: 'object',
          fields: [
            defineField({
              title: 'Spørsmål',
              name: 'question',
              type: 'string',
              validation: (Rule) => Rule.required().error('Spørsmål er påkrevd')
            }),
            defineField({
              title: 'Svar',
              name: 'answer',
              type: 'richText',
              validation: (Rule) => Rule.required().error('Svar er påkrevd')
            })
          ]
        })
      ]
    })
  ]
})
