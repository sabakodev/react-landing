/**
 * JSON-LD builders. The Organization node (`#org`) is emitted once, in the
 * root layout; every other node references it by `@id` only.
 */

import { publishedServices, serviceHref } from '@/lib/services'
import type { Service, ServiceFaq } from '@/lib/services'
import type { Locale } from '@/lib/pageCopy'
import type { BlogPost } from '@/lib/graphql/adapters/posts'
import type { Work } from '@/lib/graphql/adapters/works'

export const SITE_URL = 'https://sabako.id'
export const ORG_ID = `${SITE_URL}/#org`
export const SITE_DESCRIPTION =
	'SABAKO is a Jakarta-based IT agency. We build websites, web apps, mobile apps and AI features, and offer IoT research, prototyping and consulting for ambitious businesses.'

type JsonLdNode = Record<string, unknown>

const orgRef = { '@id': ORG_ID }

const areaServed = { '@type': 'Country', name: 'Indonesia' }

function serviceId(service: Service, locale: Locale = 'en'): string {
	return `${SITE_URL}${serviceHref(service, locale)}#service`
}

export function organization(): JsonLdNode {
	const services = publishedServices()
	return {
		'@type': ['Organization', 'ProfessionalService'],
		'@id': ORG_ID,
		name: 'SABAKO',
		legalName: 'PT. SABAKO KREATIV DIGITAL',
		url: SITE_URL,
		logo: `${SITE_URL}/sabako-bimi.svg`,
		image: `${SITE_URL}/sky.jpg`,
		description: SITE_DESCRIPTION,
		foundingDate: '2018',
		email: 'sales@sabako.id',
		telephone: '+62 857-6061-6555',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Jl. Bangka Raya No. 48',
			addressLocality: 'Mampang Prapatan',
			postalCode: '12720',
			addressRegion: 'Jakarta',
			addressCountry: 'ID',
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+62 857-6061-6555',
			contactType: 'sales',
			email: 'sales@sabako.id',
		},
		areaServed,
		knowsAbout: services.map((s) => s.name),
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services',
			itemListElement: services.map((s) => ({
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					'@id': serviceId(s),
					name: s.name,
					url: `${SITE_URL}${serviceHref(s)}`,
				},
			})),
		},
		sameAs: [],
	}
}

export function website(): JsonLdNode {
	return {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: SITE_URL,
		name: 'SABAKO',
		inLanguage: 'en',
		publisher: orgRef,
	}
}

/** `s` should already be localized (see localizeService). */
export function service(s: Service, locale: Locale = 'en'): JsonLdNode {
	return {
		'@type': 'Service',
		'@id': serviceId(s, locale),
		name: s.name,
		serviceType: s.name,
		description: s.summary,
		url: `${SITE_URL}${serviceHref(s, locale)}`,
		inLanguage: locale,
		provider: orgRef,
		areaServed,
	}
}

export function breadcrumb(items: { name: string; path: string }[]): JsonLdNode {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`,
		})),
	}
}

export function faqPage(faqs: ServiceFaq[]): JsonLdNode {
	return {
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer },
		})),
	}
}

export function blogPosting(post: BlogPost): JsonLdNode {
	const url = `${SITE_URL}/blog/${post.slug}`
	return {
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		headline: post.title,
		description: post.excerpt,
		url,
		mainEntityOfPage: url,
		datePublished: post.date,
		dateModified: post.modified ?? post.date,
		author: post.author ? { '@type': 'Person', name: post.author } : orgRef,
		publisher: orgRef,
		inLanguage: 'en',
		...(post.coverImage ? { image: post.coverImage } : {}),
		...(post.tags.length ? { keywords: post.tags } : {}),
	}
}

export function caseStudy(work: Work): JsonLdNode {
	const url = `${SITE_URL}/work/${work.slug}`
	return {
		'@type': 'CreativeWork',
		'@id': `${url}#work`,
		name: work.title,
		description: work.description,
		url,
		genre: work.engagementKind,
		creator: orgRef,
		publisher: orgRef,
		...(/^\d{4}$/.test(work.year) ? { dateCreated: work.year } : {}),
		...(work.modified ? { dateModified: work.modified } : {}),
		...(work.coverImage ? { image: work.coverImage } : {}),
		...(work.tags.length ? { keywords: work.tags } : {}),
		// Client identity is only published for named (non-confidential) client work
		...(work.engagementKind === 'client' && work.client
			? { about: { '@type': 'Organization', name: work.client } }
			: {}),
	}
}
