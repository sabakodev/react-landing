/**
 * WordPress GraphQL API adapter — Posts / Blog.
 *
 * All content comes from the live WordPress GraphQL endpoint.
 * No mock data — if the endpoint is unavailable, an empty array / null is returned.
 */

import { wpClient } from '@/lib/graphql/client'
import { GET_POSTS, GET_POST_BY_SLUG } from '@/lib/graphql/queries/posts'
import type {
	PostsQueryResponse,
	PostBySlugQueryResponse,
	WPPost,
	WPPostCard,
} from '@/lib/graphql/types'

// ---------------------------------------------------------------------------
// Normalized blog post shape
// ---------------------------------------------------------------------------

export type BlogPost = {
	slug: string
	title: string
	keyword: string[]
	/** Plain-text excerpt (HTML tags stripped) */
	excerpt: string
	/** Full HTML content — rendered by WP, use dangerouslySetInnerHTML */
	content: string
	/** ISO date string, YYYY-MM-DD */
	date: string
	/** ISO date-time of the last WordPress edit */
	modified?: string
	/** First category name */
	category: string
	/** Estimated read time (computed locally) */
	readTime: string
	/** Author display name */
	author: string
	/** Tag names */
	tags: string[]
	/** Featured image URL (undefined if none) */
	coverImage?: string
	/** Alt text for featured image */
	coverImageAlt?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip HTML tags and estimate reading time (200wpm) */
function estimateReadTime(htmlContent: string): string {
	const text = htmlContent.replace(/<[^>]+>/g, ' ').trim()
	const wordCount = text.split(/\s+/).filter(Boolean).length
	const minutes = Math.max(1, Math.ceil(wordCount / 200))
	return `${minutes} min read`
}

function normalizeWpPost(post: WPPost | WPPostCard): BlogPost {
	const full = post as WPPost
	const rawContent = full.content ?? ''
	return {
		slug: post.slug,
		title: post.title,
		date: post.date?.split('T')[0] ?? '',
		modified: post.modified || undefined,
		category: post.categories?.nodes?.[0]?.name ?? 'General',
		readTime: rawContent ? estimateReadTime(rawContent) : '5 min read',
		author: full.author?.node?.name ?? 'SABAKO Team',
		tags: full.tags?.nodes?.map((t) => t.name) ?? [],
		excerpt: full.seo?.metaDesc ?? (full.excerpt ?? '').replace(/<[^>]+>/g, '').trim(),
		keyword: ['sabako', full.seo?.focuskw ?? 'blog'],
		content: rawContent,
		coverImage: post.featuredImage?.node?.sourceUrl,
		coverImageAlt: post.featuredImage?.node?.altText ?? post.title,
	}
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const PAGE_SIZE = 100
/** Safety cap: at most PAGE_SIZE * MAX_PAGES posts are fetched */
const MAX_PAGES = 20

export async function getPosts(): Promise<BlogPost[]> {
	try {
		const posts: BlogPost[] = []
		let after: string | null = null
		for (let page = 0; page < MAX_PAGES; page++) {
			const data: PostsQueryResponse = await wpClient.request<PostsQueryResponse>(GET_POSTS, { first: PAGE_SIZE, after })
			posts.push(...data.posts.nodes.map(normalizeWpPost))
			const { hasNextPage, endCursor } = data.posts.pageInfo
			// Stop on a missing or repeated cursor so a misbehaving API cannot loop
			if (!hasNextPage || !endCursor || endCursor === after) break
			after = endCursor
		}
		return posts
	} catch {
		return []
	}
}

export async function getPost(slug: string): Promise<BlogPost | null> {
	try {
		const data = await wpClient.request<PostBySlugQueryResponse>(GET_POST_BY_SLUG, { slug })
		console.debug(data.postBy?.author?.node?.name)
		if (!data.postBy) return null
		return normalizeWpPost(data.postBy)
	} catch (error) {
		return null
	}
}
