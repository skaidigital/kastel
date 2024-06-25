import { ShoePickerProvider } from '@/components/shared/PageBuilder/ShoePickerSection/Context'
import { ShoePickerLayout } from '@/components/shared/PageBuilder/ShoePickerSection/Layout'
import { ShoePickerProps } from '@/components/shared/PageBuilder/hooks'

interface PropsWithExtra extends ShoePickerProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

export const ShoePickerSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, types, sectionSettings } = data

  return (
    <ShoePickerProvider defaultValue={types[0]?.title}>
      <ShoePickerLayout
        title={title}
        types={types}
        sectionSettings={sectionSettings}
        index={index}
        pageId={pageId}
        pageType={pageType}
      />
    </ShoePickerProvider>
  )
}
