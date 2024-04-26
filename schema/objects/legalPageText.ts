import { Image, Link } from '@phosphor-icons/react';
import { defineArrayMember, defineField } from 'sanity';

export const legalPageText = defineField({
  name: 'legalPageText',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      lists: [
        {
          title: 'Bulleted list',
          value: 'bullet'
        },
        {
          title: 'Numbered list',
          value: 'number'
        }
      ],
      marks: {
        annotations: [
          {
            name: 'inlineLink',
            type: 'object',
            title: 'Inline link',
            icon: Link,
            fields: [
              defineField({
                title: 'Lenke',
                name: 'link',
                type: 'linkWithoutText'
              })
            ]
          }
        ],
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
      styles: [
        {
          title: 'Text (Normal)',
          value: 'text-md'
        },
        {
          title: 'H2',
          value: 'h2'
        },
        {
          title: 'H3',
          value: 'h3'
        }
      ],
      type: 'block'
    }),
    {
      type: 'figure',
      name: 'figure',
      title: 'Image',
      icon: Image
    }
  ]
});
