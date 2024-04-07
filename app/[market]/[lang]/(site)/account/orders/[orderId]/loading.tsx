import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { TD } from '@/components/shared/TD';
import { TH } from '@/components/shared/TH';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <Section label="order-details" srHeading="Order details" className="px-6 md:px-12 lg:px-20">
      <div className="mb-10 flex items-center space-x-3">
        <Heading size="md">
          {/* <Skeleton className="h-8 w-32" /> */}
          test
        </Heading>
      </div>
      <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-20 lg:space-y-0">
        <table className="h-fit w-full">
          <thead>
            <tr>
              <TH>
                <Skeleton className="h-5 w-32" />
              </TH>
              <TH className="px-0 text-center">
                <Skeleton className="h-5 w-32" />
              </TH>
              <TH className="pr-0">
                <Skeleton className="ml-auto h-5 w-20" />
              </TH>
            </tr>
          </thead>
          <tbody className="max-h-fit divide-y divide-brand-border">
            <LineItem />
            <LineItem />
          </tbody>
        </table>
        <div className="w-full space-y-14 pt-2 lg:max-w-40">
          <div className="space-y-5">
            <Heading as="h2" size="xs">
              {/* <Skeleton className="h-6 w-24" /> */}
              test
            </Heading>
            <dl className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <dt className="text-sm">
                  <Skeleton className="h-5 w-16" />
                </dt>
                <dt className="text-sm">
                  <Skeleton className="h-5 w-20" />
                </dt>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">
                  <Skeleton className="h-5 w-16" />
                </dt>
                <dt className="text-sm">
                  <Skeleton className="h-5 w-20" />
                </dt>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">
                  <Skeleton className="h-5 w-16" />
                </dt>
                <dt className="text-sm">
                  <Skeleton className="h-5 w-20" />
                </dt>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">
                  <Skeleton className="h-5 w-16" />
                </dt>
                <dt className="text-sm">
                  <Skeleton className="h-5 w-20" />
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}

function LineItem() {
  return (
    <tr>
      <TD className="flex items-center space-x-3">
        <Skeleton className="h-32 w-20" />
        <Skeleton className="h-5 w-40" />
      </TD>
      <TD className="px-0">
        <Skeleton className="ml-[50%] flex h-5 w-5 justify-center" />
      </TD>
      <TD className="pr-0">
        <Skeleton className="ml-auto h-5 w-20" />
      </TD>
    </tr>
  );
}
