import { type QueryParams, type UseQueryOptionsDefinedInitial } from '@sanity/react-loader/rsc';

import { queryStore } from './createQueryStore';

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <QueryResponseResult = unknown, QueryResponseError = unknown>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptionsDefinedInitial<QueryResponseResult>
) => {
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    options
  );

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return snapshot;
};
