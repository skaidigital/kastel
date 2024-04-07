import { Dictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { FooterPayload } from '@/components/global/Footer/hooks';
import { MarketSelector } from '@/components/shared/MarketSelector';
import { NavItem } from '@/components/shared/NavItem';
import { NavSection } from '@/components/shared/NavSection';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';
import { MarketValues, SKAI_URL } from '@/data/constants';
import { HeadingAndLinksProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

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
  // const copyrightName = env.SITE_NAME || '';
  const copyrightName = 'Abate';

  return (
    <footer>
      <Container className="grid w-full grid-cols-2 flex-col gap-x-5 gap-y-20 px-6 py-12 md:grid-cols-4 md:flex-row md:gap-x-10 lg:grid-cols-6 lg:gap-x-20 ">
        <div className="col-span-2">
          <Heading as="h3" size="sm">
            {dictionary.about} abate
          </Heading>
          <div className="mb-3 mt-6 max-w-sm space-y-4 lg:mb-6 lg:mr-20">
            <Text>{footer.description}</Text>
          </div>
          <div className="flex w-fit flex-col gap-y-5">
            <MarketSelector market={market} />
            {children}
          </div>
        </div>
        {footer?.items?.map((item: HeadingAndLinksProps, index: number) => (
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
        ))}
        <div className="content col-span-2 lg:col-start-5 lg:justify-self-end">
          <NewsletterSignup
            klaviyoId={footer.klaviyoId}
            dictionary={dictionary.sign_up}
            className="max-w-xs"
          />
        </div>
      </Container>
      <div className="border-t border-brand-border py-6">
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

// const SOCIAL_MEDIA = [
//   {
//     socialMedia: 'facebook',
//     url: 'https://www.facebook.com/abateoslo/',
//   },
//   {
//     socialMedia: 'instagram',
//     url: 'https://www.instagram.com/abateoslo/',
//   },
// ];

// interface SoMeProps {
//   url: string;
//   socialMedia: string;
// }

// TODO turn into dynamic fetch from Sanity
// const MapSocialMedia = () => {
//   return (
//     <div className="flex items-center">
//       {SOCIAL_MEDIA?.map((item: SoMeProps, key) => {
//         return (
//           <Link key={key} href={item.url} target="blank">
//             <Icon
//               color="white"
//               width="40"
//               viewBox="0 0 40 40"
//               className="w-10 h-auto text-brand-mid-grey fill-brand-mid-grey"
//               name={item.socialMedia}
//               key={key}
//             />
//           </Link>
//         );
//       })}
//     </div>
//   );
// };
