'use server'

import { getBookmarkItems } from '@/lib/raindrop'

export async function getBookmarkItemsByPageIndex(id: number, pageIndex: number) {
  return await getBookmarkItems(id, pageIndex)
}
