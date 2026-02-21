import { NextRequest, NextResponse } from 'next/server'
import { getWorks } from '@/lib/api/works'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const cursor = searchParams.get('after') ?? null
	const pageSize = Math.min(Number(searchParams.get('first') ?? 9), 30)
	const type = searchParams.get('type') ?? null

	let all = await getWorks()
	if (type) all = all.filter((w) => w.type === type)

	// Simple cursor: cursor is the slug of the last item seen
	const startIdx = cursor ? all.findIndex((w) => w.slug === cursor) + 1 : 0
	const page = all.slice(startIdx, startIdx + pageSize)
	const hasMore = startIdx + pageSize < all.length
	const endCursor = page.length ? page[page.length - 1].slug : null

	return NextResponse.json({
		nodes: page,
		pageInfo: { hasNextPage: hasMore, endCursor },
	})
}
