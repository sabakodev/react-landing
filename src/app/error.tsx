'use client'

import Link from 'next/link'
import { ArrowRight, RefreshCw } from 'lucide-react'

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[100svh] px-6 text-center">
			<p className="text-xs font-mono uppercase tracking-widest text-red-500 mb-4">
				Error — Something went wrong
			</p>
			<h1 className="text-6xl font-bold text-[var(--text)] mb-4">
				This is unexpected.
			</h1>
			<p className="text-[var(--text-muted)] mb-2 max-w-sm">
				{process.env.NODE_ENV === 'development' ? `${error.cause}` : 'Something unexpected happened. Please try again.'}
			</p>
			{error?.digest && (
				<p className="text-xs font-mono text-[var(--text-subtle)] mb-10">
					Error ID: {error.digest}
				</p>
			)}
			{process.env.NODE_ENV === 'development' && (
				<pre className="text-xs font-mono text-[var(--text-subtle)] mb-10">
					{error.message}
					{error.stack}
				</pre>
			)}
			<div className="flex items-center gap-4">
				<button
					onClick={reset}
					className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--bg-subtle)] transition-colors"
				>
					<RefreshCw size={16} />
					Try Again
				</button>
				<Link
					href="/"
					className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
				>
					Return Home
					<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</div>
	)
}
