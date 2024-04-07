'use client';

import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { FeaturedItem } from '@/components/global/Navbar/FeaturedItem';
import { NavbarPayload } from '@/components/global/Navbar/hooks';
import { SanityLink } from '@/components/sanity/SanityLink';
import { getSlug } from '@/lib/sanity/getSlug';
import { cn } from '@/lib/utils';
import { CaretDownIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

interface Props {
  items: NavbarPayload['items'];
  className?: string;
}

export function DesktopMenu({ items, className }: Props) {
  return (
    <NavigationMenu.Root className={cn('z-10 flex w-screen justify-center', className)}>
      <NavigationMenu.List className="center m-0 flex list-none items-center bg-white">
        {items?.map((item) => {
          if (item.type === 'link') {
            return (
              <NavigationMenu.Item key={item.text} className="pr-5">
                <NavigationMenu.Link asChild>
                  <Link href={getSlug(item)}>{item.text}</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }
          if (item.type === 'meganav') {
            const featuredItemCount = item.featuredProducts?.length;

            return (
              <NavigationMenu.Item key={item.title} className="pr-5">
                <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-project text-brand-dark-grey outline-none">
                  {item.title}{' '}
                  <CaretDownIcon
                    className="text-violet10 duration-250 relative top-[1px] transition-transform ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="sm:w-auto absolute left-0 top-0 w-screen data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  <Container>
                    <NavigationMenu.Sub className="grid grid-cols-5 gap-x-5 p-10">
                      {item?.links?.map((link) => (
                        <div className="flex flex-col" key={link.heading}>
                          <Heading
                            size="sm"
                            className="mb-5 translate-y-[-10px] animate-fade-in-text text-left text-brand-dark-grey opacity-0 transition-[opacity] [--animation-delay:300ms]"
                          >
                            {link.heading}
                          </Heading>
                          <NavigationMenu.List className="flex flex-col space-y-5 text-left">
                            {link?.links?.map((link, index) => (
                              <NavigationMenu.Item key={link.text}>
                                <NavigationMenu.Link asChild>
                                  <SanityLink
                                    link={link}
                                    className={cn(
                                      'transition-brand w-fit translate-y-[-10px] animate-fade-in-text opacity-0 transition-[opacity,color] hover:text-brand-mid-grey hover:duration-100 hover:ease-in-out',
                                      index === 0 && '[--animation-delay:600ms]',
                                      index === 1 && '[--animation-delay:700ms]',
                                      index === 2 && '[--animation-delay:800ms]',
                                      index === 3 && '[--animation-delay:950ms]',
                                      index === 4 && '[--animation-delay:1000ms]',
                                      index === 5 && '[--animation-delay:1025ms]',
                                      index === 6 && '[--animation-delay:1050ms]'
                                    )}
                                  >
                                    {link.text}
                                  </SanityLink>
                                </NavigationMenu.Link>
                              </NavigationMenu.Item>
                            ))}
                          </NavigationMenu.List>
                        </div>
                      ))}
                      {item.featuredProducts?.map((product, index) => (
                        <FeaturedItem
                          className={cn(
                            'shrink-0 translate-y-[-10px] animate-fade-in-text opacity-0 transition-[opacity] [--animation-delay:600ms]',
                            index === 0 && featuredItemCount === 2 && 'col-start-4',
                            index === 1 && featuredItemCount === 2 && 'col-start-5',
                            featuredItemCount === 1 && 'col-start-5'
                          )}
                          key={product.title}
                          title={product.title}
                          link={product.link}
                          image={product.image}
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
        <NavigationMenu.Viewport className="sm:w-[var(--radix-navigation-menu-viewport-width)] relative mt-[1px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden border-b border-brand-border bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-menu-slide-up data-[state=open]:animate-menu-slide-down" />
      </div>
    </NavigationMenu.Root>
  );
}
