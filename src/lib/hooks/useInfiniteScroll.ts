'use client'

/**
 * useInfiniteScroll — IntersectionObserver-based infinite scroll hook.
 * Uses a ref-based callback to avoid stale closures without re-observing.
 */

import { useEffect, useLayoutEffect, useRef } from 'react'

type UseInfiniteScrollOptions = {
	onLoadMore: () => void | Promise<void>
	done?: boolean
	loading?: boolean
}

export function useInfiniteScroll({
	onLoadMore,
	done = false,
	loading = false,
}: UseInfiniteScrollOptions) {
	const sentinelRef = useRef<HTMLDivElement | null>(null)
	const onLoadMoreRef = useRef(onLoadMore)

	// Keep the ref in sync with the latest callback (safe to do in layout effect)
	useLayoutEffect(() => {
		onLoadMoreRef.current = onLoadMore
	})

	useEffect(() => {
		const el = sentinelRef.current
		if (!el || done || loading) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					void onLoadMoreRef.current()
				}
			},
			{ rootMargin: '200px' },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [done, loading])

	return { sentinelRef }
}
