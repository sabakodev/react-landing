export default function Loading() {
	return (
		<div className="flex items-center justify-center min-h-[70vh]">
			<div className="flex flex-col items-center gap-4">
				<div className="flex gap-1">
					<span className="w-2 h-2 bg-[var(--brand)] animate-pulse" style={{ animationDelay: '0ms' }} />
					<span className="w-2 h-2 bg-[var(--brand)] animate-pulse" style={{ animationDelay: '150ms' }} />
					<span className="w-2 h-2 bg-[var(--brand)] animate-pulse" style={{ animationDelay: '300ms' }} />
				</div>
				<p className="text-xs font-mono text-[var(--text-subtle)] uppercase tracking-widest">
					Loading
				</p>
			</div>
		</div>
	)
}
