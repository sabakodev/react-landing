import type { Metadata } from 'next'
import { ServicesIndex } from '@/components/services/ServicesIndex'
import { SITE_URL } from '@/lib/seo/jsonld'
import { baseOpenGraph, localeAlternates, twitterCard } from '@/lib/seo/metadata'
import { pageCopy } from '@/lib/pageCopy'

export const metadata: Metadata = {
	title: pageCopy.id.servicesMetaTitle,
	description: pageCopy.id.servicesMetaDescription,
	alternates: localeAlternates('id', '/services', '/id/services'),
	openGraph: {
		...baseOpenGraph,
		locale: 'id_ID',
		url: `${SITE_URL}/id/services`,
		title: pageCopy.id.servicesMetaTitle,
		description: pageCopy.id.servicesMetaDescription,
	},
	twitter: twitterCard(pageCopy.id.servicesMetaTitle, pageCopy.id.servicesMetaDescription),
}

export default function IdServicesPage() {
	return (
		<div lang="id">
			<ServicesIndex locale="id" />
		</div>
	)
}
