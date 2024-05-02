'use client';

import { Badge } from '@/components/Badge';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/Drawer';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/base/Text';
import { FeaturedItem } from '@/components/global/Navbar/FeaturedItem';
import { AccountButton } from '@/components/global/Navbar/MobileMenu/AccountButton';
import { MobileMenuSearch } from '@/components/global/Navbar/MobileMenu/Search';
import { WishlistButton } from '@/components/global/Navbar/MobileMenu/WishlistButton';
import { NavbarPayload } from '@/components/global/Navbar/hooks';
import { SanityLink } from '@/components/sanity/SanityLink';
import { cn } from '@/lib/utils';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Suspense, useState } from 'react';

interface Props {
  items: NavbarPayload['items'];
}

export function MobileMenu({ items }: Props) {
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState<boolean>(false);
  const [secondaryMenuIsOpen, setSecondaryMenuIsOpen] = useState<boolean>(false);

  const onCloseMainMenu = () => setMainMenuIsOpen(false);
  const onCloseSecondaryMenu = () => setSecondaryMenuIsOpen(false);

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <Drawer isOpen={mainMenuIsOpen} onOpenChange={setMainMenuIsOpen}>
          <DrawerTrigger>
            <button
              aria-label="Open main menu"
              className="relative flex h-11 w-11 items-center justify-center rounded-project transition-colors hover:bg-brand-light-grey"
            >
              <Bars2Icon className="transition-brand w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent
            placement="left"
            className="flex h-dvh max-w-full flex-col space-y-7 overflow-y-auto bg-white/80 p-5 backdrop-blur-lg"
          >
            <div className="flex w-full items-center justify-between">
              <Logo className="w-20" />
              <DrawerClose>
                <button className="relative flex w-fit items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey lg:h-11 lg:w-11">
                  <Cross1Icon className="transition-brand w-6 lg:w-4" />
                </button>
              </DrawerClose>
            </div>
            <div className="pb-6">
              <Suspense>
                <MobileMenuSearch onClose={onCloseMainMenu} />
              </Suspense>
            </div>
            <div className="flex flex-col gap-y-20">
              <ul>
                {items?.map((item, index) => (
                  <NavigationMenu.Item key={index}>
                    {item.type === 'link' ? (
                      <NavigationMenu.Link asChild>
                        <SanityLink
                          link={item}
                          onClick={onCloseMainMenu}
                          className={cn(
                            'flex translate-y-[-10px] animate-fade-in-text items-center justify-between py-3 text-md font-medium opacity-0 outline-none transition-[opacity,transform]',
                            index === 0 && '[--animation-delay:600ms]',
                            index === 1 && '[--animation-delay:700ms]',
                            index === 2 && '[--animation-delay:800ms]',
                            index === 3 && '[--animation-delay:950ms]',
                            index === 4 && '[--animation-delay:1000ms]',
                            index === 5 && '[--animation-delay:1025ms]',
                            index === 6 && '[--animation-delay:1050ms]'
                          )}
                        >
                          {item.text}
                        </SanityLink>
                      </NavigationMenu.Link>
                    ) : item.type === 'meganav' ? (
                      <NavigationMenu.Item>
                        <Drawer isOpen={secondaryMenuIsOpen} onOpenChange={setSecondaryMenuIsOpen}>
                          <DrawerTrigger>
                            <button
                              className={cn(
                                'flex w-full translate-y-[-10px] animate-fade-in-text items-center justify-between py-3 text-md font-medium opacity-0 outline-none transition-[opacity,transform]',
                                index === 0 && '[--animation-delay:600ms]',
                                index === 1 && '[--animation-delay:700ms]',
                                index === 2 && '[--animation-delay:800ms]',
                                index === 3 && '[--animation-delay:950ms]',
                                index === 4 && '[--animation-delay:1000ms]',
                                index === 5 && '[--animation-delay:1025ms]',
                                index === 6 && '[--animation-delay:1050ms]'
                              )}
                            >
                              {item.title}
                              <ChevronRightIcon className="h-5 w-5 text-brand-dark-grey" />
                            </button>
                          </DrawerTrigger>
                          <DrawerContent
                            placement="left"
                            className="flex max-h-dvh max-w-full flex-col overflow-y-auto bg-white/60 p-5 backdrop-blur-lg"
                          >
                            <DrawerClose>
                              <button className="flex w-fit items-center gap-x-2 outline-none focus:outline-1">
                                <ChevronLeftIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">{item.title}</span>
                              </button>
                            </DrawerClose>
                            <NavigationMenu.Sub className="mt-10 flex grow flex-col gap-y-10 overflow-y-auto">
                              {item?.links?.map((subItem, index) => {
                                return (
                                  <ul key={index} className="flex flex-col gap-y-20">
                                    {subItem.links && (
                                      <div>
                                        <h3 className="mb-2 translate-y-[-10px] animate-fade-in-text text-overline-sm font-medium uppercase text-brand-mid-grey opacity-0 transition-[opacity,transform] [--animation-delay:600ms]">
                                          {subItem.heading}
                                        </h3>
                                        <NavigationMenu.List className="flex flex-col text-md">
                                          {subItem.links.map((link, index) => (
                                            <NavigationMenu.Item
                                              key={index}
                                              className={cn(
                                                'translate-y-[-10px] animate-fade-in-text py-3 opacity-0 transition-[opacity,transform]',
                                                index === 0 && '[--animation-delay:600ms]',
                                                index === 1 && '[--animation-delay:700ms]',
                                                index === 2 && '[--animation-delay:800ms]',
                                                index === 3 && '[--animation-delay:950ms]',
                                                index === 4 && '[--animation-delay:1000ms]',
                                                index === 5 && '[--animation-delay:1025ms]',
                                                index === 6 && '[--animation-delay:1050ms]'
                                              )}
                                            >
                                              <NavigationMenu.Link asChild>
                                                <SanityLink
                                                  link={link.link}
                                                  onClick={() => {
                                                    onCloseMainMenu();
                                                    onCloseSecondaryMenu();
                                                  }}
                                                  className="flex items-center gap-x-2"
                                                >
                                                  <Text>{link.link.text}</Text>
                                                  {link.badge && (
                                                    <Badge size="xs">{link.badge}</Badge>
                                                  )}
                                                </SanityLink>
                                              </NavigationMenu.Link>
                                            </NavigationMenu.Item>
                                          ))}
                                        </NavigationMenu.List>
                                      </div>
                                    )}
                                  </ul>
                                );
                              })}
                            </NavigationMenu.Sub>
                            <div className="hidden grid-cols-2 gap-5 pt-0 lg:grid">
                              {item?.featuredProducts?.map((featuredItem, index) => (
                                <NavigationMenu.Link key={featuredItem.title + index} asChild>
                                  <FeaturedItem
                                    onClick={() => {
                                      onCloseMainMenu();
                                      onCloseSecondaryMenu();
                                    }}
                                    title={featuredItem.title}
                                    link={featuredItem.link}
                                    image={featuredItem.image}
                                  />
                                </NavigationMenu.Link>
                              ))}
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </NavigationMenu.Item>
                    ) : null}
                  </NavigationMenu.Item>
                ))}
              </ul>
              <ul className="flex flex-col">
                <li className="py-2">
                  <WishlistButton />
                </li>
                <li className="py-2">
                  <AccountButton />
                </li>
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
