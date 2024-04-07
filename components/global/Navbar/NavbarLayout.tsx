import { Container } from '@/components/base/Container';
import { AccountButton } from '@/components/global/Navbar/AccountButton';
import { DesktopMenu } from '@/components/global/Navbar/DesktopMenu';
import { LogoButton } from '@/components/global/Navbar/LogoButton';
import { MobileMenu } from '@/components/global/Navbar/MobileMenu';
import { SearchButton } from '@/components/global/Navbar/SearchButton';
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
      <nav className="relative flex h-14 w-full items-center border-b border-brand-border bg-white lg:h-11">
        <Container className="flex w-full items-center justify-between px-0 text-center lg:px-4">
          <div className="flex flex-1 items-center space-x-2 lg:hidden lg:flex-auto">
            <MobileMenu items={items} />
            <SearchButton className="hidden lg:block" />
          </div>
          <div className="hidden h-full items-center space-x-10 lg:flex">
            <LogoButton />
          </div>
          <DesktopMenu items={items} className="hidden lg:ml-10 lg:block" />
          <LogoButton className="flex-1 lg:hidden" />
          <div className="flex flex-1 justify-end space-x-2 lg:flex-auto">
            <div className="hidden lg:block">
              <SearchButton />
            </div>
            <AccountButton />
            {children}
          </div>
        </Container>
      </nav>
    </>
  );
}
