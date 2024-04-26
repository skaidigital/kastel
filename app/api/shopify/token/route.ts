import { cookies } from 'next/headers';

export async function GET() {
  const refreshToken = cookies().get('refreshToken');
  if (!refreshToken) {
    return new Response('No refresh token', { status: 401 });
  }
  return new Response('Hello world - Get ');
}

export async function POST() {
  cookies().set('refreshToken', 'testing', {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax'
  });
  return new Response('Hello world - Post');
}
