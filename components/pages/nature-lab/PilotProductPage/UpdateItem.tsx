import { ValuePair } from '@/components/pages/nature-lab/ValuePair'
import { LangValues } from '@/data/constants'
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer'
import { formatDate } from '@/lib/utils'
import { PortableText } from '@portabletext/react'

interface Props {
  //   data: UpdateProps
  lang: LangValues
}

export function UpdateItem({ lang }: Props) {
  //   const { content } = data
  const content = undefined
  const date = new Date()
  const updateNo = '#2'
  const title = 'The idea came to the founder when he was in the shower...'
  const dateString = getDateTranslation(lang)
  const updateString = getUpdateString(lang)

  return (
    <div className="flex flex-col gap-y-8 lg:gap-y-6">
      <div className="flex justify-between border-b border-neutral-400">
        <ValuePair label={updateString} value={updateNo} />
        <div className="flex flex-col gap-y-1 text-right">
          <span className="font-nature-lab-body text-brand-mid-grey">{dateString}:</span>
          {date && (
            <span className="font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey">
              {formatDate(String(date))}
            </span>
          )}
        </div>
      </div>
      {title && (
        <h2 className="text-balance font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey lg:text-nature-lab-heading-md">
          {title}
        </h2>
      )}
      {content && (
        <div className="noMarginFirstChild">
          <PortableText value={content} components={portableTextNatureLabSerializer} />
        </div>
      )}
    </div>
  )
}

function getUpdateString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Oppdatering'
    case 'en':
      return 'Update'
    default:
      return 'Update'
  }
}

function getDateTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Dato'
    case 'en':
      return 'Date'
    default:
      return 'Date'
  }
}
