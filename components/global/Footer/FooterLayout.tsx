import { Dictionary } from '@/app/dictionaries';
import { CustomLink } from '@/components/CustomLink';
import { Logo } from '@/components/Logo';
import { Container } from '@/components/base/Container';
import { Text } from '@/components/base/Text';
import { FooterItem } from '@/components/global/Footer/FooterItem';
import { MadeBySkai } from '@/components/global/Footer/MadeBySkai';
import { FooterPayload } from '@/components/global/Footer/hooks';
import { MarketSelector } from '@/components/shared/MarketSelector';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';
import { MarketValues } from '@/data/constants';
import { getSlug } from '@/lib/sanity/getSlug';
import { env } from 'process';

interface Props {
  data: FooterPayload;
  dictionary: Dictionary['footer'];
  market: MarketValues;
  children?: React.ReactNode;
}

// TODO get text for the content under the newsletter signup input
// TODO need something to open the CookieBot settings
// TODO need something to open the market selector
export function FooterLayout({ data: footer, dictionary, market, children }: Props) {
  if (!footer) return null;

  const klaviyoId = env.KLAVIYO_NEWSLETTER_LIST_ID!;

  return (
    <footer className="bg-brand-primary py-10 text-white lg:py-20">
      <Container className="flex flex-col gap-y-16 lg:hidden">
        <Logo className="w-[120px]" />
        <div className="flex flex-col gap-y-6">
          <span className="max-w-lg text-balance text-[48px] font-bold uppercase leading-[56px]">
            RAISED BY WEATHER
          </span>
          {footer.description && (
            <Text size="md" className="max-w-lg text-balance">
              {footer.description}
            </Text>
          )}
        </div>
        <NewsletterSignup klaviyoId={klaviyoId} dictionary={dictionary.sign_up} />
        <MarketSelector market={market} />
        <div className="grid grid-cols-2 gap-y-16">
          {footer?.items?.map((item, index) => (
            <div key={item.heading + index} className="flex flex-col gap-y-8">
              {item.heading && (
                <h3 className="max-w-[80%] text-balance text-heading-xs font-bold uppercase">
                  {item.heading}
                </h3>
              )}
              <div className="flex flex-col gap-y-2">
                {item.links &&
                  item.links.map((link, index) => (
                    <CustomLink
                      href={getSlug(link.link)}
                      className="text-sm"
                      key={item.heading + index}
                    >
                      {link.link.text}
                    </CustomLink>
                  ))}
              </div>
            </div>
          ))}
        </div>
        {children}
        <MadeBySkai />
      </Container>
      <Container className="hidden grid-cols-12 gap-x-4 gap-y-20 lg:grid">
        <Logo className="w-[120px]" />
        <span className="col-span-4 row-start-2 text-heading-xl font-bold uppercase">
          RAISED BY WEATHER
        </span>
        {footer.description && (
          <Text className="col-span-3 row-start-2 text-brand-light-grey" size="md">
            {footer.description}
          </Text>
        )}
        {footer.items?.at(0) && (
          <FooterItem item={footer.items[0]} className="col-span-2 col-start-9 row-start-2" />
        )}
        {footer.items?.at(1) && (
          <FooterItem item={footer.items[1]} className="col-span-2 col-start-11 row-start-2" />
        )}
        {footer.items?.at(2) && (
          <FooterItem item={footer.items[2]} className="col-span-2 col-start-11 row-start-3" />
        )}
        {footer.items?.at(3) && (
          <FooterItem item={footer.items[3]} className="col-span-2 col-start-9 row-start-3" />
        )}
        <div className="col-span-3 col-start-1 row-start-3">
          <NewsletterSignup
            klaviyoId={klaviyoId}
            dictionary={dictionary.sign_up}
            className="mb-6"
          />
          {children}
        </div>
        <div className="col-span-3 col-start-5 row-start-3">
          <div className="flex h-full flex-col justify-between">
            <MarketSelector market={market} />
            <MadeBySkai />
          </div>
        </div>
      </Container>
    </footer>
  );
}
