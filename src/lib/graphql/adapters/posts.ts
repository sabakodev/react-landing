/**
 * WordPress GraphQL API adapter — Posts / Blog.
 *
 * This file wraps both the mock data and the live WPGraphQL queries.
 * Switch behavior: set NEXT_PUBLIC_WP_GRAPHQL_URL in .env.local.
 *
 * When the env var is missing → mock data is used automatically.
 * When the env var is present → live WPGraphQL queries run.
 */

import { wpClient, hasWpEndpoint } from '@/lib/graphql/client'
import { GET_POSTS, GET_POST_BY_SLUG } from '@/lib/graphql/queries/posts'
import type {
	PostsQueryResponse,
	PostBySlugQueryResponse,
	WPPost,
	WPPostCard,
} from '@/lib/graphql/types'

// ---------------------------------------------------------------------------
// Normalized shape — matches the existing mock blog post shape
// ---------------------------------------------------------------------------

export type BlogPost = {
	slug: string
	title: string
	excerpt: string
	content: string
	date: string
	category: string
	readTime: string
	author: string
	tags: string[]
	coverImage?: string
}

// ---------------------------------------------------------------------------
// Mock data (used when WP endpoint is not configured)
// ---------------------------------------------------------------------------

const mockPosts: Record<string, BlogPost> = {
	'building-scalable-saas-nextjs-2024': {
		slug: 'building-scalable-saas-nextjs-2024',
		title: 'Building Scalable SaaS Platforms with Next.js in 2024',
		date: '2024-05-15',
		category: 'Engineering',
		readTime: '8 min read',
		author: 'SABAKO Team',
		tags: ['Next.js', 'SaaS', 'Architecture'],
		excerpt: 'A deep dive into the architectural patterns and tooling choices we use when building SaaS products with Next.js at scale.',
		content: '<p>Full article content here…</p>',
	},
	'react-native-vs-flutter-enterprise-2024': {
		slug: 'react-native-vs-flutter-enterprise-2024',
		title: 'React Native vs Flutter for Enterprise Mobile in 2024',
		date: '2024-04-28',
		category: 'Mobile',
		readTime: '6 min read',
		author: 'SABAKO Team',
		tags: ['React Native', 'Flutter', 'Mobile'],
		excerpt: 'An honest comparison of both frameworks for complex, long-lived enterprise apps.',
		content: '<p>Full article content here…</p>',
	},
	'mqtt-iot-architecture-patterns': {
		slug: 'mqtt-iot-architecture-patterns',
		title: 'MQTT Architecture Patterns for Industrial IoT',
		date: '2024-04-10',
		category: 'IoT',
		readTime: '10 min read',
		author: 'SABAKO Team',
		tags: ['IoT', 'MQTT', 'Architecture'],
		excerpt: 'How SABAKO structures MQTT-based communication for reliable, high-throughput industrial IoT systems.',
		content: '<p>Full article content here…</p>',
	},
	'design-systems-enterprise-ux': {
		slug: 'design-systems-enterprise-ux',
		title: 'Design Systems that Scale: Lessons from Enterprise UX',
		date: '2024-03-22',
		category: 'Design',
		readTime: '7 min read',
		author: 'SABAKO Team',
		tags: ['Design System', 'UX', 'Enterprise'],
		excerpt: 'Building a token-based, component-driven design system for a government-facing enterprise portal.',
		content: '<p>Full article content here…</p>',
	},
	'nextjs-edge-runtime-performance': {
		slug: 'nextjs-edge-runtime-performance',
		title: 'Next.js Edge Runtime: When, Why, and How',
		date: '2024-03-05',
		category: 'Engineering',
		readTime: '5 min read',
		author: 'SABAKO Team',
		tags: ['Next.js', 'Edge', 'Performance'],
		excerpt: 'Exploring the trade-offs of running Next.js functions at the edge for sub-100ms global responses.',
		content: '<p>Full article content here…</p>',
	},
	'iot-security-firmware-best-practices': {
		slug: 'iot-security-firmware-best-practices',
		title: 'IoT Security: Firmware Best Practices for Production Devices',
		date: '2024-02-18',
		category: 'IoT',
		readTime: '9 min read',
		author: 'SABAKO Team',
		tags: ['IoT', 'Security', 'Firmware'],
		excerpt: 'The security considerations we apply at the firmware level for every embedded device we ship.',
		content: '<p>Full article content here…</p>',
	},
}

// ---------------------------------------------------------------------------
// Adapter helpers
// ---------------------------------------------------------------------------

function normalizeWpPost(post: WPPost | WPPostCard): BlogPost {
	const full = post as WPPost
	return {
		slug: post.slug,
		title: post.title,
		date: post.date?.split('T')[0] ?? '',
		category: post.categories?.nodes?.[0]?.name ?? 'General',
		readTime: '5 min read', // WP doesn't provide read-time natively
		author: full.author?.node?.name ?? 'SABAKO Team',
		tags: full.tags?.nodes?.map((t) => t.name) ?? [],
		excerpt: (full.excerpt ?? '').replace(/<[^>]+>/g, '').trim(),
		content: full.content ?? '',
		coverImage: post.featuredImage?.node?.sourceUrl,
	}
}

// ---------------------------------------------------------------------------
// Public API — matches the existing consumer interface
// ---------------------------------------------------------------------------

export async function getPosts(): Promise<BlogPost[]> {
	if (!hasWpEndpoint()) return Object.values(mockPosts)
	try {
		const data = await wpClient.request<PostsQueryResponse>(GET_POSTS, { first: 100 })
		return data.posts.nodes.map(normalizeWpPost)
	} catch {
		return Object.values(mockPosts)
	}
}

export async function getPost(slug: string): Promise<BlogPost | null> {
	if (!hasWpEndpoint()) return mockPosts[slug] ?? null
	try {
		const data = await wpClient.request<PostBySlugQueryResponse>(GET_POST_BY_SLUG, { slug })
		if (!data.postBy) return null
		return normalizeWpPost(data.postBy)
	} catch {
		return mockPosts[slug] ?? null
	}
}
