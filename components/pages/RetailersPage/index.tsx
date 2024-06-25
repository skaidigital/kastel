import { Container } from '@/components/base/Container'
import { Heading } from '@/components/base/Heading'
import { Section } from '@/components/base/Section'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Retailer {
  name: string
  websiteUrl: string
  address1: string
  address2?: string
  zip: string
  city: string
  country: string
}

// todo use schema from zod
interface RetailersPageProps {
  title: string
  retailers: Retailer[]
}

export function RetailersPage({ title, retailers }: RetailersPageProps) {
  return (
    <Section
      label="retailers-page"
      srHeading="Retailer Page"
      noTopPadding
      className="bg-gray-100 pt-10"
    >
      <Container className="pt-10">
        {title && (
          <Heading as={'h2'} className="mb-11 font-bold lg:mb-20">
            {title}
          </Heading>
        )}
        <div className="grid gap-4 lg:grid-cols-4">
          {retailers &&
            retailers.map((retailer) => (
              <Wrapper
                retailer={retailer}
                key={retailer.name}
                className="group group group flex flex-col justify-between rounded-sm bg-white p-8 *:text-brand-mid-grey hover:bg-brand-primary hover:text-white *:hover:text-white focus:bg-brand-primary focus:text-white *:focus:text-white"
              >
                <div>
                  {retailer.name && (
                    <h3 className="mb-3 text-md font-bold uppercase text-brand-dark-grey group-hover:text-white group-focus:text-white">
                      {retailer.name}
                    </h3>
                  )}
                  <div className="mb-8">
                    <div className="flex gap-x-1">
                      {retailer.address1 && <span className="text-sm">{retailer.address1}</span>}
                      {retailer.address2 && <span className="text-sm">– {retailer.address2}</span>}
                    </div>
                    {retailer.zip && retailer.city && retailer.country && (
                      <div className="text-sm ">
                        {retailer.zip}, {retailer.city}, {retailer.country}
                      </div>
                    )}
                  </div>
                </div>
                {retailer.websiteUrl && (
                  <div className="flex w-fit items-center text-sm font-medium">
                    <span>Website</span> <ArrowUpRightIcon className="ml-1 size-4" />
                  </div>
                )}
              </Wrapper>
            ))}
        </div>
      </Container>
    </Section>
  )
}

interface WrapperProps {
  retailer: Retailer
  children: React.ReactNode
  className?: string
}

function Wrapper({ retailer, className, children }: WrapperProps) {
  const Wrapper = retailer.websiteUrl ? Link : 'div'

  return (
    <Wrapper href={retailer.websiteUrl} className={cn(className)}>
      {children}
    </Wrapper>
  )
}
