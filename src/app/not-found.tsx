import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-svh px-6 text-center">
			<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
				404 — Not Found
			</p>
			<h1 className="text-6xl font-bold text-(--text) mb-4">
				This page is not exists.
			</h1>
			<p className="text-(--text-muted) mb-10 max-w-sm">
				It might long lost in memories.
			</p>
			<Link
				href="/"
				className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
			>
				Return Home
				<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
			</Link>
		</div>
	)
}
