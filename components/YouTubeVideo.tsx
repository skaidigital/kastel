'use client'

import ReactPlayer from 'react-player'

interface Props {
  url: string
}

export function YouTubeVideo({ url }: Props) {
  return <ReactPlayer url={url} />
}
