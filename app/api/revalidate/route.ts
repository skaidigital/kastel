import { env } from '@/env';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

const revalidateSecret = env.SANITY_REVALIDATE_SECRET;

// TODO see if we can extend this one
export async function POST(req: NextRequest) {
  try {
    console.log('Revalidating cache for Sanity');

    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, revalidateSecret);

    console.log('Body', body);

    if (!isValidSignature) {
      console.log('Invalid signature');

      const message = 'Invalid signature';
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      console.log('Missing type');

      return new Response('Bad Request', { status: 400 });
    }

    if (body.slug) {
      console.log('Revalidating this slug', body.slug);

      revalidateTag(`${body._type}:${body.slug}`);

      // setTimeout(() => {
      //   revalidateTag(`${body._type}:${body.slug}`);
      // }, 2000);
    } else {
      console.log('Revalidating this type', body._type);

      revalidateTag(body._type);

      // setTimeout(() => {
      //   revalidateTag(body._type);
      // }, 2000);
    }
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
