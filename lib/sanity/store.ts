import * as queryStore from '@sanity/react-loader';

import { client } from '@/lib/sanity/client';
import { token } from '@/lib/sanity/token';
import { draftMode } from 'next/headers';

queryStore.setServerClient(client.withConfig({ token }));

export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
    stega = { enabled: draftMode().isEnabled }
  } = options;

  return queryStore.loadQuery(query, params, {
    ...options,
    perspective,
    stega
  });
}) satisfies typeof queryStore.loadQuery;
