'use server';

import * as queryStore from '@sanity/react-loader';

import { client } from '@/lib/sanity/client';
import { token } from '@/lib/sanity/token';

queryStore.setServerClient(client.withConfig({ token }));

export const loadQuery = async <T>(query: string, params = {}, options: any = {}) => {
  const { perspective = 'published', stega = { enabled: false } } = options;

  return queryStore.loadQuery<T>(query, params, {
    ...options,
    perspective,
    stega
  }) as Promise<T>;
};
