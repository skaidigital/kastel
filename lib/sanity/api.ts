import { env } from '@/env';

export const projectId = assertValue(
  env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env.NEXT_PUBLIC_SANITY_PROJECT_ID'
);
export const dataset = assertValue(
  env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env.NEXT_PUBLIC_SANITY_DATASET'
);

export const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-11-15';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = '/studio';
