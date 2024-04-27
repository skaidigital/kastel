import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';

export default async function Page() {
  // let accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  // if (!accessToken) {
  //   const token = await createCustomerAccessToken('petter@skaidigital.com', 'testtest');
  //   accessToken = token.accessToken;
  //   console.log(token);
  // }

  // const slugs = await generateStaticParams();
  // console.log('slugs', slugs);
  //
  return (
    <div className="flex flex-col">
      <SheetTest />
      <p>hei</p>
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
