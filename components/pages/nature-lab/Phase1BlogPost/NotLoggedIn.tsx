import { Button } from '@/components/Button'
import { logIn } from '@/lib/shopify/customer/actions'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function NotLoggedIn({ className }: Props) {
  async function handleLogIn() {
    await logIn()
  }

  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      <h3 className="text-nature-lab-heading-xs font-nature-lab-heading uppercase text-brand-dark-grey">
        Legg inn en kommentar
      </h3>
      <span className="text-nature-lab-sm font-nature-lab-body text-brand-mid-grey">
        Du må være logget inn for å legge til en kommentar
      </span>
      <Button size="sm" onClick={handleLogIn} className="font-nature-lab-body">
        Logg inn
      </Button>
    </div>
  )
}
