'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'
import type { Work } from '@/lib/graphql/adapters/works'

const categoryColors: Record<string, string> = {
	web: 'text-blue-500',
	mobile: 'text-purple-500',
	iot: 'text-green-500',
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function WorkSkeleton() {
	return (
		<div className="bg-[var(--bg)] p-8 flex flex-col animate-pulse">
			<div className="flex items-center justify-between mb-6">
				<div className="h-3 w-20 bg-[var(--border)] rounded-none" />
				<div className="h-3 w-10 bg-[var(--border)] rounded-none" />
			</div>
			<div className="h-5 w-3/4 bg-[var(--border)] rounded-none mb-2" />
			<div className="h-3 w-1/2 bg-[var(--border)] rounded-none mb-6" />
			<div className="space-y-2 flex-1 mb-6">
				<div className="h-3 w-full bg-[var(--border)] rounded-none" />
				<div className="h-3 w-5/6 bg-[var(--border)] rounded-none" />
				<div className="h-3 w-4/5 bg-[var(--border)] rounded-none" />
			</div>
			<div className="flex gap-2">
				<div className="h-5 w-16 bg-[var(--border)] rounded-none" />
				<div className="h-5 w-16 bg-[var(--border)] rounded-none" />
			</div>
		</div>
	)
}

// ── Card ──────────────────────────────────────────────────────────────────────
function WorkCard({ project, onTrack }: { project: Work; onTrack: () => void }) {
	return (
		<Link
			href={`/work/${project.slug}`}
			id={project.id}
			className="bg-[var(--bg)] p-8 flex flex-col group hover:bg-[var(--bg-subtle)] transition-colors"
			onClick={onTrack}
		>
			<div className="flex items-center justify-between mb-6">
				<span className={`text-xs font-mono uppercase tracking-wider ${categoryColors[project.type] || 'text-[var(--brand)]'}`}>
					{project.category}
				</span>
				<span className="text-xs font-mono text-[var(--text-subtle)]">{project.year}</span>
			</div>
			<h2 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2">
				{project.title}
			</h2>
			<p className="text-xs text-[var(--text-subtle)] mb-4">{project.client}</p>
			<p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-6">
				{project.description}
			</p>
			<div className="flex flex-wrap gap-2 mb-6">
				{project.tags.map((tag) => (
					<span
						key={tag}
						className="px-2 py-0.5 text-xs border border-[var(--border)] text-[var(--text-subtle)] bg-[var(--bg-subtle)]"
					>
						{tag}
					</span>
				))}
			</div>
			<div className="mt-auto flex items-center gap-1.5 text-xs font-mono text-[var(--text-subtle)] group-hover:text-[var(--brand)] transition-colors">
				View case study
				<ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
			</div>
		</Link>
	)
}

// ── Grid with infinite scroll ─────────────────────────────────────────────────
type Props = {
	initialItems: Work[]
	initialCursor: string | null
	initialHasMore: boolean
	pageSize?: number
}

export function WorksGrid({ initialItems, initialCursor, initialHasMore, pageSize = 9 }: Props) {
	const [items, setItems] = useState<Work[]>(initialItems)
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
			const res = await fetch(`/api/works?${params}`)
			if (!res.ok) throw new Error('Network error')
			const json = await res.json() as {
				nodes: Work[]
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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
				{items.map((project) => (
					<WorkCard
						key={project.slug}
						project={project}
						onTrack={track('View Case Study', 'works-grid', { slug: project.slug, title: project.title, type: project.type })}
					/>
				))}
				{/* Skeleton slots while loading */}
				{loading && Array.from({ length: 3 }).map((_, i) => <WorkSkeleton key={`sk-${i}`} />)}
			</div>

			{/* Sentinel + status */}
			<div ref={sentinelRef} className="flex items-center justify-center py-10">
				{loading && (
					<Loader2 size={18} className="animate-spin text-[var(--text-subtle)]" />
				)}
				{!hasMore && !loading && items.length > 0 && (
					<p className="flex items-center gap-2 text-xs font-mono text-[var(--text-subtle)]">
						<CheckCircle size={14} className="text-[var(--brand)]" />
						You&apos;ve seen it all
					</p>
				)}
				{error && (
					<button
						onClick={() => void loadMore()}
						className="text-xs font-mono text-[var(--brand)] underline underline-offset-2"
					>
						Failed to load — try again
					</button>
				)}
			</div>
		</>
	)
}
