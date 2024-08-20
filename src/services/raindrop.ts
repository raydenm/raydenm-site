import { cache } from 'react'
import 'server-only'

import { BOOKMARK_MAP } from '@/config'

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN}`
  }
}

const RAINDROP_API_URL = 'https://api.raindrop.io/rest/v1'

export type BookmarkType = {
  _id: number
  title: string
  description: string
  count: number
  slug: string
}

export type BookmarksType = BookmarkType[]

export type BookmarkItemType = {
  _id: number
  link: string
  title: string
  excerpt: string
  note: string
  cover: string
  domain: string
}

export type BookmarkItemsType = {
  items: BookmarkItemType[]
  result: true
}

export const getBookmarkItems = cache(async (id: number, pageIndex = 0) => {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${id}?` +
        new URLSearchParams({
          page: String(pageIndex),
          perpage: '30',
          time: String(Date.now()),
          sort: 'created'
        }),
      options
    )
    const data: BookmarkItemsType = await response.json()
    return data
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getBookmarks = cache(async () => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collections?time=${Date.now()}`, options)
    const bookmarks: { items: BookmarksType } = await response.json()
    const bookmarkList = (bookmarks?.items || [])
      .filter((bookmark) => BOOKMARK_MAP[bookmark.title])
      .map((bookmark) => ({
        ...bookmark,
        title: BOOKMARK_MAP[bookmark.title] || bookmark.title
      }))
    return bookmarkList
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getBookmark = cache(async (id: string) => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collection/${id}`, options)
    return await response.json()
  } catch (error) {
    console.info(error)
    return null
  }
})
