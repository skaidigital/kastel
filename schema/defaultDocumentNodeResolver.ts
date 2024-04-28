import { JsonPreview } from '@/components/sanity/JsonPreview';
import DocumentsPane from 'sanity-plugin-documents-pane';
import type { DefaultDocumentNodeResolver } from 'sanity/structure';

export const defaultDocumentNodeResolver = (): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    const form = S.view.form();
    switch (schemaType) {
      case 'page':
        return S.document().views([
          form,
          S.view.component(JsonPreview).title('JSON'),

          S.view
            .component(DocumentsPane)
            .options({
              query: `*[references($id)]`,
              params: { id: '_id' },
              options: { perspective: 'previewDrafts' }
            })
            .title('References')
        ]);
      case 'productType':
        return S.document().views([
          form,
          S.view
            .component(DocumentsPane)
            .options({
              query: `*[references($id)]`,
              params: { id: '_id' },
              options: { perspective: 'previewDrafts' }
            })
            .title('References')
        ]);
      case 'product':
        return S.document().views([
          form,
          S.view.component(JsonPreview).title('JSON'),
          S.view
            .component(DocumentsPane)
            .options({
              query: `*[references($id)]`,
              params: { id: '_id' },
              options: { perspective: 'previewDrafts' }
            })
            .title('References')
        ]);
      case 'sizeChart':
        return S.document().views([
          form,
          S.view.component(JsonPreview).title('JSON'),
          S.view
            .component(DocumentsPane)
            .options({
              query: `*[references($id)]`,
              params: { id: '_id' },
              options: { perspective: 'previewDrafts' }
            })
            .title('References')
        ]);
      case 'productVariant':
        return S.document().views([form]);
      case 'collection':
        return S.document().views([
          form,
          S.view
            .component(DocumentsPane)
            .options({
              query: `*[references($id)]`,
              params: { id: '_id' },
              options: { perspective: 'previewDrafts' }
            })
            .title('References')
        ]);
      default:
        return S.document();
    }
  };
};
