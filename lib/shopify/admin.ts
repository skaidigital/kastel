import { env } from '@/env';
import { lastThrottleStatus, updateLastThrottleStatus } from './helpers';
import { ShopifyResponse } from './types';
import { ThrottleStatusSchema } from './validators';

export const trottleTreshold = 200;

/** Shopify admin client with improved throttling handling */
export const shopifyAdminQuery = async (
  query: string,
  data?: any,
  cache: RequestCache = 'default',
  retryCount = 0
): Promise<ShopifyResponse> => {
  const domain = env.SHOPIFY_STORE_DOMAIN;
  const accessToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const graphQlEndpoint = env.SHOPIFY_GRAPHQL_API_ENDPOINT;

  const URL = `${domain}/admin${graphQlEndpoint}`;

  const variables = data ?? null;

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ query, variables }),
    cache: cache
  };

  try {
    await dynamicSleep();

    const response = await fetch(URL, options);
    const responseData = (await response.json()) as ShopifyResponse;

    if (responseData.extensions && responseData.extensions.cost.throttleStatus) {
      updateLastThrottleStatus(responseData.extensions.cost.throttleStatus);
    }

    // Check for top-level errors (such as "Throttled")
    if (responseData.errors && responseData.errors.length > 0) {
      const firstError = responseData.errors[0]?.message;
      if (firstError === 'Throttled') {
        return await handleThrottling(responseData, query, variables, retryCount);
      }
      throw new Error(`GraphQL query failed: ${firstError}`);
    }

    // Dynamically check for userErrors in each key of the data object
    for (const key in responseData.data) {
      if (responseData.data[key]?.userErrors?.length ?? 0 > 0) {
        // Use the non-null assertion operator (!) to indicate that userErrors[0] is definitely defined
        const firstUserError = responseData.data[key]?.userErrors![0];
        throw new Error(
          `GraphQL query user error: ${
            firstUserError?.message || 'Unknown error, missing error message'
          }`
        );
      }
    }

    return responseData;
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    throw new Error('Failed to execute GraphQL query');
  }
};

async function handleThrottling(data: any, query: string, variables: any, retryCount: number) {
  const maxRetries = 5;
  const throttleStatus: ThrottleStatusSchema = data.extensions.cost.throttleStatus;
  const sleepTime = calculateSleepTime(throttleStatus, retryCount);

  if (retryCount < maxRetries) {
    await sleep(sleepTime);
    return shopifyAdminQuery(query, variables, 'default', retryCount + 1);
  } else {
    throw new Error('Max retries reached for throttled request');
  }
}

function calculateSleepTime(throttleStatus: ThrottleStatusSchema, retryCount: number) {
  const baseSleepTime = throttleStatus.currentlyAvailable * 50;

  // Exponential backoff factor
  const backoffFactor = Math.pow(2, retryCount);

  // Adjust sleep time based on retry count and throttle status
  return Math.max(baseSleepTime, 1000) * backoffFactor;
}

async function dynamicSleep() {
  if (lastThrottleStatus) {
    const threshold = trottleTreshold; // Set this based on your requirement
    if (lastThrottleStatus.currentlyAvailable < threshold) {
      const delay = calculateDelayBasedOnAvailability(lastThrottleStatus);
      await sleep(delay);
    }
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateDelayBasedOnAvailability(throttleStatus: ThrottleStatusSchema): number {
  // Calculate delay based on the currentlyAvailable value
  // For example, you might use a linear or exponential function to determine the delay
  const factor = Math.max(throttleStatus.maximumAvailable - throttleStatus.currentlyAvailable, 1);
  return factor * 10; // Adjust this calculation as needed
}
