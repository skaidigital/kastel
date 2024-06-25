import { loadPopup } from '@/components/global/Popup/hooks'

export async function POST(request: Request) {
  const { lang } = await request.json()

  const initial = await loadPopup(lang)

  const data = initial?.data

  if (!data)
    return new Response(JSON.stringify({ success: false }), {
      status: 401
    })

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200
  })
}
