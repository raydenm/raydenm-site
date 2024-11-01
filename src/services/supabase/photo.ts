import { cache } from 'react'

import supabase from '@/services/supabase/public'

export const getPhotoList = cache(
  async ({ pageSize = 48, pageIndex = 0 }: { pageSize?: number; pageIndex?: number }) => {
    try {
      const start = pageIndex * pageSize
      const end = start + pageSize - 1
      const data = await supabase.from('image_list_imgur').select('*', { count: 'exact' }).range(start, end)
      return data
    } catch (error) {
      console.info(error)
      return { data: [], count: 0 }
    }
  }
)
