import { AccountPageSchema } from '@/app/(site)/[market]/[lang]/(dynamic)/account/(has-sidebar)/hooks'
import { KlaviyoIdentify } from '@/components/klaviyo/Identify'
import { KastelClubCard } from '@/components/pages/AccountPage/KastelClubCard'
import { LinkButton } from '@/components/pages/AccountPage/LinkButton'
import { MyInfoCard } from '@/components/pages/AccountPage/MyInfoCard'
import { ProductDisplay } from '@/components/pages/AccountPage/ProductDisplay'
import { WelcomeMessage } from '@/components/pages/AccountPage/WelcomeMessage'
import { SanityImage } from '@/components/sanity/SanityImage'
import { LangValues, ROUTES } from '@/data/constants'
import { getCustomerData } from '@/lib/shopify/metafields/getCustomerData'
import {
  HeartIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon
} from '@heroicons/react/20/solid'
import { Suspense } from 'react'

interface Props {
  data: AccountPageSchema
  lang: LangValues
}

export async function AccountPage({ data, lang }: Props) {
  const customerData = await getCustomerData()

  const welcomeBackString = getWelcomeBackString(lang)

  return (
    <>
      {customerData && (
        <KlaviyoIdentify
          email={customerData.emailAddress.emailAddress}
          firstName={customerData.firstName}
          lastName={customerData.lastName}
        />
      )}
      <div className="flex flex-col lg:col-span-8 lg:grid">
        <div className="mb-20 grid gap-6 lg:hidden">
          <WelcomeMessage
            name={customerData.firstName || ''}
            welcomeBackString={welcomeBackString}
            content={data.messageFromTheTeam}
          />
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
            <KastelClubCard lang={lang} />
          </Suspense>
          <MyInfoCard customerData={customerData} />
          {data.productDisplay && (
            <ProductDisplay
              title={data.productDisplay.title}
              products={data.productDisplay.products}
            />
          )}
        </div>
        <div className="hidden lg:block">
          <div className="grid gap-4 lg:grid-cols-8">
            <WelcomeMessage
              name={customerData.firstName || ''}
              welcomeBackString="Velkommen tilbake"
              content={data.messageFromTheTeam}
              className="col-span-5"
            />
            <div className="relative col-span-3 bg-blue-100">
              <SanityImage image={data.image} fill />
            </div>
            <div className="col-span-5">
              {data.productDisplay && (
                <ProductDisplay
                  title={data.productDisplay.title}
                  products={data.productDisplay.products}
                />
              )}
            </div>
            <div className="col-span-3 grid gap-y-4">
              <KastelClubCard lang={lang} />
              <MyInfoCard customerData={customerData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function getWelcomeBackString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Velkommen tilbake'
    case 'en':
      return 'Welcome back'
    default:
      return 'Welcome back'
  }
}
