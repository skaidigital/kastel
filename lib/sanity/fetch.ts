// import 'server-only';

// import type { QueryParams } from '@sanity/client';
// import { env } from '@/env.mjs';
// import { client } from '@/lib/sanity';
// import { draftMode } from 'next/headers';

// const DEFAULT_PARAMS = {} as QueryParams;
// const DEFAULT_TAGS = [] as string[];

// const READ_TOKEN = env.SANITY_API_READ_TOKEN;

// export async function sanityFetch<QueryResponse>({
//   query,
//   params = DEFAULT_PARAMS,
//   tags = DEFAULT_TAGS,
// }: {
//   query: string;
//   params?: QueryParams;
//   tags: string[];
// }): Promise<QueryResponse> {
//   const isDraftMode = draftMode().isEnabled;
//   if (isDraftMode && !READ_TOKEN) {
//     throw new Error(
//       'The `SANITY_API_READ_TOKEN` environment variable is required.'
//     );
//   }

//   return client.fetch<QueryResponse>(query, params, {
//     cache: 'force-cache',
//     ...(isDraftMode && {
//       cache: undefined,
//       token: READ_TOKEN,
//       perspective: 'previewDrafts',
//     }),
//     next: {
//       ...(isDraftMode && { revalidate: 30 }),
//       tags,
//     },
//   });
// }
