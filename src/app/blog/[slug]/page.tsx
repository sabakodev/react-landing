import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

const posts: Record<string, {
	title: string
	category: string
	date: string
	readTime: string
	excerpt: string
	content: string[]
}> = {
	'building-scalable-saas-nextjs-2024': {
		title: 'Building Scalable SaaS Platforms with Next.js App Router',
		category: 'Web Development',
		date: '2024-11-14',
		readTime: '8 min read',
		excerpt: 'A deep dive into our architecture choices for multi-tenant SaaS.',
		content: [
			'Building a SaaS platform that serves multiple tenants reliably requires careful attention to data isolation, authentication boundaries, and deployment pipelines. In this article, we share the architecture patterns we developed while building an HR Management SaaS for a mid-size enterprise client.',
			'We chose Next.js App Router for its server component model, which allows us to keep sensitive data-fetching logic on the server while delivering fast, interactive UIs to clients. Combined with Prisma for type-safe database access and Stripe for billing, we were able to ship a production-ready platform in under five months.',
			'One of the key architectural decisions was implementing database-level tenant isolation using PostgreSQL Row Level Security (RLS). This ensures that even if application logic has a bug, data cannot leak between tenants at the database layer.',
			'For deployment, we use Vercel with preview deployments for every pull request. This allows our QA team to test changes in isolated environments before they reach production — a workflow that has virtually eliminated deployment-related incidents.',
			'Performance was a first-class concern throughout. We implemented ISR (Incremental Static Regeneration) for dashboard pages that update infrequently, and streaming SSR for pages that require real-time data. The result: sub-200ms TTFB across all routes.',
		],
	},
	'react-native-vs-flutter-enterprise-2024': {
		title: 'React Native vs Flutter: An Enterprise Perspective',
		category: 'Mobile',
		date: '2024-09-22',
		readTime: '6 min read',
		excerpt: 'After building production apps in both frameworks, here is how we evaluate the right choice.',
		content: [
			'The React Native vs Flutter debate is well-trodden ground, but most comparisons focus on developer experience or widget quality. In enterprise contexts, the calculus is different — what matters is hiring pipeline, long-term maintainability, and integration with existing backend systems.',
			'React Native offers a significant advantage when your backend is already JavaScript/TypeScript-based. Shared types, shared validation logic, and a unified toolchain reduce context-switching and bugs at the boundary between frontend and backend.',
			'Flutter, on the other hand, excels in UI consistency. The Skia rendering engine means your app looks identical on iOS and Android down to the pixel. For consumer products where brand consistency is paramount, this can be a decisive factor.',
			'At SABAKO, we recommend React Native for enterprise projects with complex backend integrations, and Flutter for consumer-facing products where visual polish is the top priority. Both frameworks are production-ready for large-scale applications.',
		],
	},
	'mqtt-iot-architecture-patterns': {
		title: 'MQTT Broker Architecture Patterns for Industrial IoT',
		category: 'IoT',
		date: '2024-07-08',
		readTime: '10 min read',
		excerpt: 'Designing broker topology, message routing, and device authentication for reliable IoT deployments.',
		content: [
			'MQTT is the de facto protocol for IoT messaging, but designing a broker architecture that handles thousands of devices reliably requires more than just spinning up a Mosquitto instance. In this article, we share patterns from our industrial deployments.',
			'The first decision is broker topology. For small deployments (< 100 devices), a single broker with persistence is fine. For larger deployments, we use a bridge topology: edge brokers at each facility connect to a central cloud broker, reducing WAN traffic and providing local resilience.',
			'Device authentication is critical. We use X.509 client certificates for mutual TLS authentication, combined with ACLs that restrict each device to publishing on its own topic namespace. This prevents compromised devices from injecting data for other devices.',
			'On the data ingestion side, we bridge MQTT to a TimescaleDB instance for time-series storage. A small Node.js service subscribes to wildcard topics, validates payloads against JSON Schema, and inserts into hypertables with automatic compression policies.',
			'For monitoring, we built a real-time dashboard using React and Server-Sent Events. Operators can see device health, message rates, and anomaly alerts — all within sub-second latency of the actual sensor readings.',
		],
	},
	'government-software-security-indonesia': {
		title: 'Security Best Practices for Government Software Projects',
		category: 'Security',
		date: '2024-04-30',
		readTime: '7 min read',
		excerpt: 'Lessons learned from building data-sensitive systems for Indonesian government agencies.',
		content: [
			'Government software projects come with a unique set of constraints. Data sovereignty requirements, audit trails, and compliance certifications that commercial clients rarely ask for. At SABAKO, we have developed a security framework that addresses these requirements without slowing down delivery.',
			'Our approach starts with threat modeling before any code is written. We use STRIDE analysis to identify potential threats and map mitigations to each one. This document becomes a living artifact that evolves with the project.',
			'For authentication, we implement multi-factor authentication with support for hardware security keys (WebAuthn/FIDO2). Session management includes automatic timeout, concurrent session limits, and full audit logging of all authentication events.',
			'Data at rest is encrypted using AES-256. Data in transit uses TLS 1.3 exclusively. Database connections use mutual TLS with certificate rotation every 90 days. These are non-negotiable baselines for every government project we deliver.',
		],
	},
	'design-systems-b2b-saas': {
		title: 'Why B2B SaaS Teams Need a Design System (Even Early Stage)',
		category: 'Design',
		date: '2024-02-18',
		readTime: '5 min read',
		excerpt: 'Design systems are not just for big companies.',
		content: [
			'When we started building the HR Management SaaS, the founding team pushed back on investing in a design system. "We are a small team, we need to ship fast." Six months later, we had 47 different button styles across the application.',
			'A design system does not need to be a monorepo with Storybook and automated visual regression tests (though eventually, it should be). Start with a handful of primitive components: Button, Input, Select, Card, and Modal. Define your spacing scale, color tokens, and typography.',
			'The ROI is immediate. New features ship faster because engineers stop debating visual decisions. Design reviews are shorter because the vocabulary is shared. And onboarding new team members takes days instead of weeks.',
			'We now start every client project with a minimal design system. It typically takes 2-3 days to set up and saves 2-3 weeks over the life of the project. The math is not even close.',
		],
	},
	'embedded-c-edge-computing-iot': {
		title: 'Embedded C Patterns for Low-latency Edge Computing',
		category: 'IoT',
		date: '2023-12-05',
		readTime: '9 min read',
		excerpt: 'Firmware architecture lessons from building a water quality monitoring system.',
		content: [
			'When your sensor needs to respond in under 50 milliseconds, the architecture of your firmware matters as much as the hardware it runs on. In this article, we share the embedded C patterns we developed for an industrial water quality monitoring system.',
			'The core pattern is a priority-based event loop. Instead of the typical Arduino-style loop-delay pattern, we use a cooperative scheduler with priority queues. Sensor readings get the highest priority, followed by MQTT publishing, and finally LED status updates.',
			'Memory management on constrained microcontrollers (we used an ESP32 with 520KB SRAM) requires discipline. We allocate all buffers statically at compile time and use ring buffers for sensor data. No malloc, no fragmentation, no surprises.',
			'For OTA (Over-the-Air) updates, we implemented a dual-partition scheme with rollback support. If a new firmware fails health checks within 30 seconds of boot, the device automatically reverts to the previous version. This has been critical for deployments where physical access to devices is difficult.',
			'The result: 99.97% uptime over 18 months across 200+ deployed sensors, with average response latency of 12ms from sensor reading to MQTT publication.',
		],
	},
}

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric',
	})
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = posts[params.slug]
    if (!post) return { title: 'Post Not Found' }

    return {
		title: post.title,
		description: post.excerpt,
		alternates: { canonical: `https://sabako.id/blog/${params.slug}` },
		openGraph: {
			title: `${post.title} — SABAKO Blog`,
			description: post.excerpt,
			type: 'article',
			publishedTime: post.date,
		},
	}
}

