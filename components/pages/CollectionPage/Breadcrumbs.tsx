import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/Breadcrumb'
import { CustomLink } from '@/components/CustomLink'
import { LangValues, ROUTES } from '@/data/constants'
import { ChevronRightIcon } from '@radix-ui/react-icons'

interface Props {
  collectionName: string
  lang: LangValues
}

export function Breadcrumbs({ collectionName, lang }: Props) {
  const homeString = getHomeString(lang)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-brand-mid-grey">
          <BreadcrumbLink asChild>
            <CustomLink href={ROUTES.HOME}>{homeString}</CustomLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="size-3" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{collectionName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function getHomeString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Home'
    case 'no':
      return 'Hjem'
    default:
      return 'Home'
  }
}
