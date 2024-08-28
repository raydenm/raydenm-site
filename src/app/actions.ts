'use server'

import { getBookmarkItems } from '@/services/raindrop'
import { getPhotoList } from '@/services/supabase/photo'

export async function getBookmarkItemsAction(id: number, pageIndex: number) {
  return await getBookmarkItems(id, pageIndex)
}

export async function getPhotoListAction(params: { pageIndex?: number }) {
  return await getPhotoList(params)
}
