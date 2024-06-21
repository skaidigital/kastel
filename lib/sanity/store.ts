import { client } from '@/lib/sanity/client';
import { token } from '@/lib/sanity/token';
import * as queryStore from '@sanity/react-loader';
import { draftMode } from 'next/headers';

queryStore.setServerClient(client.withConfig({ token }));

// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const { perspective } = options;

  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate: !draftMode().isEnabled ? 60 : 0,
      ...(options.next || {})
    },
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    useCdn: perspective === 'previewDrafts' ? false : true,
    stega: draftMode().isEnabled
  });
}) satisfies typeof queryStore.loadQuery;
