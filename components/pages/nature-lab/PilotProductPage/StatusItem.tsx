import { ValuePair } from '@/components/pages/nature-lab/ValuePair'
import { cn } from '@/lib/utils'

interface Props {
  isCurrent: boolean
  status: 'pre-order' | 'production' | 'shipping'
  //   TODO type
  price: any
  description: string
}

export function StatusItem({ isCurrent, status, description }: Props) {
  return (
    <div className="flex gap-x-6 lg:gap-x-10">
      <div className="flex flex-col gap-y-1 items-center">
        <div className={cn('size-4', isCurrent ? 'bg-brand-primary' : 'bg-neutral-300')} />
        <div className={cn('w-1 h-full grow', isCurrent ? 'bg-brand-primary' : 'bg-neutral-300')} />
      </div>
      <div
        className={cn(
          'flex flex-col w-full',
          isCurrent && 'p-4 lg:p-6 bg-brand-primary text-white'
        )}
      >
        {status && (
          <h3 className="text-nature-lab-heading-xs lg:text-nature-lab-heading-sm font-nature-lab-heading uppercase mb-4">
            {isCurrent && 'Current:'}
            {status}
          </h3>
        )}
        <div className="flex justify-between mb-6">
          <ValuePair label="Price" value="KR 1 444" />
          <ValuePair label="Discount" value="15%" className="lg:text-right" />
        </div>
        {description && (
          <div className="noMarginFirstChild">
            {/* <PortableText value={description} components={portableTextNatureLabSerializer} /> */}
            {description}
          </div>
        )}
      </div>
    </div>
  )
}
