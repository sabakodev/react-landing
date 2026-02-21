/**
 * Centralized GraphQL client for WordPress (WPGraphQL plugin required).
 *
 * Setup:
 *   1. Install the WPGraphQL plugin on your WordPress site.
 *   2. Add to your .env.local:
 *        NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-wordpress-site.com/graphql
 *   3. Drop in the real endpoint — the mocked API adapters will auto-switch.
 *
 * @see https://www.wpgraphql.com/
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL ?? ''

/** Shared singleton client. Reuse across all query files. */
export const wpClient = new GraphQLClient(endpoint, {
	headers: {
		'Content-Type': 'application/json',
	},
	// Prefer cached responses in RSC fetch where possible
	fetch: (url, init) =>
		fetch(url, {
			...init,
			next: { revalidate: 60 }, // ISR: revalidate every 60 s
		}),
})

/**
 * Check whether a live WP endpoint is configured.
 * Use this guard in API adapters to decide mock vs. live.
 */
export function hasWpEndpoint(): boolean {
	return Boolean(endpoint)
}
