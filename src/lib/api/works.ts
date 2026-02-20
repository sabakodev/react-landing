/**
 * Works / Portfolio API (WordPress Custom Post Type ready)
 *
 * To connect to WP GraphQL, set NEXT_PUBLIC_WP_GRAPHQL_URL and uncomment the WP block.
 * Requires: WPGraphQL plugin + a "work" CPT with ACF/custom fields.
 *
 * WP GraphQL query example:
 *
 * const WP_QUERY = `
 *   query GetWorks($first: Int) {
 *     works(first: $first) {
 *       nodes {
 *         slug
 *         title
 *         workFields {
 *           category
 *           client
 *           year
 *           description
 *           challenge
 *           solution
 *           outcome
 *           tags
 *           featured
 *           type
 *         }
 *       }
 *     }
 *   }
 * `
 */

export type Work = {
	id: string
	slug: string
	category: string
	type: 'web' | 'mobile' | 'iot'
	title: string
	client: string
	year: string
	description: string
	tags: string[]
	featured?: boolean
	// Detail page fields
	challenge?: string
	solution?: string
	outcome?: string
}

const mockWorks: Work[] = [
	{
		id: 'enterprise-erp',
		slug: 'enterprise-erp',
		category: 'Web Application',
		type: 'web',
		title: 'Enterprise Resource Planning System',
		client: 'Government Agency',
		year: '2024',
		description: 'A comprehensive ERP system built for a government agency, enabling integrated management of procurement, HR, finance, and reporting across multiple departments.',
		tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
		featured: true,
		challenge: 'A government agency managing 12 departments needed to replace a 15-year-old fragmented system of Excel spreadsheets and standalone desktop apps. Data silos, manual reconciliations, and lack of audit trails were creating compliance risks.',
		solution: 'We designed a unified web-based ERP with role-based access control, real-time dashboards, and a full audit log. PostgreSQL Row Level Security ensured department-level data isolation without complex application logic.',
		outcome: 'Reduced monthly reporting time by 70%. Full audit compliance achieved. System now serves 200+ concurrent users with sub-200ms response times.',
	},
	{
		id: 'logistics-mobile',
		slug: 'logistics-mobile',
		category: 'Mobile Product',
		type: 'mobile',
		title: 'Real-time Logistics Tracking App',
		client: 'Logistics Company, Surabaya',
		year: '2024',
		description: 'A cross-platform mobile application enabling real-time GPS tracking, proof-of-delivery, and driver–dispatcher communication for a major logistics group.',
		tags: ['React Native', 'Firebase', 'Google Maps API'],
		featured: true,
		challenge: 'A logistics company with 300+ drivers had no real-time visibility into delivery progress. Dispatchers relied on phone calls, and customers had no tracking capability — leading to complaints and inefficiency.',
		solution: 'We built a React Native app for drivers (proof-of-delivery with photo capture, GPS tracking, route optimization) and a web dashboard for dispatchers (live map, ETA updates, alerts).',
		outcome: 'Driver call volume dropped by 85%. Customer complaints reduced by 60%. On-time delivery rate improved from 72% to 91%.',
	},
	{
		id: 'smart-building',
		slug: 'smart-building',
		category: 'Connected System',
		type: 'iot',
		title: 'Smart Building Management Platform',
		client: 'Commercial Developer, BSD City',
		year: '2023',
		description: 'End-to-end IoT platform including embedded firmware for sensors, MQTT messaging, and a Next.js management dashboard for a commercial property developer.',
		tags: ['IoT', 'MQTT', 'Next.js', 'TimescaleDB'],
		featured: true,
		challenge: 'A commercial property developer with 4 buildings wanted to centralize energy monitoring, HVAC control, and security access — previously managed through separate, incompatible vendor systems.',
		solution: 'We deployed 400+ sensors with custom ESP32 firmware, an MQTT broker cluster, and a time-series database. The Next.js dashboard provided building operators with real-time and historical analytics.',
		outcome: 'Energy costs reduced by 23%. Maintenance response time cut in half. Single dashboard now covers all 4 buildings.',
	},
	{
		id: 'saas-hrm',
		slug: 'saas-hrm',
		category: 'SaaS Platform',
		type: 'web',
		title: 'HR Management SaaS',
		client: 'Mid-size Enterprise',
		year: '2023',
		description: 'A full-featured human resource management platform with payroll, leave management, performance reviews, and subscription billing via Stripe.',
		tags: ['Next.js', 'Prisma', 'Stripe', 'AWS'],
		featured: false,
		challenge: 'A growing company needed a customizable HR system that could handle their unique approval workflows and integrate with their existing payroll provider — off-the-shelf SaaS options were too rigid.',
		solution: 'We built a multi-tenant SaaS with configurable approval chains, payroll export APIs, and Stripe-powered subscription billing. Deployed on AWS with automated scaling.',
		outcome: 'Shipped in 5 months. 98.9% uptime in first year. Used by 3 companies across 600+ employees.',
	},
	{
		id: 'ecommerce-marketplace',
		slug: 'ecommerce-marketplace',
		category: 'E-commerce',
		type: 'web',
		title: 'Multi-vendor Marketplace',
		client: 'Retail Group, Jakarta',
		year: '2022',
		description: 'A high-traffic multi-vendor marketplace handling thousands of daily transactions with real-time inventory, seller dashboards, and a mobile buyer app.',
		tags: ['Next.js', 'Elasticsearch', 'Redis', 'Flutter'],
		featured: false,
		challenge: 'A retail group wanted to digitize their network of 80+ independent sellers into a unified marketplace — handling product discovery, payments, and logistics across all vendors.',
		solution: 'We built a Next.js marketplace with Elasticsearch-powered search, Redis-cached inventory, Stripe Connect for seller payouts, and a Flutter mobile app for buyers.',
		outcome: 'Peak 3,000 concurrent users on launch day with zero downtime. 80 sellers onboarded in the first month.',
	},
	{
		id: 'water-monitoring',
		slug: 'water-monitoring',
		category: 'Connected System',
		type: 'iot',
		title: 'Industrial Water Quality Monitor',
		client: 'Manufacturing Facility',
		year: '2022',
		description: 'IoT-based water quality monitoring system with embedded sensors, alerting, compliance reporting, and a web dashboard for facility management.',
		tags: ['Embedded C', 'MQTT', 'Node.js', 'React'],
		featured: false,
		challenge: 'A manufacturing facility needed continuous water quality monitoring across 12 discharge points to meet environmental compliance requirements — manual sampling was too slow and expensive.',
		solution: 'We deployed custom sensors with embedded C firmware, MQTT telemetry, and automated compliance report generation. Alerts fired within 30 seconds of threshold breaches.',
		outcome: '99.97% uptime over 18 months. Zero compliance violations. Sampling costs reduced by 80%.',
	},
]

type GetWorksOptions = {
	featured?: boolean
	limit?: number
}

export async function getWorks(options?: GetWorksOptions): Promise<Work[]> {
	// --- WP GraphQL (uncomment to enable) ---
	// const res = await fetch(process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!, { ... })
	// const { data } = await res.json()
	// return data.works.nodes.map(mapWpWork)
	// ----------------------------------------
	let results = mockWorks
	if (options?.featured) results = results.filter((w) => w.featured)
	if (options?.limit) results = results.slice(0, options.limit)
	return results
}

export async function getWork(slug: string): Promise<Work | undefined> {
	const works = await getWorks()
	return works.find((w) => w.slug === slug)
}
