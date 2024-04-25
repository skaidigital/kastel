import { KastelClubCard } from '@/components/pages/AccountPage/KastelClubCard';
import { LinkButton } from '@/components/pages/AccountPage/LinkButton';
import { MyInfoCard } from '@/components/pages/AccountPage/MyInfoCard';
import { ProductDisplay } from '@/components/pages/AccountPage/ProductDisplay';
import { WelcomeMessage } from '@/components/pages/AccountPage/WelcomeMessage';
import { ROUTES } from '@/data/constants';
import { getCustomerData } from '@/lib/shopify/metafields/getCustomerData';
import {
  HeartIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon
} from '@heroicons/react/20/solid';
import { Suspense } from 'react';

interface Props {}

export async function AccountPage({}: Props) {
  const customerData = await getCustomerData();
  console.log(customerData);
  return (
    <div className="flex flex-col lg:col-span-8 lg:grid">
      <div className="grid gap-6 lg:hidden">
        <WelcomeMessage name="Ragnsan" welcomeBackString="Velkommen tilbake" content={[]} />
        <div className="grid grid-cols-2 gap-2">
          <LinkButton
            icon={<ShoppingBagIcon className="size-4" />}
            title="Orders"
            href={ROUTES.ORDERS}
          />
          <LinkButton
            icon={<MapPinIcon className="size-4" />}
            title="Addresses"
            href={ROUTES.ADDRESSES}
          />
          <LinkButton
            icon={<HeartIcon className="size-4" />}
            title="Wishlist"
            href={ROUTES.WISHLIST}
          />
          <LinkButton
            icon={<QuestionMarkCircleIcon className="size-4" />}
            title="Customer service"
            href={ROUTES.ACCOUNT_CUSTOMER_SERVICE}
          />
        </div>
        <Suspense fallback={null}>
          <KastelClubCard />
        </Suspense>
        <MyInfoCard customerData={customerData} />
        <ProductDisplay title="Recently viewed" products={[]} />
      </div>
      <div className="hidden lg:block">
        <div className="grid gap-4 lg:grid-cols-8">
          <WelcomeMessage
            name="Ragnsan"
            welcomeBackString="Velkommen tilbake"
            content={[]}
            className="col-span-5"
          />
          <div className="col-span-3 bg-blue-100">imag</div>
          <div className="col-span-5">
            <ProductDisplay title="Recently viewed" products={[]} />
          </div>
          <div className="col-span-3 grid gap-y-4">
            <KastelClubCard />
            <MyInfoCard customerData={customerData} />
          </div>
        </div>
      </div>
    </div>
  );
}
