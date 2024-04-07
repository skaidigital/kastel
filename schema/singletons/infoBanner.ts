import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { ValidationContext, defineField, defineType } from 'sanity';

export const infoBanner = defineType({
  title: 'Info-fane',
  name: 'infoBanner',
  type: 'document',
  icon: SpeakerLoudIcon,
  preview: {
    prepare() {
      return {
        title: 'Info-fane'
      };
    }
  },
  fields: [
    defineField({
      title: 'Show banner?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'i18n.text',
      validation: (Rule: any) =>
        Rule.custom((field: any, context: ValidationContext) => {
          const hasNo = field?.no;
          const hasSv = field?.sv;
          const hasDk = field?.dk;
          const hasEu = field?.eu;

          if (!context.document?.isShown) {
            return true;
          }

          if (!hasNo || !hasSv || !hasDk || !hasEu) {
            return [
              !hasNo && { message: 'You must provide a Norwegian translation', paths: ['no'] },
              !hasSv && { message: 'You must provide a Swedish translation', paths: ['sv'] },
              !hasDk && { message: 'You must provide a Danish translation', paths: ['dk'] },
              !hasEu && { message: 'You must provide a European translation', paths: ['eu'] }
            ].filter(Boolean);
          }
          return true;
        })
    }),
    defineField({
      title: 'Link',
      name: 'linkWithoutText',
      type: 'linkWithoutText'
    })
  ]
});
