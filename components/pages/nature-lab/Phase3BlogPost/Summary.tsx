import { Container } from '@/components/base/Container'
import { Phase3BlogPostPayload } from '@/components/pages/nature-lab/Phase3BlogPost/hooks'
import { ValuePair } from '@/components/pages/nature-lab/ValuePair'
import { LangValues } from '@/data/constants'
import { formatDate } from '@/lib/utils'

interface Props {
  data: Phase3BlogPostPayload['summary']
  lang: LangValues
}

export function Summary({ data, lang }: Props) {
  const { innovationId, completionDate } = data

  const innovationString = getInnovationTranslation(lang)
  const experimentIdString = getExperimentIdTranslation(lang)
  const compledtionDateString = getCompletionDateTranslation(lang)

  return (
    <div className="border-y border-neutral-400 py-3 lg:py-4">
      <Container size="natureLab">
        <div className="flex flex-col gap-y-6 lg:flex-row lg:justify-between">
          <ValuePair label="Type" value={innovationString} />
          {innovationId && <ValuePair label={experimentIdString} value={innovationId} />}
          {completionDate && (
            <ValuePair label={compledtionDateString} value={formatDate(String(completionDate))} />
          )}
        </div>
      </Container>
    </div>
  )
}

function getInnovationTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'INNOVASJON'
    case 'en':
      return 'INNOVATION'
    default:
      return 'INNOVATION'
  }
}

function getExperimentIdTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Eksperiment-ID'
    case 'en':
      return 'Experiment ID'
    default:
      return 'Experiment ID'
  }
}

function getCompletionDateTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Sluttdato'
    case 'en':
      return 'Completion date'
    default:
      return 'Completion date'
  }
}
