import { Dictionary } from '@/app/dictionaries'
import { Container } from '@/components/base/Container'
import { ProductCount } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop/ProductCount'
import { LangValues, MarketValues } from '@/data/constants'
import { cn } from '@/lib/utils'
import { ActiveFilters } from '../filter/ActiveFilters'
import { SearchParamsKeysPayload } from '../hooks'
import { Filter } from './Filter'
import { ProductsPerRowSelector } from './ProductsPerRowSelector'
import { Sort } from './Sort'

interface Props {
  dictionary: Dictionary['collection_page']
  market: MarketValues
  lang: LangValues
  className?: string
  collectionSlug?: string
  includedSearchParamsKeys: SearchParamsKeysPayload
}

export function CollectionSettingsBarDesktop({
  dictionary,
  market,
  lang,
  className,
  collectionSlug,
  includedSearchParamsKeys
}: Props) {
  return (
    <Container className={cn('flex flex-col space-y-2 pb-8 lg:pb-2', className)}>
      <Row className="items-end">
        <Filter market={market} lang={lang} collectionSlug={collectionSlug} />
        <div className="flex space-x-10">
          <ProductsPerRowSelector />
          <Sort lang={lang} />
        </div>
      </Row>
      <Row>
        <ActiveFilters includedSearchParamsKeys={includedSearchParamsKeys} />
        <ProductCount productsString={dictionary.number_of_products} />
      </Row>
    </Container>
  )
}

export function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex w-full justify-between', className)}>{children}</div>
}
