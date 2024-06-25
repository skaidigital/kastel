import { UpdateProps } from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { ValuePair } from '@/components/pages/nature-lab/ValuePair'
import { LangValues } from '@/data/constants'
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer'
import { formatDate } from '@/lib/utils'
import { PortableText } from '@portabletext/react'

interface Props {
  data: UpdateProps
  lang: LangValues
}

export function Update({ data, lang }: Props) {
  const { title, author, date, content } = data

  const authorString = getAuthorTranslation(lang)
  const dateString = getDateTranslation(lang)

  return (
    <div className="flex flex-col gap-y-8 lg:gap-y-6">
      {title && (
        <h2 className="text-balance font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey lg:text-nature-lab-heading-md">
          {title}
        </h2>
      )}
      <div className="flex justify-between">
        <ValuePair label={authorString} value={author?.name} />
        <div className="flex flex-col gap-y-1 text-right">
          <span className="font-nature-lab-body text-brand-mid-grey">{dateString}:</span>
          {date && (
            <span className="font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey">
              {formatDate(String(date))}
            </span>
          )}
        </div>
      </div>
      {content && (
        <div className="noMarginFirstChild">
          <PortableText value={content} components={portableTextNatureLabSerializer} />
        </div>
      )}
    </div>
  )
}

function getAuthorTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Forfatter'
    case 'en':
      return 'Author'
    default:
      return 'Author'
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
