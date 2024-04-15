'use client';

import { Drawer } from '@/components/Drawer';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { FeaturedItem } from '@/components/global/Navbar/FeaturedItem';
import { LogoButton } from '@/components/global/Navbar/LogoButton';
import { SearchBar } from '@/components/global/Navbar/SearchBar';
import { NavbarPayload } from '@/components/global/Navbar/hooks';
import { SanityLink } from '@/components/sanity/SanityLink';
import { cn } from '@/lib/utils';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useState } from 'react';

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
          <Drawer.Trigger>
            <button
              aria-label="Open main menu"
              className="relative flex h-11 w-11 items-center justify-center rounded-project text-brand-mid-grey transition-colors hover:bg-brand-light-grey"
            >
              <Bars2Icon className="transition-brand w-6" />
            </button>
          </Drawer.Trigger>
          <Drawer.Content
            placement="left"
            className="flex h-dvh max-w-full flex-col space-y-7 overflow-y-auto bg-white/80 p-5 backdrop-blur-lg"
          >
            <div className="flex w-full items-center justify-between">
              <LogoButton />
              <Drawer.Close>
                <button className="relative flex w-fit items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey lg:h-11 lg:w-11">
                  <Cross1Icon className="transition-brand w-6 lg:w-4" />
                </button>
              </Drawer.Close>
            </div>
            <SearchBar />
            <ul className="space-y-7">
              {items?.map((item, index) => (
                <NavigationMenu.Item key={index}>
                  {item.type === 'link' ? (
                    <NavigationMenu.Link asChild>
                      <SanityLink
                        link={item}
                        onClick={onCloseMainMenu}
                        className={cn(
                          'text-text-md flex translate-y-[-10px] animate-fade-in-text items-center justify-between font-medium opacity-0 outline-none transition-[opacity,transform]',
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
                        {/* <ChevronRightIcon /> */}
                      </SanityLink>
                    </NavigationMenu.Link>
                  ) : item.type === 'meganav' ? (
                    <NavigationMenu.Item>
                      <Drawer isOpen={secondaryMenuIsOpen} onOpenChange={setSecondaryMenuIsOpen}>
                        <Drawer.Trigger>
                          <button
                            className={cn(
                              'text-text-md flex w-full translate-y-[-10px] animate-fade-in-text items-center justify-between font-medium opacity-0 outline-none transition-[opacity,transform]',
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
                        </Drawer.Trigger>
                        <Drawer.Content
                          placement="left"
                          className="flex max-h-dvh max-w-full flex-col overflow-y-auto bg-white/80 p-5 backdrop-blur-lg"
                        >
                          <Drawer.Close>
                            <button className="flex w-fit items-center gap-x-2 outline-none focus:outline-1">
                              <ChevronLeftIcon className="h-5 w-5" />
                              <span className="text-text-sm font-medium">{item.title}</span>
                            </button>
                          </Drawer.Close>
                          <NavigationMenu.Sub className="mt-10 flex grow flex-col gap-y-10 overflow-y-auto">
                            {item?.links?.map((subItem, index) => {
                              return (
                                <ul key={index} className="flex flex-col gap-y-20">
                                  {subItem.links && (
                                    <div>
                                      <Heading
                                        as="h2"
                                        size="sm"
                                        className="mb-5 translate-y-[-10px] animate-fade-in-text opacity-0 transition-[opacity,transform] [--animation-delay:600ms]"
                                      >
                                        {subItem.heading}
                                      </Heading>
                                      <NavigationMenu.List className="flex flex-col space-y-5">
                                        {subItem.links.map((link, index) => (
                                          <NavigationMenu.Item
                                            key={index}
                                            className={cn(
                                              'translate-y-[-10px] animate-fade-in-text opacity-0 transition-[opacity,transform]',
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
                                                link={link}
                                                onClick={() => {
                                                  onCloseMainMenu();
                                                  onCloseSecondaryMenu();
                                                }}
                                                className="flex items-center justify-between"
                                              >
                                                <Text>{link.text}</Text>
                                                {/* <ChevronRightIcon /> */}
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
                        </Drawer.Content>
                      </Drawer>
                    </NavigationMenu.Item>
                  ) : null}
                </NavigationMenu.Item>
              ))}
            </ul>
          </Drawer.Content>
        </Drawer>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
