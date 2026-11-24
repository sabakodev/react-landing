import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage, serviceMetadata } from '@/components/services/ServicePage'
import { publishedServices } from '@/lib/services'

type Props = { params: Promise<{ slug: string }> }

// Unpublished catalog slugs are not generated, so they 404.
export const dynamicParams = false

export function generateStaticParams() {
	return publishedServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { slug } = await props.params
	const service = publishedServices().find((s) => s.slug === slug)
	return service ? serviceMetadata(service, 'en') : {}
}

export default async function ServiceRoute(props: Props) {
	const { slug } = await props.params
	const service = publishedServices().find((s) => s.slug === slug)
	if (!service) notFound()
	return <ServicePage service={service} locale="en" />
}
