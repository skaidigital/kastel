import { Link } from '@phosphor-icons/react';
import { defineArrayMember, defineField } from 'sanity';

export const richText = defineField({
  name: 'richText',
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
            title: 'Lenke i tekst',
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
          },
          {
            title: 'Muted / Grey text',
            value: 'muted'
          }
        ]
      },
      styles: [
        {
          title: 'Paragraph (normal)',
          value: 'normal'
        },
        {
          title: 'H2',
          value: 'h2'
        },
        {
          title: 'H3',
          value: 'h3'
        },
        {
          title: 'Paragraph (small)',
          value: 'small'
        },
        {
          title: 'Paragraph (large)',
          value: 'large'
        }
      ],
      type: 'block'
    }),
    {
      type: 'mux.video',
      name: 'video',
      title: 'Video'
    },
    {
      type: 'figure',
      name: 'figure',
      title: 'Image'
    }
  ]
});
