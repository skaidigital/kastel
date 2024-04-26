import { CACHE_TAGS, SANITY_SINGLETON_DOCUMENT_IDS } from '@/data/constants';
import { env } from '@/env';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

const revalidateSecret = env.SANITY_REVALIDATE_SECRET;

// TODO see if we can extend this one
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, revalidateSecret);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    if (body._type === SANITY_SINGLETON_DOCUMENT_IDS.USPS) {
      revalidateTag(CACHE_TAGS.USPS);
    } else if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`);
    } else {
      revalidateTag(body._type);
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
