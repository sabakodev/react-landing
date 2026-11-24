import type { Metadata } from 'next'
import { ServicesIndex } from '@/components/services/ServicesIndex'
import { localeAlternates } from '@/lib/seo/metadata'
import { pageCopy } from '@/lib/pageCopy'

export const metadata: Metadata = {
	title: pageCopy.en.servicesMetaTitle,
	description: pageCopy.en.servicesMetaDescription,
	alternates: localeAlternates('en', '/services', '/id/services'),
	openGraph: {
		title: 'Services — SABAKO',
		description: 'Web Development, App Development, and IoT Research & Prototyping.',
	},
}

export default function ServicesPage() {
	return <ServicesIndex locale="en" />
}
