'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'
import { localeCounterparts } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'

const locales: Locale[] = ['en', 'id']

/** Compact "EN / ID" link pair pointing at the current page's counterpart in each language. */
export function LocaleSwitcher({ section, className }: { section: string; className?: string }) {
	const pathname = usePathname()
	const track = useButtonTracking()
	const { current, paths } = localeCounterparts(pathname)

	return (
		<div role="group" aria-label="Language" className={clsx('flex items-center gap-1 text-xs font-mono', className)}>
			{locales.map((locale, i) => (
				<Fragment key={locale}>
					{i > 0 && (
						<span aria-hidden="true" className="text-(--text-subtle)">
							/
						</span>
					)}
					<Link
						href={paths[locale]}
						hrefLang={locale}
						lang={locale}
						aria-current={locale === current ? 'page' : undefined}
						onClick={track(`Language ${locale.toUpperCase()}`, section)}
						className={clsx(
							'px-1 py-1 transition-colors',
							locale === current ? 'text-(--text) font-semibold' : 'text-(--text-muted) hover:text-(--text)',
						)}
					>
						{locale.toUpperCase()}
					</Link>
				</Fragment>
			))}
		</div>
	)
}
