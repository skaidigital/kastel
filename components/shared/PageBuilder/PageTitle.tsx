import { Container } from '@/components/base/Container'
import { PageTitleProps } from '@/components/shared/PageBuilder/hooks'

interface PropsWithExtra extends PageTitleProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

export const PageTitle = ({ data }: Props) => {
  const { title, description } = data

  return (
    <section title="Hero section">
      <Container className="flex flex-col gap-y-10 border-b border-brand-light-grey py-10 lg:flex-row lg:justify-between lg:gap-0 lg:py-20">
        {title && (
          <h1 className="text-heading-lg font-bold uppercase lg:text-heading-xl">{title}</h1>
        )}
        {description && (
          <p className="text-md text-brand-mid-grey lg:max-w-lg lg:text-lg">{description}</p>
        )}
      </Container>
    </section>
  )
}
