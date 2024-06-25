import { env } from '@/env'
import { apiVersion, dataset, projectId, studioUrl } from '@/lib/sanity/api'
import { createClient } from '@sanity/client/stega'

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: env.SANITY_ADMIN_API_TOKEN,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  // useCdn: revalidateSecret ? false : true,
  useCdn: false,
  perspective: 'published',
  stega: {
    studioUrl
    // logger: console,
  }
})
