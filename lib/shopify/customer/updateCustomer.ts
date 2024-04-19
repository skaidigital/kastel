import { UserError } from '@/app/(site)/[market]/[lang]/shopify/types';
import { customerAccountFetch } from '@/lib/shopify/customer';

type Input = {
  firstName: string;
  lastName: string;
};

type ShopifyResponse = {
  data: {
    customerUpdate: {
      customer: {
        firstName: string;
        lastName: string;
      };
      userErrors: UserError[];
    };
  };
  variables: {
    input: Input;
  };
};

const customerUpdateMutation = /* GraphQL */ `
  mutation customerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customerAddress {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Function to execute the mutation
export async function updateCustomer(input: Input) {
  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerUpdateMutation,
    variables: {
      input
    },
    cache: 'no-store'
  });

  return res.body.data.customerUpdate.customer || null;
}
