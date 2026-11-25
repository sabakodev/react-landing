import { ImageResponse } from 'next/og'
import { OG_SIZE, OgCard } from '@/components/seo/OgCard'

export const alt = 'SABAKO — Rewrite your business.'
export const size = OG_SIZE
export const contentType = 'image/png'

/** Default share image for every route without its own opengraph-image or explicit og:image. */
export default function OpengraphImage() {
	return new ImageResponse(<OgCard eyebrow="Software engineering partner — Jakarta" headline="Rewrite your business." />, size)
}
