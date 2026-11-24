import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION } from '@/lib/seo/jsonld'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'SABAKO — Software Engineering Partner',
		short_name: 'SABAKO',
		description: SITE_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		// --bg and --brand from src/styles/globals.css (light theme)
		background_color: '#ffffff',
		theme_color: '#FF5C26',
		icons: [
			{ src: '/sabako-bimi.svg', sizes: 'any', type: 'image/svg+xml' },
			{ src: '/icon.png', sizes: '512x512', type: 'image/png' },
			{ src: '/apple-icon', sizes: '180x180', type: 'image/png' },
		],
	}
}
