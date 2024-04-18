import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Retailer {
  name: string;
  websiteUrl: string;
  address1: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
}

// todo use schema from zod
interface RetailersPageProps {
  title: string;
  retailers: Retailer[];
}

export function RetailersPage({ title, retailers }: RetailersPageProps) {
  return (
    <Section label="retailers-page" srHeading="Retailer Page" noTopPadding className="pt-10">
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
                className="group flex flex-col justify-between rounded-sm bg-white p-8 focus-within:bg-brand-primary focus-within:text-white hover:bg-brand-primary hover:text-white"
              >
                <div>
                  {retailer.name && (
                    <Heading as={'h3'} size="sm" className="mb-3">
                      {retailer.name}
                    </Heading>
                  )}
                  <div className="mb-8">
                    {retailer.address1 && (
                      <Text as="p" size="md">
                        {retailer.address1}
                      </Text>
                    )}
                    {retailer.address2 && (
                      <Text as="p" size="md">
                        {retailer.address2}
                      </Text>
                    )}
                    {retailer.zip && retailer.city && retailer.country && (
                      <Text as="p" size="md">
                        {retailer.zip}, {retailer.city}, {retailer.country}
                      </Text>
                    )}
                  </div>
                </div>
                {retailer.websiteUrl && (
                  <Link
                    href={retailer.websiteUrl}
                    className="flex items-center group-hover:bg-brand-primary group-hover:text-white group-focus:bg-brand-primary group-focus:text-white"
                  >
                    Website <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </Wrapper>
            ))}
        </div>
      </Container>
    </Section>
  );
}

interface WrapperProps {
  retailer: Retailer;
  children: React.ReactNode;
  className?: string;
}

function Wrapper({ retailer, className, children }: WrapperProps) {
  if (retailer.websiteUrl) {
    <Link href={retailer.websiteUrl} className={className || ''}>
      {children}
    </Link>;
  }
  return <div className={className || ''}>{children}</div>;
}
