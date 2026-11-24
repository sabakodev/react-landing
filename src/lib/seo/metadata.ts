import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/seo/jsonld'
import type { Locale } from '@/lib/pageCopy'

/**
 * Canonical + hreflang alternates for a page that exists in English and
 * Bahasa Indonesia. Paths are site-relative ('' for the English home).
 */
export function localeAlternates(locale: Locale, enPath: string, idPath: string): Metadata['alternates'] {
	const en = `${SITE_URL}${enPath}`
	const id = `${SITE_URL}${idPath}`
	return {
		canonical: locale === 'id' ? id : en,
		languages: { en, id, 'x-default': en },
	}
}

/** Root Open Graph tags. Pages that override openGraph spread this so no tag is lost. */
export const baseOpenGraph = {
	type: 'website',
	locale: 'en_US',
	url: SITE_URL,
	siteName: 'SABAKO',
	title: 'SABAKO — Transform your business experience',
	description: SITE_DESCRIPTION,
	images: [
		{
			url: `${SITE_URL}/sky.jpg`,
			width: 1200,
			height: 630,
			alt: 'SABAKO — IT Agency & Consulting',
		},
	],
} satisfies NonNullable<Metadata['openGraph']>
