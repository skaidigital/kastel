import { env } from '@/env';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { customer_id } = await request.json(); // This should be dynamically determined based on the logged-in user

  const private_key = env.SMILE_API_KEY;

  const smileJwt = cookies().get('smile_jwt')?.value;

  if (smileJwt) {
    return new Response(JSON.stringify({ token: smileJwt }), {
      status: 200
    });
  }

  try {
    const payload = {
      customer_identity: { distinct_id: customer_id },
      exp: Math.floor(Date.now() / 1000) + 300 // Expires in 5 minutes
    };

    const signedJwt = jwt.sign(payload, private_key, { algorithm: 'HS256' });

    cookies().set('smile_jwt', signedJwt, {
      path: '/',
      secure: true
      // httpOnly: true // Uncomment this line for production
    });
    return new Response(JSON.stringify({ token: signedJwt }), {
      status: 200
    });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
}
