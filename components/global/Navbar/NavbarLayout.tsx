import { CustomLink } from '@/components/CustomLink'
import { Logo } from '@/components/Logo'
import { Container } from '@/components/base/Container'
import { DesktopMenu } from '@/components/global/Navbar/DesktopMenu'
import { SearchButton } from '@/components/global/Navbar/DesktopMenu/SearchButton'
import { WishlistButton } from '@/components/global/Navbar/DesktopMenu/WishlistButton'
import { AccountButton } from '@/components/global/Navbar/DesktopMenuAccountButton'
import { NavbarMarketSelector } from '@/components/global/Navbar/MarketSelector'
import { MobileMenu } from '@/components/global/Navbar/MobileMenu'
import { NavbarPayload } from '@/components/global/Navbar/hooks'
import { MarketValues, ROUTES } from '@/data/constants'
import { cn } from '@/lib/utils'

interface Props {
  market: MarketValues
  data: NavbarPayload
  children: React.ReactNode
  className?: string
  hasTransparentHeader?: boolean
}

export function NavbarLayout({ market, data, children, className }: Props) {
  const items = data?.items

  if (!items) return null

  return (
    <>
      <nav className={cn('relative flex h-14 w-full items-center lg:h-11', className)}>
        <Container className="flex w-full items-center justify-between p-0 text-center lg:px-4">
          <div className="flex items-center gap-x-2 lg:hidden">
            <MobileMenu market={market} items={items} />
            <SearchButton />
          </div>
          <DesktopMenu items={items} className="hidden lg:block lg:w-fit" />
          <CustomLink
            href={ROUTES.HOME}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden"
            aria-label="Home"
          >
            <Logo className="w-[66px]" />
          </CustomLink>
          <div className="flex flex-1 justify-end space-x-2 lg:flex-auto">
            <div className="hidden items-center justify-center lg:flex lg:gap-x-4">
              <SearchButton />
              <WishlistButton />
              <AccountButton />
              <NavbarMarketSelector market={market} />
            </div>
            {children}
          </div>
        </Container>
      </nav>
    </>
  )
}
