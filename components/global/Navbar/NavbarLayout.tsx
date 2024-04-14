import { Container } from '@/components/base/Container';
import { AccountButton } from '@/components/global/Navbar/AccountButton';
import { DesktopMenu } from '@/components/global/Navbar/DesktopMenu';
import { LogoButton } from '@/components/global/Navbar/LogoButton';
import { MobileMenu } from '@/components/global/Navbar/MobileMenu';
import { SearchButton } from '@/components/global/Navbar/SearchButton';
import { WishlistButton } from '@/components/global/Navbar/WishlistButton';
import { NavbarPayload } from '@/components/global/Navbar/hooks';

interface Props {
  data: NavbarPayload;
  children: React.ReactNode;
}

export function NavbarLayout({ data, children }: Props) {
  const { items } = data;

  if (!items) return null;

  return (
    <>
      <nav className="border-brand-border relative flex h-14 w-full items-center border-b bg-white lg:h-11">
        <Container className="flex w-full items-center justify-between px-0 text-center lg:px-4">
          <div className="flex items-center gap-x-2 lg:hidden">
            <MobileMenu items={items} />
            <SearchButton className="hidden lg:block" />
          </div>
          <DesktopMenu items={items} className="hidden lg:block lg:w-fit" />
          <LogoButton />
          <div className="flex flex-1 justify-end space-x-2 lg:flex-auto">
            <div className="hidden items-center justify-center lg:flex lg:gap-x-4">
              <SearchButton />
              <WishlistButton />
              <AccountButton />
            </div>
            {children}
          </div>
        </Container>
      </nav>
    </>
  );
}
