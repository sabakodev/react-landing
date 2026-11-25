import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { OG_SIZE, OgCard } from '@/components/seo/OgCard'
import { publishedServices } from '@/lib/services'

export const alt = 'SABAKO service'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
	return publishedServices().map((s) => ({ slug: s.slug }))
}

export default async function ServiceOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const service = publishedServices().find((s) => s.slug === slug)
	if (!service) notFound()
	return new ImageResponse(<OgCard eyebrow={service.navLabel} headline={service.name} />, size)
}