export async function generateStaticParams() {
	return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = posts[params.slug]
    if (!post) notFound()

    return (
		<article>
			{/* Header */}
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-3xl px-6 lg:px-8">
					<Link
						href="/blog"
						className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors mb-8 group"
					>
						<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
						Back to Blog
					</Link>

					<span className="text-xs font-mono px-2 py-0.5 border border-[var(--brand)] text-[var(--brand)] mb-4 inline-block">
						{post.category}
					</span>

					<h1 className="text-4xl font-bold text-[var(--text)] leading-tight mt-4 mb-6">
						{post.title}
					</h1>

					<div className="flex items-center gap-4 text-xs text-[var(--text-subtle)]">
						<span className="flex items-center gap-1.5">
							<Calendar size={12} />
							{formatDate(post.date)}
						</span>
						<span className="flex items-center gap-1.5">
							<Clock size={12} />
							{post.readTime}
						</span>
					</div>
				</div>
			</header>

			{/* Content */}
			<section className="py-16">
				<div className="mx-auto max-w-3xl px-6 lg:px-8">
					<div className="space-y-6 text-[var(--text-muted)] leading-relaxed text-base">
						{post.content.map((paragraph, i) => (
							<p key={i}>{paragraph}</p>
						))}
					</div>
				</div>
			</section>

			{/* Bottom nav */}
			<section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-16">
				<div className="mx-auto max-w-3xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<Link
						href="/blog"
						className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group"
					>
						<ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
						All Articles
					</Link>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Start a Project
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
