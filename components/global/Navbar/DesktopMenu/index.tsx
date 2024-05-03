'use client';

import { Badge } from '@/components/Badge';
import { Container } from '@/components/base/Container';
import { FeaturedItem } from '@/components/global/Navbar/FeaturedItem';
import { NavbarPayload } from '@/components/global/Navbar/hooks';
import { SanityLink } from '@/components/sanity/SanityLink';
import { cn } from '@/lib/utils';
import { CaretDownIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

interface Props {
  items: NavbarPayload['items'];
  className?: string;
}

// TODO animate height
export function DesktopMenu({ items, className }: Props) {
  return (
    <NavigationMenu.Root delayDuration={0} className={cn('z-20 flex justify-center', className)}>
      <NavigationMenu.List className="center m-0 flex list-none items-center">
        {items?.map((item) => {
          if (item.type === 'link') {
            return (
              <NavigationMenu.Item key={item.text} className="flex self-center pr-5">
                <NavigationMenu.Link asChild>
                  <SanityLink className="text-sm" link={item}>
                    {item.text}
                  </SanityLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }
          if (item.type === 'meganav') {
            return (
              <NavigationMenu.Item key={item.title} className="pr-5 text-sm">
                <NavigationMenu.Trigger className="group flex h-full select-none items-center justify-between gap-[2px] rounded-project outline-none">
                  {item.title}{' '}
                  <CaretDownIcon
                    className="duration-250 relative transition-transform ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="sm:w-auto absolute left-0 top-0 w-screen data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  <Container>
                    <NavigationMenu.Sub className="grid grid-cols-4 gap-x-4 gap-y-8 p-8">
                      {item?.links?.map((link) => (
                        <div className="row-start-1 flex w-full flex-col" key={link.heading}>
                          <h3 className="mb-6 translate-y-[-10px] animate-fade-in-text text-left text-overline-sm font-medium uppercase text-brand-mid-grey opacity-0 transition-[opacity] [--animation-delay:300ms]">
                            {link.heading}
                          </h3>
                          <NavigationMenu.List className="flex flex-col gap-y-3 text-left text-sm">
                            {link?.links?.map((item, index) => (
                              <NavigationMenu.Item key={item?.link?.text}>
                                <NavigationMenu.Link asChild className="flex items-center gap-x-2">
                                  <SanityLink
                                    link={item?.link}
                                    className={cn(
                                      'transition-brand w-fit translate-y-[-10px] animate-fade-in-text text-sm opacity-0 transition-[opacity,color] hover:text-brand-mid-grey hover:duration-100 hover:ease-in-out focus:text-brand-mid-grey',
                                      index === 0 && '[--animation-delay:600ms]',
                                      index === 1 && '[--animation-delay:700ms]',
                                      index === 2 && '[--animation-delay:800ms]',
                                      index === 3 && '[--animation-delay:950ms]',
                                      index === 4 && '[--animation-delay:1000ms]',
                                      index === 5 && '[--animation-delay:1025ms]',
                                      index === 6 && '[--animation-delay:1050ms]',
                                      index === 7 && '[--animation-delay:1075ms]',
                                      index === 8 && '[--animation-delay:1100ms]',
                                      index === 9 && '[--animation-delay:1125ms]'
                                    )}
                                  >
                                    {item.link?.text && item.link.text}
                                    {item.badge && <Badge size="xs">{item.badge}</Badge>}
                                  </SanityLink>
                                </NavigationMenu.Link>
                              </NavigationMenu.Item>
                            ))}
                          </NavigationMenu.List>
                        </div>
                      ))}
                      {item.featuredProducts?.map((product) => (
                        <FeaturedItem
                          className={cn(
                            'row-start-2 shrink-0 translate-y-[-10px] animate-fade-in-text opacity-0 transition-[opacity] [--animation-delay:600ms]'
                          )}
                          key={product.title && product.title}
                          title={product.title && product.title}
                          link={product.link && product.link}
                          image={product.image && product.image}
                        />
                      ))}
                    </NavigationMenu.Sub>
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return null;
        })}
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="sm:w-[calc(var(--radix-navigation-menu-viewport-width)-1px)] border-brand-border origin-top-center relative h-[calc(var(--radix-navigation-menu-viewport-height)-1px)] w-full overflow-hidden border-b bg-white/80 backdrop-blur-lg transition-all" />
      </div>
    </NavigationMenu.Root>
  );
}

// data-[state=closed]:animate-menu-slide-up data-[state=open]:animate-menu-slide-down
