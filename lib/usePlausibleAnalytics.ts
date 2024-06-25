import { ANALTYICS_EVENT_NAME } from '@/data/constants'
import { ConsentType, TrackEventOptions } from '@/lib/types'
import { usePlausible } from 'next-plausible'

export function usePlausibleAnalytics() {
  const plausible = usePlausible()

  const trackAddToCart = ({ options }: { options: TrackEventOptions }) =>
    plausible(ANALTYICS_EVENT_NAME.ADD_TO_CART, {
      props: options
    })

  const trackGoToCheckout = () => plausible(ANALTYICS_EVENT_NAME.BEGIN_CHECKOUT)

  const trackConsent = ({ type }: { type: ConsentType }) =>
    plausible(ANALTYICS_EVENT_NAME.CONSENT, {
      props: {
        type
      }
    })

  return { trackAddToCart, trackGoToCheckout, trackConsent }
}
