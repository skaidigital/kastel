'use client'

import { env } from '@/env'
import { useEffect } from 'react'

export default function LipscoreInit() {
  useEffect(() => {
    window.lipscoreInit = function () {
      window?.lipscore?.init({
        apiKey: env.NEXT_PUBLIC_LIPSCORE_API_KEY
      })
    }
    const scr = document.createElement('script')
    scr.async = true
    scr.src = 'https://static.lipscore.com/assets/no/lipscore-v1.js'
    document.head.appendChild(scr)

    scr.onload = () => {
      window.lipscore?.reInitWidgets(true)
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(scr)
    }
  }, []) // Empty array ensures this effect runs only once after the initial render

  return null
}
