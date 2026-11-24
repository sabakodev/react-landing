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

export const HOME_TITLE = 'SABAKO — Rewrite your business.'

/**
 * Root Open Graph tags. Pages that override openGraph spread this so no tag is lost.
 * `images` points at the file-based app/opengraph-image route: a child segment that sets
 * its own `openGraph` does not inherit the root file image, so it is named explicitly.
 * A segment with its own opengraph-image file (services/[slug]) still takes precedence.
 */
export const baseOpenGraph = {
	type: 'website',
	locale: 'en_US',
	url: SITE_URL,
	siteName: 'SABAKO',
	title: HOME_TITLE,
	description: SITE_DESCRIPTION,
	images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: HOME_TITLE }],
} satisfies NonNullable<Metadata['openGraph']>

/**
 * Per-page Twitter card. A page-level `twitter` replaces the root one, so every page
 * that sets its own title needs this; the image is inherited from og:image.
 */
export function twitterCard(title: string, description: string) {
	return { card: 'summary_large_image', title, description } satisfies NonNullable<Metadata['twitter']>
}

/**
 * Title, description, canonical, Open Graph and Twitter tags for a page. A page-level
 * `openGraph` replaces the root one, so this spreads `baseOpenGraph` to keep
 * siteName, locale and type. Pass `{ absolute }` when the title already names the brand.
 */
export function pageMetadata({
	title,
	description,
	path,
}: {
	title: string | { absolute: string }
	description: string
	path: string
}) {
	const url = `${SITE_URL}${path}`
	const plainTitle = typeof title === 'string' ? title : title.absolute
	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: { ...baseOpenGraph, url, title: plainTitle, description },
		twitter: twitterCard(plainTitle, description),
	} satisfies Metadata
}
