'server only';

import { client } from '@/lib/sanity/client';

// TODO find out how to type variables and validator
interface SanityQueryProps {
  query: string;
  validator: any;
  variables?: any;
}

export async function sanityQuery<T>({
  query,
  variables,
  validator
}: SanityQueryProps): Promise<{ success: true; data: T } | { success: false }> {
  try {
    const response = await client.fetch<T>(query, variables);

    const validatedResponse = validator.safeParse(response);

    if (!validatedResponse.success) {
      console.error('error', validatedResponse.error);
      return {
        success: false
      };
    }

    return { success: true, data: validatedResponse.data };
  } catch (error: any) {
    console.error('error', error);
    return { success: false };
  }
}
