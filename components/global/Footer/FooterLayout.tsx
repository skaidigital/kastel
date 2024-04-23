import { Dictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Text } from '@/components/base/Text';
import { FooterPayload } from '@/components/global/Footer/hooks';
import { MarketSelector } from '@/components/shared/MarketSelector';
import { PaymentProviders } from '@/components/shared/PaymentProviders';
import { MarketValues, SKAI_URL } from '@/data/constants';
import { Suspense } from 'react';

interface Props {
  data: FooterPayload;
  dictionary: Dictionary['footer'];
  market: MarketValues;
  children?: React.ReactNode;
}

export function FooterLayout({ data: footer, dictionary, market, children }: Props) {
  if (!footer) return null;

  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = 'Kastel Shoes';

  return (
    <footer className="bg-brand-primary text-white">
      <Container className="grid w-full grid-cols-2 flex-col gap-x-5 gap-y-20 px-6 py-12 md:grid-cols-4 md:flex-row md:gap-x-10 lg:grid-cols-6 lg:gap-x-20 ">
        <div className="col-span-2">
          {/* <Heading as="h3" size="sm">
            {dictionary.about} abate
          </Heading> */}
          <div className="mb-3 mt-6 max-w-sm space-y-4 lg:mb-6 lg:mr-20">
            <Text>{footer.description}</Text>
          </div>
          <div className="flex w-fit flex-col gap-y-5">
            <MarketSelector market={market} />
            {children}
          </div>
        </div>
        {/* {footer?.items?.map((item: HeadingAndLinksProps, index: number) => (
          <NavSection
            heading={item.heading}
            key={item.heading + index}
            className={cn(index === 0 && 'lg:flex lg:flex-col')}
          >
            {item?.links?.map((link, idx: number) => (
              <li key={link.text}>
                <NavItem link={link}>{link.text}</NavItem>
              </li>
            ))}
          </NavSection>
        ))} */}
        <div className="content col-span-2 lg:col-start-5 lg:justify-self-end">
          {/* <NewsletterSignup
            klaviyoId={footer.klaviyoId}
            dictionary={dictionary.sign_up}
            className="max-w-xs"
          /> */}
          <Suspense>
            <PaymentProviders market={market} />
          </Suspense>
        </div>
      </Container>
      <div className="border-brand-border border-t py-6">
        <Container className="mx-auto flex w-full flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4">
          <Text size="sm">
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''}{' '}
          </Text>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <Text size="sm">
            {dictionary.made_with} ❤️ {dictionary.by}{' '}
            <a
              href={SKAI_URL}
              target="blank"
              className="text-brand-dark underline hover:text-black dark:text-white"
            >
              Skai Digital
            </a>
          </Text>
        </Container>
      </div>
    </footer>
  );
}
