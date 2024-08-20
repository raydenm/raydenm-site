import supabase from '@/services/supabase/public'
import { cache } from 'react'

export const getPhotoList = cache(
  async ({ pageSize = 24, pageIndex = 0 }: { pageSize?: number; pageIndex?: number }) => {
    const start = pageIndex * pageSize
    const end = start + pageSize - 1
    const data = await supabase.from('image_list').select('*', { count: 'exact' }).range(start, end)
    return data
  }
)
