/**
 * WordPress GraphQL API adapter — Works / Portfolio.
 *
 * Wraps mock data and live WPGraphQL.
 * Set NEXT_PUBLIC_WP_GRAPHQL_URL in .env.local to switch to live.
 */

import { wpClient, hasWpEndpoint } from '@/lib/graphql/client'
import { GET_WORKS, GET_WORK_BY_SLUG } from '@/lib/graphql/queries/works'
import type {
	WorksQueryResponse,
	WorkBySlugQueryResponse,
	WPWork,
	WPWorkCard,
} from '@/lib/graphql/types'

// ---------------------------------------------------------------------------
// Normalized shape — matches the existing Work type from @/lib/api/works
// ---------------------------------------------------------------------------

export type Work = {
	id: string
	slug: string
	title: string
	client: string
	year: string
	type: 'web' | 'mobile' | 'iot'
	category: string
	description: string
	challenge?: string
	solution?: string
	outcome?: string
	tags: string[]
	featured: boolean
	coverImage?: string
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockWorks: Work[] = [
	{
		id: 'enterprise-erp',
		slug: 'enterprise-erp',
		title: 'Enterprise Resource Planning System',
		client: 'Government Agency',
		year: '2024',
		type: 'web',
		category: 'Web Application',
		description: 'End-to-end ERP platform serving a large government agency across procurement, HR, and finance modules.',
		challenge: 'The agency operated on disconnected legacy tools with no unified data layer, causing delays in reporting and compliance.',
		solution: 'We designed a modular ERP with a shared Postgres backbone, a React frontend, and a Node.js API layer with role-based access.',
		outcome: 'Reduced reporting time by 70%, unified 1,200+ staff onto one platform, and passed government data-sovereignty audit.',
		tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
		featured: true,
	},
	{
		id: 'logistics-mobile',
		slug: 'logistics-mobile',
		title: 'Fleet & Logistics Mobile App',
		client: 'Logistics Startup',
		year: '2024',
		type: 'mobile',
		category: 'Mobile Application',
		description: 'Cross-platform driver and dispatch app replacing paper-based workflows for a fast-growing logistics company.',
		challenge: 'Dispatchers relied on WhatsApp and paper manifests, causing lost deliveries and zero real-time visibility.',
		solution: 'React Native app for drivers + web dashboard for dispatchers, real-time status via WebSockets, GPS tracking integration.',
		outcome: 'Delivery confirmation rate rose to 98.5%, SLA breaches dropped 60%, onboarded 300+ drivers in week one.',
		tags: ['React Native', 'Node.js', 'WebSockets', 'Maps API'],
		featured: true,
	},
	{
		id: 'smart-building',
		slug: 'smart-building',
		title: 'Smart Building Energy Management',
		client: 'Property Developer',
		year: '2023',
		type: 'iot',
		category: 'IoT Solution',
		description: 'IoT platform for monitoring and controlling energy consumption across 12 commercial buildings.',
		challenge: 'No visibility into floor-level energy usage; electricity bills were 40% above industry benchmarks.',
		solution: 'ESP32-based sensor nodes with MQTT, a TimescaleDB time-series backend, and a Next.js dashboard for facility managers.',
		outcome: 'Energy consumption reduced by 31% in the first 6 months; ROI achieved within 14 months.',
		tags: ['ESP32', 'MQTT', 'TimescaleDB', 'Next.js'],
		featured: true,
	},
	{
		id: 'hr-saas',
		slug: 'hr-saas',
		title: 'HR SaaS Platform',
		client: 'HR Tech Startup',
		year: '2023',
		type: 'web',
		category: 'SaaS Platform',
		description: 'Multi-tenant HR platform with payroll, attendance, and performance review modules.',
		tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
		featured: false,
	},
	{
		id: 'inventory-mobile',
		slug: 'inventory-mobile',
		title: 'Warehouse Inventory App',
		client: 'Retail Chain',
		year: '2023',
		type: 'mobile',
		category: 'Mobile Application',
		description: 'Barcode-scanning inventory management app for warehouse staff across 8 distribution centers.',
		tags: ['React Native', 'Expo', 'REST API'],
		featured: false,
	},
	{
		id: 'aquaculture-iot',
		slug: 'aquaculture-iot',
		title: 'Smart Aquaculture Monitoring',
		client: 'Fishery Cooperative',
		year: '2023',
		type: 'iot',
		category: 'IoT Solution',
		description: 'Water quality monitoring system for shrimp ponds using IoT sensors and automated alerts.',
		tags: ['Arduino', 'MQTT', 'InfluxDB', 'React'],
		featured: false,
	},
]

// ---------------------------------------------------------------------------
// Adapter helpers
// ---------------------------------------------------------------------------

function normalizeWpWork(w: WPWork | WPWorkCard): Work {
	const f = w.workFields
	return {
		id: String(w.databaseId),
		slug: w.slug,
		title: w.title,
		client: f?.client ?? '',
		year: f?.year ?? w.date?.split('-')[0] ?? '',
		type: (f?.type as Work['type']) ?? 'web',
		category: f?.category ?? '',
		description: f?.description ?? '',
		challenge: (w as WPWork).workFields?.challenge,
		solution: (w as WPWork).workFields?.solution,
		outcome: (w as WPWork).workFields?.outcome,
		tags: f?.tags ?? [],
		featured: f?.featured ?? false,
		coverImage: w.featuredImage?.node?.sourceUrl,
	}
}

// ---------------------------------------------------------------------------
// Public API — mirrors existing @/lib/api/works interface
// ---------------------------------------------------------------------------

export async function getWorks(opts?: { featured?: boolean; limit?: number }): Promise<Work[]> {
	let works: Work[]
	if (hasWpEndpoint()) {
		try {
			const data = await wpClient.request<WorksQueryResponse>(GET_WORKS, { first: 100 })
			works = data.works.nodes.map(normalizeWpWork)
		} catch {
			// Live query failed (CPT/ACF not yet configured) — use mock fallback
			works = mockWorks
		}
	} else {
		works = mockWorks
	}

	let result = works
	if (opts?.featured) result = result.filter((w) => w.featured)
	if (opts?.limit) result = result.slice(0, opts.limit)
	return result
}

export async function getWork(slug: string): Promise<Work | null> {
	if (!hasWpEndpoint()) return mockWorks.find((w) => w.slug === slug) ?? null
	try {
		const data = await wpClient.request<WorkBySlugQueryResponse>(GET_WORK_BY_SLUG, { slug })
		if (!data.workBy) return null
		return normalizeWpWork(data.workBy)
	} catch {
		return mockWorks.find((w) => w.slug === slug) ?? null
	}
}
