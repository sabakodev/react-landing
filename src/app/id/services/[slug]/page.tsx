import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage, serviceMetadata } from '@/components/services/ServicePage'
import { publishedServicesId } from '@/lib/services'

type Props = { params: Promise<{ slug: string }> }

// Only published services with Bahasa Indonesia copy are generated; others 404.
export const dynamicParams = false

export function generateStaticParams() {
	return publishedServicesId().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { slug } = await props.params
	const service = publishedServicesId().find((s) => s.slug === slug)
	return service ? serviceMetadata(service, 'id') : {}
}

export default async function IdServiceRoute(props: Props) {
	const { slug } = await props.params
	const service = publishedServicesId().find((s) => s.slug === slug)
	if (!service) notFound()
	return <ServicePage service={service} locale="id" />
}
