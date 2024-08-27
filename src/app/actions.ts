'use server'

import { getBookmarkItems } from '@/services/raindrop'
import { getPhotoList } from '@/services/supabase/photo'

export async function getBookmarkItemsByPageIndex(id: number, pageIndex: number) {
  return await getBookmarkItems(id, pageIndex)
}

export async function getPhotoListByPageIndex(params: { pageIndex?: number }) {
  return await getPhotoList(params)
}
