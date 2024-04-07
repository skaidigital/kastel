import { Section } from '@/components/base/Section';
import { TH } from '@/components/shared/TH';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <Section label="my-account" srHeading="My account" className="px-6 md:px-12 lg:px-20">
      <Skeleton className="mb-10 h-[28px] w-40" />
      <div className="">
        <div className="grow">
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <TH>
                    <Skeleton className="h-4 w-14" />
                  </TH>
                  <TH>
                    <Skeleton className="h-4 w-14" />
                  </TH>
                  <TH>
                    <Skeleton className="h-4 w-32" />
                  </TH>
                  <TH>
                    <Skeleton className="h-4 w-32" />
                  </TH>
                  <TH className="flex justify-end">
                    <Skeleton className="h-4 w-14" />
                  </TH>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                <Row />
                <Row />
                <Row />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Row() {
  return (
    <tr>
      <td className="py-4 pl-2 pr-8">
        <Skeleton className="h-4 w-14" />
      </td>
      <td className="py-4 pl-2 pr-8">
        <Skeleton className="h-4 w-14" />
      </td>
      <td className="py-4 pl-2 pr-8">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="py-4 pl-2 pr-8">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="flex justify-end px-2 py-4">
        <Skeleton className="h-4 w-14" />
      </td>
    </tr>
  );
}
