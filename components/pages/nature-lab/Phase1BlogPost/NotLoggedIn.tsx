import { Button } from '@/components/Button'
import { logIn } from '@/lib/shopify/customer/actions'

export function NotLoggedIn() {
  async function handleLogIn() {
    await logIn()
  }

  return (
    <div className="flex flex-col gap-y-4">
      <span>You need to be logged in to add a comment</span>
      <Button size="sm" onClick={handleLogIn}>
        Login
      </Button>
    </div>
  )
}
