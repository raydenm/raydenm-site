import { cache } from 'react'
import 'server-only'

import { isDevelopment } from '@/lib/utils'
// import { sendAnalytics } from '@/lib/supabase'

const fetchGraphQL = cache(async (query: string, preview = isDevelopment) => {
  try {
    const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
        }`
      },
      body: JSON.stringify({ query })
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.info(error)
    return null
  }
})

// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#preloading-data
export const preloadGetAllPosts = (preview = isDevelopment) => {
  void getAllPosts(preview)
}

export const getAllPosts = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        postCollection(preview: ${preview}) {
          items {
            title
            slug
            date
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )
    return entries?.data?.postCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getPost = cache(async (slug: string, preview = isDevelopment) => {
  // sendAnalytics(slug)
  try {
    const entry = await fetchGraphQL(
      `query {
        postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            title
            slug
            date
            markdown
            seo {
              title
              description
            }
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url(transform: {
                      format: AVIF,
                      quality: 50
                    })
                    title
                    width
                    height
                    description
                    contentfulMetadata {
                      tags {
                        name
                      }
                    }
                  }
                }
                entries {
                  inline {
                    sys {
                      id
                    }
                    __typename
                  }
                }
              }
            }
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.postCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getWritingSeo = cache(async (slug: string, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            date
            seo {
              title
              description
              ogImageTitle
              ogImageSubtitle
              keywords
            }
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.postCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getPageSeo = cache(async (slug: string, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            seo {
              title
              description
              ogImageTitle
              ogImageSubtitle
              keywords
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.pageCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getAllPageSlugs = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        pageCollection(preview: ${preview}) {
          items {
            slug
            hasCustomPage
            sys {
              id
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.pageCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getAllPostSlugs = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        postCollection(preview: ${preview}) {
          items {
            slug
          }
        }
      }`,
      preview
    )

    return entries?.data?.postCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getPage = cache(async (slug: string, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            title
            slug
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url(transform: {
                      format: AVIF,
                      quality: 50
                    })
                    title
                    width
                    height
                    description
                  }
                }
              }
            }
            sys {
              id
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.pageCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getAllLogbook = cache(async (preview = isDevelopment) => {
  try {
    const entries: {
      data: {
        logbookCollection: {
          items: {
            title: string
            date: string
            description: string
            location: string
            image: {
              url: string
              title: string
              description: string
              width: string
              height: string
            }
          }[]
        }
      }
    } = await fetchGraphQL(
      `query {
        logbookCollection(order: date_DESC, preview: ${preview}) {
          items {
            title
            date
            description
            location
            image {
              url(transform: {
                format: AVIF,
                quality: 50
              })
              title
              description
              width
              height
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.logbookCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})
