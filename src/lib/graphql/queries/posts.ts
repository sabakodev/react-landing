/**
 * WPGraphQL queries — Blog Posts
 */

import { gql } from 'graphql-request'

/** Fetch paginated post list (cards only — no content for performance) */
export const GET_POSTS = gql`
  query GetPosts($first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        categories {
          nodes { id databaseId name slug }
        }
      }
    }
  }
`

/** Fetch a single post by slug — full content */
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      databaseId
      title
      slug
      date
      modified
      content(format: RENDERED)
      excerpt(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
      author {
        node {
          id
          databaseId
          name
          slug
          avatar { url }
        }
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

/** Fetch posts filtered by category slug */
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($category: String!, $first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH, categoryName: $category }) {
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
        excerpt(format: RENDERED)
        featuredImage {
          node { sourceUrl altText }
        }
        categories {
          nodes { id databaseId name slug }
        }
      }
    }
  }
`
