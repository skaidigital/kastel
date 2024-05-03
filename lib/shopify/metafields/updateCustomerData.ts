import { METAFIELDS } from '@/data/constants';
import { shopifyAdminQuery } from '../admin';
import { customerAccountFetch } from '../customer';
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
    console.error('Error updating customer name', updateCustomerNameResponse);
    success = false;
  }

  // Update customer metadata for user
  const updateCustomerDataResponse = await shopifyAdminQuery(metafieldsSetMutation, { metafields });

  if (!updateCustomerDataResponse) {
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
  const res = await customerAccountFetch<CustomerUpdateData>({
    query: updateCustomerInformation,
    variables: {
      customer: {
        firstName: fistName,
        lastName: lastName
      }
    },
    cache: 'no-store'
  });

  return res.body.data?.customerUpdate?.customer || null;
}

const updateCustomerInformation = /* GraphQL */ `
  mutation customerUpdate($customer: CustomerUpdateInput!) {
    customerUpdate(input: $customer) {
      customer {
        id
        firstName
        lastName
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
  };
};
