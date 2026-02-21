/**
 * Environment variable type declarations.
 * Add new env vars here to get full TypeScript IntelliSense.
 */
declare namespace NodeJS {
	interface ProcessEnv {
		/** WordPress GraphQL endpoint (WPGraphQL plugin required).
		 *  Example: https://your-wordpress-site.com/graphql
		 *  When empty, the app falls back to mock data automatically.
		 */
		NEXT_PUBLIC_WP_GRAPHQL_URL?: string

		/** Cloudflare Web Analytics beacon token.
		 *  Find at: Cloudflare Dashboard → Web Analytics → your site → JS Snippet.
		 */
		NEXT_PUBLIC_CF_BEACON_TOKEN?: string

		/** Google Analytics 4 Measurement ID (G-XXXXXXXXXX). */
		NEXT_PUBLIC_GA_ID?: string

		NODE_ENV: 'development' | 'production' | 'test'
	}
}
