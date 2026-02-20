/**
 * Blog Posts API
 *
 * Mock data layer — ready to swap with WordPress GraphQL.
 * To connect to WP GraphQL, uncomment the WP block and set:
 *   NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-wp-site.com/graphql
 *
 * WP GraphQL query example (requires WPGraphQL + Custom Post Types plugin):
 *
 * const WP_QUERY = `
 *   query GetPosts($first: Int) {
 *     posts(first: $first) {
 *       nodes {
 *         slug
 *         title
 *         excerpt
 *         date
 *         categories { nodes { name } }
 *         postFields { readTime }
 *         content
 *       }
 *     }
 *   }
 * `
 */

export type Post = {
	slug: string
	category: string
	title: string
	excerpt: string
	date: string
	readTime: string
	content?: string[]
}

const mockPosts: Post[] = [
	{
		slug: 'building-scalable-saas-nextjs-2024',
		category: 'Web Development',
		title: 'Building Scalable SaaS Platforms with Next.js App Router',
		excerpt: 'A deep dive into our architecture choices for multi-tenant SaaS — from database sharding to edge caching and CI/CD pipelines.',
		date: '2024-11-14',
		readTime: '8 min read',
		content: [
			'Building a SaaS platform that serves multiple tenants reliably requires careful attention to data isolation, authentication boundaries, and deployment pipelines. In this article, we share the architecture patterns we developed while building an HR Management SaaS for a mid-size enterprise client.',
			'We chose Next.js App Router for its server component model, which allows us to keep sensitive data-fetching logic on the server while delivering fast, interactive UIs to clients. Combined with Prisma for type-safe database access and Stripe for billing, we were able to ship a production-ready platform in under five months.',
			'One of the key architectural decisions was implementing database-level tenant isolation using PostgreSQL Row Level Security (RLS). This ensures that even if application logic has a bug, data cannot leak between tenants at the database layer.',
			'For deployment, we use Vercel with preview deployments for every pull request. This allows our QA team to test changes in isolated environments before they reach production — a workflow that has virtually eliminated deployment-related incidents.',
			'Performance was a first-class concern throughout. We implemented ISR (Incremental Static Regeneration) for dashboard pages that update infrequently, and streaming SSR for pages that require real-time data. The result: sub-200ms TTFB across all routes.',
		],
	},
	{
		slug: 'react-native-vs-flutter-enterprise-2024',
		category: 'Mobile',
		title: 'React Native vs Flutter: An Enterprise Perspective',
		excerpt: 'After building production apps in both frameworks, here is how we evaluate the right choice for large-scale mobile projects.',
		date: '2024-09-22',
		readTime: '6 min read',
		content: [
			'The React Native vs Flutter debate is well-trodden ground, but most comparisons focus on developer experience or widget quality. In enterprise contexts, the calculus is different — what matters is hiring pipeline, long-term maintainability, and integration with existing backend systems.',
			'React Native offers a significant advantage when your backend is already JavaScript/TypeScript-based. Shared types, shared validation logic, and a unified toolchain reduce context-switching and bugs at the boundary between frontend and backend.',
			'Flutter, on the other hand, excels in UI consistency. The Skia rendering engine means your app looks identical on iOS and Android down to the pixel. For consumer products where brand consistency is paramount, this can be a decisive factor.',
			'At SABAKO, we recommend React Native for enterprise projects with complex backend integrations, and Flutter for consumer-facing products where visual polish is the top priority. Both frameworks are production-ready for large-scale applications.',
		],
	},
	{
		slug: 'mqtt-iot-architecture-patterns',
		category: 'IoT',
		title: 'MQTT Broker Architecture Patterns for Industrial IoT',
		excerpt: 'Designing broker topology, message routing, and device authentication for reliable IoT deployments at scale.',
		date: '2024-07-08',
		readTime: '10 min read',
		content: [
			'MQTT is the de facto protocol for IoT messaging, but designing a broker architecture that handles thousands of devices reliably requires more than just spinning up a Mosquitto instance. In this article, we share patterns from our industrial deployments.',
			'The first decision is broker topology. For small deployments (< 100 devices), a single broker with persistence is fine. For larger deployments, we use a bridge topology: edge brokers at each facility connect to a central cloud broker, reducing WAN traffic and providing local resilience.',
			'Device authentication is critical. We use X.509 client certificates for mutual TLS authentication, combined with ACLs that restrict each device to publishing on its own topic namespace. This prevents compromised devices from injecting data for other devices.',
			'On the data ingestion side, we bridge MQTT to a TimescaleDB instance for time-series storage. A small Node.js service subscribes to wildcard topics, validates payloads against JSON Schema, and inserts into hypertables with automatic compression policies.',
		],
	},
	{
		slug: 'government-software-security-indonesia',
		category: 'Security',
		title: 'Security Best Practices for Government Software Projects',
		excerpt: 'Lessons learned from building data-sensitive systems for Indonesian government agencies — compliance, pen testing, and incident response.',
		date: '2024-04-30',
		readTime: '7 min read',
		content: [
			'Government software projects come with a unique set of constraints. Data sovereignty requirements, audit trails, and compliance certifications that commercial clients rarely ask for. At SABAKO, we have developed a security framework that addresses these requirements without slowing down delivery.',
			'Our approach starts with threat modeling before any code is written. We use STRIDE analysis to identify potential threats and map mitigations to each one. This document becomes a living artifact that evolves with the project.',
			'For authentication, we implement multi-factor authentication with support for hardware security keys (WebAuthn/FIDO2). Session management includes automatic timeout, concurrent session limits, and full audit logging of all authentication events.',
		],
	},
	{
		slug: 'design-systems-b2b-saas',
		category: 'Design',
		title: 'Why B2B SaaS Teams Need a Design System (Even Early Stage)',
		excerpt: 'Design systems are not just for big companies. Here is how they saved us from months of rework on a mid-size HR SaaS product.',
		date: '2024-02-18',
		readTime: '5 min read',
		content: [
			'When we started building the HR Management SaaS, the founding team pushed back on investing in a design system. "We are a small team, we need to ship fast." Six months later, we had 47 different button styles across the application.',
			'A design system does not need to be a monorepo with Storybook and automated visual regression tests (though eventually, it should be). Start with a handful of primitive components: Button, Input, Select, Card, and Modal. Define your spacing scale, color tokens, and typography.',
			'The ROI is immediate. New features ship faster because engineers stop debating visual decisions. Design reviews are shorter because the vocabulary is shared. And onboarding new team members takes days instead of weeks.',
		],
	},
	{
		slug: 'embedded-c-edge-computing-iot',
		category: 'IoT',
		title: 'Embedded C Patterns for Low-latency Edge Computing',
		excerpt: 'Firmware architecture lessons from building a water quality monitoring system with sub-50ms sensor response requirements.',
		date: '2023-12-05',
		readTime: '9 min read',
		content: [
			'When your sensor needs to respond in under 50 milliseconds, the architecture of your firmware matters as much as the hardware it runs on. In this article, we share the embedded C patterns we developed for an industrial water quality monitoring system.',
			'The core pattern is a priority-based event loop. Instead of the typical Arduino-style loop-delay pattern, we use a cooperative scheduler with priority queues. Sensor readings get the highest priority, followed by MQTT publishing, and finally LED status updates.',
			'Memory management on constrained microcontrollers (we used an ESP32 with 520KB SRAM) requires discipline. We allocate all buffers statically at compile time and use ring buffers for sensor data. No malloc, no fragmentation, no surprises.',
		],
	},
]

export async function getPosts(): Promise<Post[]> {
	// --- WP GraphQL (uncomment and configure NEXT_PUBLIC_WP_GRAPHQL_URL to enable) ---
	// const res = await fetch(process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!, {
	//   method: 'POST',
	//   headers: { 'Content-Type': 'application/json' },
	//   body: JSON.stringify({ query: WP_QUERY, variables: { first: 20 } }),
	//   next: { revalidate: 3600 },
	// })
	// const { data } = await res.json()
	// return data.posts.nodes.map(mapWpPost)
	// ---------------------------------------------------------------------------------
	return mockPosts
}

export async function getPost(slug: string): Promise<Post | undefined> {
	const posts = await getPosts()
	return posts.find((p) => p.slug === slug)
}
