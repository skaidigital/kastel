import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import { ProductRating } from '@/components/lipscore/ProductScore';
import { getLipscoreReviews } from '@/components/lipscore/hook';
import { SmileButton } from '@/components/smile/Button';
import { getSmilePoints } from '@/components/smile/hooks';
import { SMILE_DEEP_LINKS } from '@/data/constants';
import { createCustomerAccessToken } from '@/lib/shopify';
import {
  addItemToWishlist,
  removeItemFromWishlist
} from '@/lib/shopify/metafields/adjustItemInWishlist';
import { getCustomerData } from '@/lib/shopify/metafields/getCustomerData';
import { getWishlist } from '@/lib/shopify/metafields/getWishlist';
import { isItemInWishlist } from '@/lib/shopify/metafields/isItemInWishlist';
import { updateCustomerData } from '@/lib/shopify/metafields/updateCustomerData';
import { cookies } from 'next/headers';

export default async function Page() {
  let accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    const token = await createCustomerAccessToken('petter@skaidigital.com', 'testtest');
    accessToken = token.accessToken;
    console.log(token);
  }

  // Constants for testing
  // Same as smile init const customerId = '7292377628922';
  const email = 'olgaterese@gmail.com';
  const customerGid = 'gid://shopify/Customer/7742157848805';
  const gid = 'gid://shopify/Product/8618931388645';
  const productSku = 'SOL002-002-021-40';

  // ----------------------------
  // Testing wishlist functions
  // ----------------------------
  const data = await getWishlist();
  let removeItemResponse;
  let addItemResponse;

  const isInWishlist = await isItemInWishlist(gid);

  if (isInWishlist) {
    // console.log('Item is in wishlist');
    removeItemResponse = await removeItemFromWishlist(customerGid, gid);
  } else {
    // console.log('Item is not in wishlist');
    addItemResponse = await addItemToWishlist(customerGid, gid);
  }

  // ----------------------------
  // Smile functions
  // ----------------------------

  const getPoints = await getSmilePoints(email);
  console.log(getPoints);

  // ----------------------------
  // Lipscore functions
  // --------------------------------
  const getProductRating = await getLipscoreReviews(productSku);
  console.log(getProductRating);

  // ----------------------------
  // Saving cusotmer data
  // ----------------------------
  const productForm = {
    firstName: 'Petter',
    lastName: 'Elgheim.',
    isPrompted: true,
    footLength: '43.5',
    style: 'Modern',
    color: 'Black'
  };

  const natureLabData = {
    name: 'Petter',
    email: 'petter@skaidigital.com',
    natureLabTitle: 'Phase 1',
    questionResponse: [
      {
        question: 'Hva er din favorittfarge?',
        answer: 'Grå'
      },
      {
        question: 'Hva er din favorittfarge?',
        answer: 'Grå'
      },
      {
        question: 'Hva er din favorittfarge?',
        answer: 'Grå'
      }
    ]
  };

  // await sendNatureLabEmail(natureLabData);

  const getCustomerDataResponse = await getCustomerData();
  const updateInformationResponse = await updateCustomerData({ customerGid, data: productForm });

  console.log(getCustomerDataResponse);
  console.log(updateInformationResponse);

  // console.log(data);

  //! This one deletes the wishlist
  // await deleteWishlist();

  return (
    <div className="flex flex-col">
      <SheetTest />
      <p> Wishlist: {data}</p>
      <p>isItemInWishlistResponse: {String(isInWishlist)}</p>
      <p>addItemResponse: {addItemResponse || 'Not ran now'}</p>
      <p>removeItemResponse: {removeItemResponse || 'Not ran now'}</p>
      <p>getPoints: {JSON.stringify(getPoints) || ''}</p>
      {/* <OpenSmileHome />  */}
      <SmileButton deepLink={SMILE_DEEP_LINKS.home} label="Home" />
      <SmileButton deepLink={SMILE_DEEP_LINKS.points_activity_rules} label="Activity Rules" />
      <SmileButton deepLink={SMILE_DEEP_LINKS.points_products} label="Points Product" />
      <SmileButton deepLink={SMILE_DEEP_LINKS.referral_program_details} label="Referral" />
      <ProductRating sku={productSku} />
      {/* <OpenSmileHome />
      <OpenSmileActivityRules />
      <OpenSmilePointsProduct />
      <OpenSmileReferral /> */}
    </div>
  );
}

function SheetTest() {
  return (
    <Sheet>
      <SheetTrigger>Test</SheetTrigger>
      <SheetContent title="Test">My content is here</SheetContent>
    </Sheet>
  );
}

// Login function
