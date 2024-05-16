'use client';

import { useEffect } from 'react';

let init = false;

interface Props {
  email: string;
  firstName: string;
  lastName: string;
}

export function KlaviyoIdentify({ email, firstName, lastName }: Props) {
  useEffect(() => {
    if (!init) {
      init = true;
      const _learnq = window._learnq || [];
      _learnq.push([
        'identify',
        {
          $email: email,
          $first_name: firstName,
          $last_name: lastName
        }
      ]);
    }
  });
  return null;
}
