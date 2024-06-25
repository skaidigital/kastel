'use client'

import { useEffect } from 'react'

// Assuming the channel key is valid and stored in an environment variable accessible here
const channelKey = process.env.NEXT_PUBLIC_SMILE_CHANNEL_KEY

interface Props {
  customerId: string | undefined
}

export default function SmileInit({ customerId }: Props) {
  let retryCount = 0
  // This useEffect will run when the component mounts or customerId changes
  useEffect(() => {
    async function init() {
      const jwtToken = await fetchJwt({ customerId })

      if (!window.SmileUI) {
        try {
          await loadSmileUIScript()
        } catch (error) {
          console.error('Failed to load Smile UI script:', error)
          return
        }
      }

      if (window.SmileUI) {
        window.SmileUI.init({
          channel_key: channelKey,
          customer_identity_jwt: jwtToken
        })
      } else {
        if (retryCount < 3) {
          await init()
          retryCount++
        }
      }
    }

    init()
  }, [customerId, retryCount]) // Depend on customerId

  async function fetchJwt({ customerId }: { customerId?: string }) {
    if (!customerId) {
      return undefined
    }
    try {
      const response = await fetch('/api/smile/create-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_id: customerId })
      })
      const data = await response.json()
      return data.token
    } catch (error) {
      console.error('Error fetching JWT:', error)
      return null
    }
  }

  function loadSmileUIScript() {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://js.smile.io/v1/smile-ui.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Smile UI script failed to load'))
      document.head.appendChild(script)
    })
  }

  return null
}
