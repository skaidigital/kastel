'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { env } from '@/env';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { cookies } from 'next/headers';

export async function getSmilePoints() {
  let customerEmail = cookies().get(COOKIE_NAMES.CUSTOMER_EMAIL)?.value;
  if (!customerEmail) {
    customerEmail = await getCustomerEmail();
  }

  if (!customerEmail) {
    return 0;
  }

  const smileResponse = await fetch(`https://api.smile.io/v1/customers?email=${customerEmail}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.SMILE_API_KEY}`
    }
  });

  const customer = await smileResponse.json();
  const points = customer.customers[0]?.points_balance || 0;

  return points;
}

export async function getCustomerEmail() {
  const customerEmailResponse = await customerAccountFetch<CustomerEmail>({
    query: getCustomerEmailQuery
  });

  const customerEmail =
    customerEmailResponse?.body?.data?.customer?.emailAddress?.emailAddress || undefined;

  return customerEmail;
}

export async function getCustomerId() {
  const customerEmailResponse = await customerAccountFetch<CustomerEmail>({
    query: getCustomerEmailQuery
  });

  const customerId = customerEmailResponse?.body?.data?.customer?.id || undefined;

  console.log(customerId);

  return customerId;
}

type CustomerEmail = {
  data: {
    customer: {
      id: string;
      emailAddress: EmailAddress;
    };
  };
};

type EmailAddress = {
  emailAddress: string;
};

const getCustomerEmailQuery = /* GraphQL */ `
  query getCustomerEmail {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
