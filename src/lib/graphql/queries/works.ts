
/**
 * WPGraphQL queries — Works / Portfolio CPT
 *
 * Assumes a Custom Post Type registered as "work" with slug "works"
 * and custom fields exposed via ACF + WPGraphQL ACF.
 *
 * Field group name "workFields" — update to match your ACF group.
 */

import { gql } from 'graphql-request'

/** Fetch list of works (cards) — optionally filter by featured */
export const GET_WORKS = gql`
  query GetWorks($first: Int = 20, $after: String) {
    works(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        workFields {
          client
          year
          type
          category
          description
          featured
          tags
        }
		  categories {
          nodes { id databaseId name slug }
        }
        tags {
          nodes { id databaseId name slug }
        }
      }
    }
  }
`

/** Fetch a single work by slug — full content */
export const GET_WORK_BY_SLUG = gql`
  query GetWorkBySlug($slug: String!) {
    workBy(slug: $slug) {
      id
      databaseId
      title
      slug
      date
	  content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
      workFields {
        client
        year
        type
        category
        description
        challenge
        solution
        outcome
        tags
        featured
      }
		categories {
        nodes { id databaseId name slug }
      }
      tags {
        nodes { id databaseId name slug }
      }
    }
  }
`