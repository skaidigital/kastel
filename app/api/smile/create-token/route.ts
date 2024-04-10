import jwt from 'jsonwebtoken';

const SECRET_SMILE_PRIVATE_KEY = 'int_BTtWcvsm18Ard1LDAECZ';

export async function GET(request: Request) {
  const customer_id = '100'; // This should be dynamically determined based on the logged-in user
  const private_key = SECRET_SMILE_PRIVATE_KEY;

  const payload = {
    customer_identity: { distinct_id: customer_id },
    exp: Math.floor(Date.now() / 1000) + 300 // Expires in 5 minutes
  };

  const signedJwt = jwt.sign(payload, private_key, { algorithm: 'HS256' });

  return new Response(JSON.stringify({ token: signedJwt }), {
    status: 200
  });
}
