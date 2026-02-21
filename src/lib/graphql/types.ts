/**
 * WordPress GraphQL — TypeScript types.
 *
 * These match the shape returned by WPGraphQL's default schema.
 * Extend as you add ACF fields or custom CPTs.
 */

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export type WPNode = {
	id: string         // global relay ID
	databaseId: number // raw WordPress ID
}

export type WPImage = {
	sourceUrl: string
	altText: string
	mediaDetails?: {
		width: number
		height: number
	}
}

export type WPSeo = {
	title: string
	metaDesc: string
	canonical: string
	opengraphTitle: string
	opengraphDescription: string
	opengraphImage?: WPImage
}

// ---------------------------------------------------------------------------
// Author
// ---------------------------------------------------------------------------

export type WPAuthor = WPNode & {
	name: string
	slug: string
	avatar?: { url: string }
}

// ---------------------------------------------------------------------------
// Category / Tag
// ---------------------------------------------------------------------------

export type WPCategory = WPNode & {
	name: string
	slug: string
	count?: number
	description?: string
}

export type WPTag = WPNode & {
	name: string
	slug: string
	count?: number
}

// ---------------------------------------------------------------------------
// Post
// ---------------------------------------------------------------------------

export type WPPost = WPNode & {
	title: string
	slug: string
	date: string             // ISO 8601
	modified: string
	excerpt: string
	content: string
	featuredImage?: { node: WPImage }
	author?: { node: WPAuthor }
	categories?: { nodes: WPCategory[] }
	tags?: { nodes: WPTag[] }
	seo?: WPSeo
}

/** Minimal card shape for list views */
export type WPPostCard = Pick<WPPost, 'id' | 'databaseId' | 'title' | 'slug' | 'date' | 'excerpt' | 'featuredImage' | 'categories'>

// ---------------------------------------------------------------------------
// Works / Portfolio (CPT: "work")
// ---------------------------------------------------------------------------

export type WPWork = WPNode & {
	title: string
	slug: string
	date: string
	/** ACF or custom fields – adapt field names to match your WP setup */
	workFields?: {
		client?: string
		year?: string
		type?: 'web' | 'mobile' | 'iot'
		category?: string
		description?: string
		challenge?: string
		solution?: string
		outcome?: string
		tags?: string[]
		featured?: boolean
	}
	featuredImage?: { node: WPImage }
	categories?: { nodes: WPCategory[] }
	tags?: { nodes: WPTag[] }
}

export type WPWorkCard = Pick<WPWork, 'id' | 'databaseId' | 'title' | 'slug' | 'date' | 'featuredImage' | 'categories' | 'tags' | 'workFields'>

// --------------------------------------------------------------------------
// GraphQL connection wrappers
// ---------------------------------------------------------------------------

export type WPConnection<T> = {
	nodes: T[]
	pageInfo: {
		hasNextPage: boolean
		hasPreviousPage: boolean
		startCursor: string
		endCursor: string
	}
}

// ---------------------------------------------------------------------------
// Query response shapes
// ---------------------------------------------------------------------------

export type PostsQueryResponse = {
	posts: WPConnection<WPPostCard>
}

export type PostBySlugQueryResponse = {
	postBy: WPPost | null
}

export type WorksQueryResponse = {
	works: WPConnection<WPWorkCard>
}

export type WorkBySlugQueryResponse = {
	workBy: WPWork | null
}

export type CategoriesQueryResponse = {
	categories: WPConnection<WPCategory>
}
