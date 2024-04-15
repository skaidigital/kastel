import { METAFIELDS } from '@/data/constants';
import { cookies } from 'next/headers';
import { shopifyFetch } from '..';
import { shopifyAdminQuery } from '../admin';
import { metafieldsSetMutation } from './query';

interface CustomerData {
  customerGid: string;
  data: {
    firstName: string;
    lastName: string;
    isPrompted?: boolean;
    footLength?: string;
    style?: string;
    color?: string;
  };
}

export async function updateCustomerData({ customerGid, data }: CustomerData) {
  const metafields = [
    {
      key: METAFIELDS.customer.customer_data.key,
      namespace: METAFIELDS.customer.customer_data.namespace,
      type: METAFIELDS.customer.customer_data.type,
      ownerId: customerGid,
      value: JSON.stringify({
        isPrompted: data.isPrompted,
        footLength: data.footLength,
        style: data.style,
        color: data.color
      })
    }
  ];
  let success: boolean = true;
  // Update first and last name
  const updateCustomerNameResponse = await updateCustomerName(data.firstName, data.lastName);

  if (!updateCustomerNameResponse) {
    console.log('Error updating customer name', updateCustomerNameResponse);
    success = false;
  }

  // Update customer metadata for user
  const updateCustomerDataResponse = await shopifyAdminQuery(metafieldsSetMutation, { metafields });

  if (!updateCustomerDataResponse) {
    console.log('Error updating customer data', updateCustomerDataResponse);
    success = false;
  }

  const updatedMetaData =
    (updateCustomerDataResponse?.data.metafieldsSet &&
      JSON.parse(updateCustomerDataResponse?.data.metafieldsSet?.metafields[0]?.value)) ||
    {};

  const responseForm: CustomerData['data'] = {
    firstName: updateCustomerNameResponse.firstName || '',
    lastName: updateCustomerNameResponse.lastName || '',
    isPrompted: updatedMetaData.isPrompted || false,
    footLength: updatedMetaData.footLength || '',
    style: updatedMetaData.style || '',
    color: updatedMetaData.color || ''
  };

  return { success, responseForm };
}

async function updateCustomerName(fistName: string, lastName: string) {
  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('No access token');
  }

  const res = await shopifyFetch<CustomerUpdateData>({
    query: updateCustomerInformation,
    variables: {
      customer: {
        firstName: fistName,
        lastName: lastName
      },
      customerAccessToken: accessToken
    },
    cache: 'no-store'
  });

  return res.body.data?.customerUpdate?.customer || null;
}

const updateCustomerInformation = /* GraphQL */ `
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customer {
        id
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type CustomerUpdateData = {
  data: {
    customerUpdate: {
      customer: {
        id: string;
        firstName: string;
        lastName: string;
      };
      customerUserErrors: {
        code: string;
        field: string;
        message: string;
      };
    };
  };
  variables: {
    customer: {
      firstName: string;
      lastName: string;
    };
    customerAccessToken: string;
  };
};
