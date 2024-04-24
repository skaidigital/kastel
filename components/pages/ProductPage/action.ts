'use server';

import { cookies } from 'next/headers';

export async function handleSetGenderClick(gender: 'male' | 'female') {
  cookies().set('gender', gender, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax'
  });
}
