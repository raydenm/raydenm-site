'use server'

import { getBookmarkItems } from '@/services/raindrop'
import { getPhotoList } from '@/services/supabase/photo'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getBookmarkItemsAction(id: number, pageIndex: number) {
  return await getBookmarkItems(id, pageIndex)
}

export async function getPhotoListAction(params: { pageIndex?: number }) {
  return await getPhotoList(params)
}

export async function draft() {
  draftMode().enable()
  redirect('/')
}

export async function disableDraft() {
  draftMode().disable()
  redirect('/')
}
