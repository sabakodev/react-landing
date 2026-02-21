/**
 * WPGraphQL queries — Categories & Tags
 */

import { gql } from 'graphql-request'

/** All categories (no pagination — usually small set) */
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        name
        slug
        count
        description
      }
    }
  }
`

/** All tags */
export const GET_TAGS = gql`
  query GetTags($first: Int = 50) {
    tags(first: $first, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        name
        slug
        count
      }
    }
  }
`
