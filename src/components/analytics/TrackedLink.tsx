'use client'

import Link from 'next/link'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'

type TrackedLinkProps = {
	href: string
	label: string
	section: string
	className?: string
	children: React.ReactNode
	id?: string
	target?: string
	rel?: string
	'aria-label'?: string
}

/**
 * Link that fires `button_click` on click. Serialisable props only, so server
 * components can render it. Internal paths and hashes use next/link; external,
 * mailto and WhatsApp links render a plain <a>.
 */
export function TrackedLink({ href, label, section, children, ...rest }: TrackedLinkProps) {
	const track = useButtonTracking()
	const external = /^(https?:|mailto:|tel:)/.test(href)
	const onClick = track(label, section, external ? { external: true, href } : { href })

	if (external) {
		return (
			<a href={href} onClick={onClick} {...rest}>
				{children}
			</a>
		)
	}

	return (
		<Link href={href} onClick={onClick} {...rest}>
			{children}
		</Link>
	)
}
