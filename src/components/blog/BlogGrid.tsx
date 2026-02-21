'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Loader2, CheckCircle, User } from 'lucide-react'
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'
import type { BlogPost } from '@/lib/graphql/adapters/posts'

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric',
	})
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function PostSkeleton() {
	return (
		<div className="bg-(--bg) p-6 flex flex-col animate-pulse">
			<div className="h-4 w-3/4 bg-(--border) rounded-none mb-3" />
			<div className="space-y-2 flex-1 mb-4">
				<div className="h-3 w-full bg-(--border) rounded-none" />
				<div className="h-3 w-5/6 bg-(--border) rounded-none" />
			</div>
			<div className="flex gap-3">
				<div className="h-5 w-16 bg-(--border) rounded-none" />
				<div className="h-3 w-24 bg-(--border) rounded-none self-center" />
			</div>
		</div>
	)
}

// ── Card ──────────────────────────────────────────────────────────────────────
function PostCard({ post, onTrack }: { post: BlogPost; onTrack: () => void }) {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className="bg-(--bg) p-6 flex flex-col group hover:bg-(--bg-subtle) transition-colors"
			onClick={onTrack}
		>
			<h2 className="text-base font-bold text-(--text) group-hover:text-(--brand) transition-colors mb-3 leading-snug">
				{post.title}
			</h2>
			<p className="text-sm text-(--text-muted) leading-relaxed flex-1 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
			<div className="flex items-center gap-3 text-xs text-(--text-subtle) mt-auto">
				<span className="font-mono text-(--brand) border border-(--brand) px-1.5 py-0.5">{post.category}</span>
				<span className="flex items-center gap-1">
					<Calendar size={10} />
					{formatDate(post.date)}
				</span>
				<ArrowRight size={10} className="ml-auto transition-transform group-hover:translate-x-1" />
			</div>
		</Link>
	)
}

// ── Grid with infinite scroll ─────────────────────────────────────────────────
type Props = {
	initialItems: BlogPost[]
	initialCursor: string | null
	initialHasMore: boolean
	pageSize?: number
}

export function BlogGrid({ initialItems, initialCursor, initialHasMore, pageSize = 6 }: Props) {
	const [items, setItems] = useState<BlogPost[]>(initialItems)
	const [cursor, setCursor] = useState<string | null>(initialCursor)
	const [hasMore, setHasMore] = useState(initialHasMore)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const track = useButtonTracking()

	const loadMore = useCallback(async () => {
		if (!hasMore || loading) return
		setLoading(true)
		setError(false)
		try {
			const params = new URLSearchParams({ first: String(pageSize) })
			if (cursor) params.set('after', cursor)
			const res = await fetch(`/api/posts?${params}`)
			if (!res.ok) throw new Error('Network error')
			const json = await res.json() as {
				nodes: BlogPost[]
				pageInfo: { hasNextPage: boolean; endCursor: string | null }
			}
			setItems((prev) => [...prev, ...json.nodes])
			setCursor(json.pageInfo.endCursor)
			setHasMore(json.pageInfo.hasNextPage)
		} catch {
			setError(true)
		} finally {
			setLoading(false)
		}
	}, [hasMore, loading, cursor, pageSize])

	const { sentinelRef } = useInfiniteScroll({ onLoadMore: loadMore, done: !hasMore, loading })

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-(--border) border border-(--border)">
				{items.map((post) => (
					<PostCard
						key={post.slug}
						post={post}
						onTrack={track('Read Post', 'blog-grid', { slug: post.slug, title: post.title, category: post.category })}
					/>
				))}
				{loading && Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={`sk-${i}`} />)}
			</div>

			<div ref={sentinelRef} className="flex items-center justify-center py-10">
				{loading && (
					<Loader2 size={18} className="animate-spin text-(--text-subtle)" />
				)}
				{!hasMore && !loading && items.length > 0 && (
					<p className="flex items-center gap-2 text-xs font-mono text-(--text-subtle)">
						<CheckCircle size={14} className="text-(--brand)" />
						You&apos;ve seen it all
					</p>
				)}
				{error && (
					<button
						onClick={() => void loadMore()}
						className="text-xs font-mono text-(--brand) underline underline-offset-2"
					>
						Failed to load — try again
					</button>
				)}
			</div>
		</>
	)
}
