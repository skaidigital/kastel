/* eslint-disable import/no-extraneous-dependencies */
import { SanityImage } from '@/components/sanity/SanityImage'
import { cn } from '@/lib/utils'
import Marquee from 'react-fast-marquee'
import { Product } from './hooks'

interface Props {
  usps: Product['usps']
  size: 'sm' | 'lg'
  type: 'normal' | 'natureLab'
  className?: string
}

export function UspsMarquee({ usps, size, className, type }: Props) {
  return (
    usps && (
      <div
        className={cn(
          'border-b border-brand-light-grey',
          size === 'sm' && 'py-5',
          size === 'lg' && 'py-[14px] lg:py-8',
          className
        )}
      >
        <Marquee autoFill>
          {usps.map((usp, index) => {
            const iconSize = size === 'sm' ? 24 : 32

            return (
              <div key={usp.icon.asset._ref + index} className="mr-24 flex items-center gap-2">
                <SanityImage width={iconSize} height={iconSize} image={usp.icon} noPlaceholder />
                <span
                  className={cn(
                    size === 'sm' && 'text-sm',
                    size === 'lg' && 'text-md',
                    type === 'natureLab' && 'font-nature-lab-body text-nature-lab-md'
                  )}
                >
                  {usp.title}
                </span>
              </div>
            )
          })}
        </Marquee>
      </div>
    )
  )
}
