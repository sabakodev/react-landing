import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '@/lib/api/posts'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const cursor = searchParams.get('after') ?? null
	const pageSize = Math.min(Number(searchParams.get('first') ?? 6), 30)
	const category = searchParams.get('category') ?? null

	let all = await getPosts()
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
