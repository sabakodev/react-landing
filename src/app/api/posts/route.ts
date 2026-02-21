import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '@/lib/graphql/adapters/posts'
import type { BlogPost } from '@/lib/graphql/adapters/posts'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const cursor = searchParams.get('after') ?? null
	const pageSize = Math.min(Number(searchParams.get('first') ?? 6), 30)
	const category = searchParams.get('category') ?? null

	let all: BlogPost[]
	try {
		all = await getPosts()
	} catch {
		return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 502 })
	}

	if (category) all = all.filter((p) => p.category.toLowerCase() === category.toLowerCase())

	const startIdx = cursor ? all.findIndex((p) => p.slug === cursor) + 1 : 0
	const page = all.slice(startIdx, startIdx + pageSize)
	const hasMore = startIdx + pageSize < all.length
	const endCursor = page.length ? page[page.length - 1].slug : null

	return NextResponse.json({
		nodes: page,
		pageInfo: { hasNextPage: hasMore, endCursor },
	})
}
