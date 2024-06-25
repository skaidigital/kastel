import { ValuePair } from '@/components/pages/nature-lab/ValuePair'
import { LangValues } from '@/data/constants'
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer'
import { cn, formatDate } from '@/lib/utils'
import { PortableText } from '@portabletext/react'

interface Props {
  //   data: UpdateProps
  lang: LangValues
  className?: string
}

export function TheSustainableIdea({ lang, className }: Props) {
  //   const { content } = data
  const content = undefined
  const date = new Date()
  const title = 'The idea came to the founder when he was in the shower...'
  const titleString = getTitleString(lang)
  const hypothesisString = getTheHypothesisString(lang)
  const dateString = getDateTranslation(lang)

  return (
    <div className={cn('flex flex-col gap-y-8 lg:gap-y-6', className)}>
      <div className="flex justify-between">
        <ValuePair label={titleString} value={hypothesisString} />

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

function getTitleString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Tittel'
    case 'en':
      return 'Title'
    default:
      return 'Title'
  }
}

function getTheHypothesisString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Hypotesen'
    case 'en':
      return 'Hypothesis'
    default:
      return 'Hypothesis'
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
