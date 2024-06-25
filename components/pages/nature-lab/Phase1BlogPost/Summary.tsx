import { Container } from '@/components/base/Container'
import { Phase1BlogPostPayload } from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { ValuePair } from '@/components/pages/nature-lab/ValuePair'
import { LangValues } from '@/data/constants'
import { formatDate } from '@/lib/utils'

interface Props {
  data: Phase1BlogPostPayload['summary']
  lang: LangValues
}

export function Summary({ data, lang }: Props) {
  const { experimentId, startDate, status } = data

  const experimentString = getExperimentTranslation(lang)
  const experimentIdString = getExperimentIdTranslation(lang)
  const startDateString = getStartDateTranslation(lang)
  const statusString = getStatusTranslation(lang)

  return (
    <div className="border-y border-neutral-400 py-3 lg:py-4">
      <Container size="natureLab">
        <div className="flex flex-col gap-y-6 lg:flex-row lg:justify-between">
          <ValuePair label="Type" value={experimentString} />
          {experimentId && <ValuePair label={experimentIdString} value={experimentId} />}
          {startDate && <ValuePair label={startDateString} value={formatDate(String(startDate))} />}
          {status && <ValuePair label={statusString} value={status} className="lg:text-right" />}
        </div>
      </Container>
    </div>
  )
}

function getExperimentTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'EKSPERIMENT'
    case 'en':
      return 'EXPERIMENT'
    default:
      return 'EXPERIMENT'
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

function getStartDateTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Startdato'
    case 'en':
      return 'Start date'
    default:
      return 'Start date'
  }
}

function getStatusTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Status'
    case 'en':
      return 'Status'
    default:
      return 'Status'
  }
}
