import clsx from 'clsx'
import { PRODUCT_STATUS_LABEL } from '@/lib/products'
import type { ProductStatus } from '@/lib/products'

/** Invite-only uses the filled brand badge (as "Popular" in PricingCatalog); public is an outlined chip. */
export function ProductStatusBadge({ status }: { status: ProductStatus }) {
	return (
		<span
			className={clsx(
				'inline-flex items-center px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest',
				status === 'invite-only'
					? 'bg-(--brand) text-white'
					: 'border border-(--border) bg-(--bg-subtle) text-(--text-muted)',
			)}
		>
			{PRODUCT_STATUS_LABEL[status]}
		</span>
	)
}
