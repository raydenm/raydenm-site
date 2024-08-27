'use server'

import { getBookmarkItems, getBookmarks } from '@/services/raindrop'
import { getPhotoList } from '@/services/supabase/photo'
import { getAllPostSlugs } from '@/services/contentful'

export async function getBookmarkItemsAction(id: number, pageIndex: number) {
  return await getBookmarkItems(id, pageIndex)
}

export async function getPhotoListAction(params: { pageIndex?: number }) {
  return await getPhotoList(params)
}

export async function getBookmarksAction() {
  return await getBookmarks()
}

export async function getAllPostSlugsAction() {
  return await getAllPostSlugs()
}
